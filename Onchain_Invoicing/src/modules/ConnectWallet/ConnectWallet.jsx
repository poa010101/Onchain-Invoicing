import { useState } from "react";
import { useInvoiceContext } from "../../context";
import "./ConnectWallet.css";
import Web3 from 'web3';

const mockNetworkList = ["Network", "OKX", "ETC", "MATIC"];

const Login = () => {
  const { wallet, setWallet } = useInvoiceContext; // if wallet connect, setWallet to true
  const [selectedNetwork, setSelectedNetwork] = useState(mockNetworkList[0]);
    async function connectWallet() {
        try {
            if (typeof window.ethereum === 'undefined') {
                alert('Please install MetaMask or another Web3 provider.');
                return;
            }

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(accounts[0]);
            await initializeWeb3(accounts[0]);
        } catch (error) {
            console.error('Error connecting to wallet:', error);
        }
    }

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
      <button className="connectWallet_button"
              onClick={connectWallet}
      >Connect Wallet</button>
    </div>
  );
};

export default Login;
