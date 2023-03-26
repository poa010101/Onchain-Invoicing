import { useState, createContext, useContext } from "react";

const mockNetworkList = ["OKX", "ETH", "USDT"];

const InvoiceContext = createContext({
  wallet: false,
  setWallet: () => undefined,
  walletAddress: "",
  setWalletAddress: () => undefined,
  contract: {},
  setContract: () => undefined,
  web: {},
  setWeb: () => undefined,
  generatedInvoice: false,
  setGeneratedInvoice: () => undefined,
  selectedNetwork: "",
  setSelectedNetwork: () => undefined,
  selectedCurrency: "",
  setSelectedCurrency: () => undefined,
  invoices:[],
  setInvoices: () => undefined,
});

const InvoiceProvider = ({ children }) => {
  const [wallet, setWallet] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [contract, setContract] = useState({});
  const [web, setWeb] = useState({});
  const [generatedInvoice, setGeneratedInvoice] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(mockNetworkList[0]);
  const [selectedCurrency, setSelectedCurrency] = useState("OKT");
  const [invoices, setInvoices] = useState([]);

  const value = {
    wallet,
    setWallet,
    walletAddress,
    setWalletAddress,
    contract,
    setContract,
    web,
    setWeb,
    generatedInvoice,
    setGeneratedInvoice,
    selectedNetwork,
    setSelectedNetwork,
    selectedCurrency,
    setSelectedCurrency,
    invoices,
    setInvoices,
  };

  return (
    <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>
  );
};

const useInvoiceContext = () => useContext(InvoiceContext);

export { InvoiceContext, InvoiceProvider, useInvoiceContext, mockNetworkList };
