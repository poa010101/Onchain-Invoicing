import { useState, createContext, useContext } from "react";

const InvoiceContext = createContext({
  wallet: false,
  setWallet: () => undefined,
  walletAddress: "",
  setWalletAddress: () => undefined,
  generatedInvoice: false,
  setGeneratedInvoice: () => undefined,
});

const InvoiceProvider = ({ children }) => {
  const [wallet, setWallet] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [generatedInvoice, setGeneratedInvoice] = useState(false);

  const value = {
    wallet,
    setWallet,
    walletAddress,
    setWalletAddress,
    generatedInvoice,
    setGeneratedInvoice,
  };

  return (
    <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>
  );
};

const useInvoiceContext = () => useContext(InvoiceContext);

export { InvoiceContext, InvoiceProvider, useInvoiceContext };
