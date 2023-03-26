import { useState } from "react";
import { mockUnpaidData } from "./mockUpaidInvoicing";
import "../Generate_Invoice/Generate_Invoice.css";

const UnpaidInvoicing = () => {
  const [payInvoice, setPayInvoice] = useState(mockUnpaidData);

  const handlePay = (invoiceId) => {
    const updatedInvoice = payInvoice.map((invoice) =>
      invoice.invoiceId === invoiceId ? { ...invoice, paid: true } : invoice
    );
    setPayInvoice(updatedInvoice);
    alert("You have Paid");
  };

  const handleDecline = (invoiceId) => {
    const updatedInvoice = payInvoice.filter(
      (invoice) => invoice.invoiceId !== invoiceId
    );
    setPayInvoice(updatedInvoice);
    alert("You have Declined");
  };

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
          {payInvoice.map((invoice, index) => {
            return (
              <tr key={index}>
                <td
                  style={{ border: "1px solid black", gap: 30, width: "14%" }}
                >
                  {invoice.invoiceId}
                </td>
                <td
                  style={{ border: "1px solid black", gap: 30, width: "14%" }}
                >
                  {invoice.date}
                </td>
                <td
                  style={{ border: "1px solid black", gap: 30, width: "14%" }}
                >
                  {invoice.poNumber}
                </td>
                <td
                  style={{ border: "1px solid black", gap: 30, width: "14%" }}
                >
                  {invoice.amount}
                </td>
                <td
                  style={{ border: "1px solid black", gap: 30, width: "14%" }}
                >
                  {invoice.clientWallet}
                </td>
                <td
                  style={{ border: "1px solid black", gap: 30, width: "14%" }}
                >
                  <button
                    className="button"
                    disabled={invoice.paid}
                    onClick={() => {
                      handlePay(invoice.invoiceId);
                    }}
                  >
                    {!invoice.paid ? "Pay" : "Paid"}
                  </button>
                  <button
                    className={`button decline-button`}
                    disabled={invoice.paid}
                    onClick={() => {
                      handleDecline(invoice.invoiceId);
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
