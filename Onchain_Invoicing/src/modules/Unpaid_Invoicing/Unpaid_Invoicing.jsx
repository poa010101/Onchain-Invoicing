import { useState } from "react";
import { mockUnpaidData } from "./mockUpaidInvoicing";
import "../Generate_Invoice/Generate_Invoice.css";
import { useInvoiceContext } from "../../context";

const UnpaidInvoicing = () => {
  const [payInvoice, setPayInvoice] = useState(mockUnpaidData);
  const { web, walletAddress, invoices, setInvoices } = useInvoiceContext();
  const handlePay = (invoiceId) => {
    ethPay("0xBa94cA55Bb24617D56EE67D659083A577339BC01", 1);
    const updatedInvoice = invoices.map((invoice) =>
      invoice[0] === invoiceId ? { ...invoice, paid: true } : invoice
    );

    setInvoices(updatedInvoice);
    alert("You have Paid");
  };

  const handleDecline = (invoiceId) => {
    const updatedInvoice = invoices.filter(
      (invoice) => invoice.invoiceId !== invoiceId
    );
    setInvoices(updatedInvoice);
    alert("You have Declined");
  };

  async function ethPay(recipientAddress, amountInEther) {
    if (!web || !walletAddress) {
      console.error("Missing web3 or account");
      return;
    }

    try {
      //
      const gasPrice = await web.eth.getGasPrice();
      const gasEstimate = await web.eth.estimateGas({
        from: walletAddress,
        to: recipientAddress,
        value: amountInEther,
      });
      // const amountInWei = web.utils.toWei(String(amountInEther), 'ether');
      const transactionParameters = {
        from: walletAddress,
        to: recipientAddress,
        value: String(amountInEther),
        gasPrice: gasPrice,
        gas: String(gasEstimate),
      };
      console.log(transactionParameters);
      const result = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
      await console.log(result);
    } catch (error) {
      console.error("Error sending transaction ", error);
    }
  }
  return (
    <div className="table-container">
      <h2>Unpaid Invoicing</h2>
      <table style={{ border: "1px solid black", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", gap: 30, width: "14%" }}>
              Invoice Number
            </th>
            <th style={{ border: "1px solid black", gap: 30, width: "14%" }}>
              Date
            </th>
            <th style={{ border: "1px solid black", gap: 30, width: "14%" }}>
              PO Number
            </th>
            <th style={{ border: "1px solid black", gap: 30, width: "14%" }}>
              Amount
            </th>
            <th style={{ border: "1px solid black", gap: 30, width: "14%" }}>
              Client Wallet
            </th>
            <th style={{ border: "1px solid black", gap: 30, width: "14%" }}>
              Paid
            </th>
            <th style={{ border: "1px solid black", gap: 30, width: "14%" }}>
              Active
            </th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, index) => {
            return (
              <tr key={index}>
                <td
                  style={{ border: "1px solid black", gap: 30, width: "14%" }}
                >
                  {invoice[0]}
                </td>
                <td
                  style={{ border: "1px solid black", gap: 30, width: "14%" }}
                >
                  {Date(invoice[3] * 1000)}
                </td>
                <td
                  style={{ border: "1px solid black", gap: 30, width: "14%" }}
                >
                  {invoice[7]}
                </td>
                <td
                  style={{ border: "1px solid black", gap: 30, width: "14%" }}
                >
                  {invoice.amount}
                </td>
                <td
                  style={{ border: "1px solid black", gap: 30, width: "14%" }}
                >
                  {invoice[2]}
                </td>
                <td
                  style={{ border: "1px solid black", gap: 30, width: "14%" }}
                >
                  <button
                    className="button"
                    disabled={invoice.paid}
                    onClick={() => {
                      handlePay(invoice[0]);
                    }}
                  >
                    {!invoice.paid ? "Pay" : "Paid"}
                  </button>
                  <button
                    className={`button decline-button`}
                    disabled={invoice.paid}
                    onClick={() => {
                      handleDecline(invoice[0]);
                    }}
                  >
                    Decline
                  </button>
                </td>
                <td
                  style={{ border: "1px solid black", gap: 30, width: "14%" }}
                >
                  {invoice.active ? "Active" : "Inactive"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UnpaidInvoicing;
