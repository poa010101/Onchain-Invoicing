import { useState, useEffect } from "react";
import { mockNetworkList, useInvoiceContext } from "../../context";
import { useNavigate } from "react-router-dom";

import Web3 from "web3";
import "./ConnectWallet.css";
import contractAbi from "./abi.json";


const CONTRACT_ADDRESS = '0xfbb31372427B88e1B044fb96C00256cDCF7CC5B2';

const Login = () => {
  const {
    wallet,
    walletAddress,
    selectedNetwork,
    setWallet,
    setWalletAddress,
    setSelectedNetwork,
    contract,
    setContract,
    web,
    setWeb,
  } = useInvoiceContext();

  const navigateTo = useNavigate();

  async function connectWallet() {
    try {
      if (typeof window.ethereum === "undefined") {
        alert("Please install MetaMask or another Web3 provider.");
        return;
      }
      const web3 = new Web3(window.ethereum);
      const networkId = await web3.eth.net.getId();
      setWeb(web3);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("xxxx21", accounts[0], wallet, walletAddress);

      if (accounts[0].length > 0) {
        console.log("xxx");
        const contractInstance = new web.eth.Contract(
          contractAbi,
          CONTRACT_ADDRESS
        );
        setContract(contractInstance);
        await setWalletAddress(accounts[0]);
        // await initializeWeb3(accounts[0]);
        await setWallet(true);
      }
      console.log('xxxx1', contract)

    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  }
  async function initializeWeb3(account) {

    // console.log('web3:', web3);
    // console.log('Network ID:', networkId);
    // console.log('User account:', account);
    // console.log('Contract instance:', contractInstance);
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
    <div className="connectWallet-container">
      <div className="connectWallet">
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
    </div>
  );
};

export default Login;
