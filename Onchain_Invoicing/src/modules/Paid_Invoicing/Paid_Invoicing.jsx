const PaidInvoicing = () => {
  const paidInvoicingString = sessionStorage.getItem("paid_invoicing");
  const paidInvoicing = JSON.parse(paidInvoicingString);
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
          {paidInvoicing &&
            paidInvoicing.map((invoice, index) => {
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
                    {invoice.paid ? "Paid" : "Unpaid"}
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

export default PaidInvoicing;
