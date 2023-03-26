import { useState, createContext, useContext } from "react";

const InvoiceContext = createContext({
  wallet: false,
  setWallet: () => undefined,
  walletAddress: "",
  setWalletAddress: () => undefined,
  contract: {},
  setContract: () => undefined,
  web: {},
  setWeb: () => undefined,
});

const InvoiceProvider = ({ children }) => {
  const [wallet, setWallet] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [contract, setContract] = useState({});
  const [web, setWeb] = useState({});
  const value = {
    wallet,
    setWallet,
    walletAddress,
    setWalletAddress,
    contract,
    setContract,
    web,
    setWeb,
  };

  return (
    <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>
  );
};

const useInvoiceContext = () => useContext(InvoiceContext);

export { InvoiceContext, InvoiceProvider, useInvoiceContext };
