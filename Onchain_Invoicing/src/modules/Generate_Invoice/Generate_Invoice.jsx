import React from "react";
import { useInvoiceContext } from "../../context";

const GenerateInvoicing = () => {
  const { wallet } = useInvoiceContext();

  return (
    <div>
      <form>
        <label>PO. Number</label>
        <input />
        <label>Amount</label>
        <input />
        <label>Client Wallet</label>
        <input />

        <button>Send</button>
        <button>Save and Exist</button>
        <button>Withdrawal</button>
      </form>
    </div>
  );
};

export default GenerateInvoicing;
