#!/bin/bash

# Load the .env file
if [ -f .env ]; then
  export $(cat .env | xargs)
else
  echo ".env file not found! Please create a .env file with VPN_USER and VPN_PASS"
  exit 1
fi

# Path to the directory where your .ovpn files are located
VPN_CONFIG_DIR="./vpnFiles"

# Function to get a random .ovpn file from the directory
get_random_vpn_config() {
  vpn_files=($VPN_CONFIG_DIR/*.ovpn)
  num_files=${#vpn_files[@]}
  random_index=$((RANDOM % num_files))
  echo ${vpn_files[$random_index]}
}

# Function to connect to PIA VPN
connect_to_pia() {
  vpn_config=$(get_random_vpn_config)
  echo "Connecting to PIA VPN using config: $vpn_config"
  
  temp_file=$(mktemp)
  echo -e "$VPN_USER\n$VPN_PASS" > "$temp_file"
  
  # Attempt to connect to the VPN
  sudo openvpn --config "$vpn_config" --auth-user-pass "$temp_file" &  # Run OpenVPN in background
  
  VPN_PID=$!
  
  # Check if the OpenVPN process is running
  if ! kill -0 $VPN_PID 2>/dev/null; then
    echo "$(date) - VPN connection failed" >> vpn_rotation.log
    sleep 10  # Retry after a short delay
    connect_to_pia  # Retry connection
  fi
  
  # Show IP after connection
  sleep 5
  IP_ADDRESS=$(curl -s ifconfig.me)
  echo "Current IP address: $IP_ADDRESS"
  echo "$(date) - New IP: $IP_ADDRESS" >> vpn_rotation.log
  
  # Clean up the temporary file
  rm "$temp_file"
}

# Function to disconnect from PIA VPN
disconnect_from_pia() {
  echo "Disconnecting from PIA VPN..."
  sudo kill $VPN_PID
}

# Function to run the application (app.js)
run_application() {
  echo "Starting the application..."
  node app.js &  # Run your app.js in the background
  APP_PID=$!
}

# Rotate IP by disconnecting and reconnecting to VPN
rotate_ip() {
  disconnect_from_pia
  sleep 5
  connect_to_pia
}

# Main loop that runs both VPN and application in sync
while true; do
  rotate_ip
  run_application  # Start the app.js after VPN is connected
  sleep 60  # Wait 1 minute before rotating IP
done
