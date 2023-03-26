import React, { useEffect } from "react";
import { useInvoiceContext } from "../../context";

const GenerateInvoicing = () => {
  const { wallet, walletAddress } = useInvoiceContext();

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
