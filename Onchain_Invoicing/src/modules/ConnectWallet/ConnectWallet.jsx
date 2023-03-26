import { useState, useEffect } from "react";
import { mockNetworkList, useInvoiceContext } from "../../context";
import { useNavigate } from "react-router-dom";

import Web3 from "web3";
import "./ConnectWallet.css";
import contractAbi from "./abi.json";

const CONTRACT_ADDRESS = "0xcabc2A2Da93C5B6B94bdB6930dAE3Ec9BC962d5D";

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
    const contractInstance = new web3.eth.Contract(
      contractAbi,
      CONTRACT_ADDRESS
    );
    // console.log('web3:', web3);
    // console.log('Network ID:', networkId);
    // console.log('User account:', account);
    // console.log('Contract instance:', contractInstance);
    setWeb(web3);
    setContract(contractInstance);
    // console.log('Contract instance:', contract);
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
