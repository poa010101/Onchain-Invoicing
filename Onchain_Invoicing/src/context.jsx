import { useState, createContext, useContext } from "react";

const InvoiceContext = createContext({
  wallet: false,
  setWallet: () => undefined,
});

const InvoiceProvider = ({ children }) => {
  const [wallet, setWallet] = useState(false);

  const value = {
    wallet,
    setWallet,
  };

  return (
    <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>
  );
};

const useInvoiceContext = () => useContext(ItemsContext);

export { InvoiceContext, InvoiceProvider, useInvoiceContext };
