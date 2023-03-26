import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ConnectWallet.css";

const mockNetworkList = ["Network", "OKX", "ETC", "MATIC"];

const Login = () => {
  const [selectedNetwork, setSelectedNetwork] = useState(mockNetworkList[0]);
  const navigateTo = useNavigate();

  const handleWalletButton = () => {
    navigateTo("/generate_invoicing");
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
