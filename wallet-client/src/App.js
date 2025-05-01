import React, { useState, useEffect } from "react";
import Lucia from "./lucia-sdk.js";
import Web3 from "web3";

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("");
  let web3Instance;

  const lucia = new Lucia({
    clientId: "test",
    baseURL: "http://localhost:3000",
    api_key: "-----------", //ADD API-KEY here!
  });

  useEffect(() => {
    const startWalletConnection = async () => {
      await lucia.walletConnection();
    };

    startWalletConnection();

    return () => {};
  }, []);

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        web3Instance = new Web3(window.ethereum);
        // Get chain ID
        const chainId = (await web3Instance.eth.getChainId()).toString();

        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);

        // Event listener for network changes
        window.ethereum.on("chainChanged", async (chainId) => {
          const accounts = await web3Instance.eth.getAccounts();
          const newChainId = parseInt(chainId, 16).toString();

          await lucia.sendWalletInfo(accounts[0], newChainId); //Call API
        });
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      console.error("MetaMask extension not detected");
    }
  };

  return (
    <div>
      <h1>Simple React MetaMask Connection</h1>
      {account ? (
        <p>Connected Account: {account}</p>
      ) : (
        <button onClick={connectMetaMask}>Connect MetaMask</button>
      )}
    </div>
  );
};

export default App;
