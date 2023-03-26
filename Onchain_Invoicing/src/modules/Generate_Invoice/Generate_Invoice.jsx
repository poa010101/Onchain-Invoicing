import React from "react";
import { useInvoiceContext } from "../../context";

const GenerateInvoicing = () => {
  return (
    <div>
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
