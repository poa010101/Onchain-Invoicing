import { useState, createContext, useContext } from "react";

const mockNetworkList = ["Network", "OKX", "ETC", "MATIC"];

const InvoiceContext = createContext({
  wallet: false,
  setWallet: () => undefined,
  walletAddress: "",
  setWalletAddress: () => undefined,
  generatedInvoice: false,
  setGeneratedInvoice: () => undefined,
  selectedNetwork: [],
  setSelectedNetwork: () => undefined,
  selectedCurrency: "",
  setSelectedCurrency: () => undefined,
});

const InvoiceProvider = ({ children }) => {
  const [wallet, setWallet] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [generatedInvoice, setGeneratedInvoice] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(mockNetworkList[0]);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const value = {
    wallet,
    setWallet,
    walletAddress,
    setWalletAddress,
    generatedInvoice,
    setGeneratedInvoice,
    selectedNetwork,
    setSelectedNetwork,
    selectedCurrency,
    setSelectedCurrency,
  };

  return (
    <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>
  );
};

const useInvoiceContext = () => useContext(InvoiceContext);

export { InvoiceContext, InvoiceProvider, useInvoiceContext, mockNetworkList };
