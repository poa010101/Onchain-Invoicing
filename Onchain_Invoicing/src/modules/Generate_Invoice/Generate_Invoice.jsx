import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInvoiceContext } from "../../context";

const GenerateInvoicing = () => {
  const { wallet, walletAddress } = useInvoiceContext();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (wallet) {
      navigateTo("/generate_invoicing");
    }
  });
  return (
    <div>
      {console.log("xxxx", wallet, walletAddress)}
      <form>
        <label>PO. Number</label>
        <input />
        <label>Amount</label>
        <input />
        <label>Client Wallet</label>
        <input />

        <button>Generate</button>
      </form>
    </div>
  );
};

export default GenerateInvoicing;
