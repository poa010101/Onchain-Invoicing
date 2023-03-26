import { useState, useEffect } from "react";

const Unpaid_Invoicing = () => {
  const unpaidInvoicingString = sessionStorage.getItem("unpaid_invoicing");
  const unpaidInvoicing = JSON.parse(unpaidInvoicingString);

  const [payInvoice, setPayInvoice] = useState(unpaidInvoicing);

  useEffect(() => {
    const paidInvoice = JSON.stringify(payInvoice);
    sessionStorage.setItem("paid_invoicing", paidInvoice);
  });

  const handleButton = (invoiceId) => {
    const updatedInvoice = payInvoice.map((invoice) =>
      invoice.invoiceId === invoiceId ? { ...invoice, paid: true } : invoice
    );
    setPayInvoice(updatedInvoice);
    alert("You have Paid");
  };

  return (
    <div>
      <h1>Unpaid_Invoicing</h1>
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
                    style={{ textAlign: "center" }}
                    disabled={invoice.paid}
                    onClick={() => {
                      handleButton(invoice.invoiceId);
                    }}
                  >
                    {!invoice.paid ? "Pay" : "Paid"}
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

export default Unpaid_Invoicing;
