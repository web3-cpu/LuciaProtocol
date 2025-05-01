# VPN Rotation Script (`vpn.sh`)

This script automates VPN IP rotation using Private Internet Access (PIA) `.ovpn` configuration files and simultaneously runs a Node.js application (`app.js`). It randomly selects a VPN configuration file, connects to the VPN, and rotates the IP every 60 seconds while keeping the application running.

---

## Features

- **Random VPN Configuration Selection**: Picks a random `.ovpn` file for each connection.
- **Automatic IP Rotation**: Disconnects and reconnects to the VPN to get a new IP every minute.
- **Application Runner**: Runs a Node.js application (`app.js`) while managing VPN connections.
- **Logging**: Logs connection attempts and new IP addresses to `vpn_rotation.log`.

---

## Requirements

### System Requirements

- **Operating System**: Linux or macOS (supports `bash`).
- **Node.js**: Ensure Node.js is installed for running `app.js`.
- **OpenVPN**: Required to connect to the VPN.

---

## Installation

1. Clone or copy this repository to your local machine.
2. Create the required files:
   - `.env` file:
     ```env
     VPN_USER=<your-vpn-username>
     VPN_PASS=<your-vpn-password>
     ```
   - Place your `.ovpn` files in a directory named `vpnFiles`.
   - Ensure you have an `app.js` file for the application.
3. NPM Install:
   ```bash
   npm i
   ```
4. Make the script executable:
   ```bash
   chmod +x vpn.sh
   ```
5. Run the Script 
   ```bash
    ./vpn.sh 
    ```   