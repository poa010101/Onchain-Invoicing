import { useState } from "react";
import "./ConnectWallet.css";

const mockNetworkList = ["Network", "OKX", "ETC", "MATIC"];

const Login = () => {
  const [selectedNetwork, setSelectedNetwork] = useState(mockNetworkList[0]);

  return (
    <div>
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
      <button className="connectWallet_button">Connect Wallet</button>
    </div>
  );
};

export default Login;
