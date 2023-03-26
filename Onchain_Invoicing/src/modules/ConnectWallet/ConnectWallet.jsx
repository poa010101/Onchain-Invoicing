import { useState } from "react";
import { useInvoiceContext } from "../../context";
import "./ConnectWallet.css";

const mockNetworkList = ["Network", "OKX", "ETC", "MATIC"];

const Login = () => {
  const { setWallet, setWalletAddress } = useInvoiceContext();
  const [selectedNetwork, setSelectedNetwork] = useState(mockNetworkList[0]);

  async function connectWallet() {
    try {
      if (typeof window.ethereum === "undefined") {
        alert("Please install MetaMask or another Web3 provider.");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts[0]);
      await initializeWeb3(accounts[0]);
      if (accounts[0]) {
        setWallet(true);
        setWalletAddress(accounts[0]);
      }
      console.log("xxxx", wallet, walletAddress);
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

  return (
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
        Connect Wallet
      </button>
    </div>
  );
};

export default Login;
