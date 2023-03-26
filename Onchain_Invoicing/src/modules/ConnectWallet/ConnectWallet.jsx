import { useState, useEffect } from "react";
import { mockNetworkList, useInvoiceContext } from "../../context";
import { useNavigate } from "react-router-dom";

import Web3 from "web3";
import "./ConnectWallet.css";

const Login = () => {
  const {
    wallet,
    walletAddress,
    selectedNetwork,
    setWallet,
    setWalletAddress,
    setSelectedNetwork,
  } = useInvoiceContext();

  const navigateTo = useNavigate();

  async function connectWallet() {
    try {
      if (typeof window.ethereum === "undefined") {
        alert("Please install MetaMask or another Web3 provider.");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("xxxx21", accounts[0], wallet, walletAddress);

      if (accounts[0].length > 0) {
        console.log("xxx");
        setWallet(true);
        setWalletAddress(accounts[0]);
      }
      await initializeWeb3(accounts[0]);
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  }
  async function initializeWeb3(account) {
    const web3 = new Web3(window.ethereum);
    const networkId = await web3.eth.net.getId();

    console.log("Network ID:", networkId);
    console.log("User account:", account);
  }

  const handleWalletButton = () => {
    connectWallet();
  };

  useEffect(() => {
    if (wallet) {
      navigateTo("/generate_invoicing");
    }
  });

  return (
    <div className="connectWallet">
      {console.log("xxxx", wallet, walletAddress)}
      <select
        id="network-select"
        value={selectedNetwork}
        onChange={(e) => setSelectedNetwork(e.target.value)}
        className="connectWallet_select"
      >
        {mockNetworkList.map((network) => (
          <option
            key={network}
            value={network}
            className="connectWallet_option"
          >
            {network}
          </option>
        ))}
      </select>
      <button className="connectWallet_button" onClick={handleWalletButton}>
        {wallet ? walletAddress : "Connect Wallet"}
      </button>
    </div>
  );
};

export default Login;
