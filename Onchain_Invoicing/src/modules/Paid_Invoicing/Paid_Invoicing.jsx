import "../Generate_Invoice/Generate_Invoice.css";
import { useInvoiceContext } from "../../context";

const PaidInvoicing = () => {
  const unpaidInvoicingString = sessionStorage.getItem("unpaid_invoicing");
  const unpaidInvoicing = JSON.parse(unpaidInvoicingString);

  const paidInvoicingString = sessionStorage.getItem("paid_invoicing");
  // const paidInvoicing = JSON.parse(paidInvoicingString);
  const { web, walletAddress, invoices, setInvoices } = useInvoiceContext();
  const paidInvoicing = invoices.filter((invoice) => invoice.paid === true);
  return (
    <div>
      <h1>Paid_Invoicing</h1>
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
          {paidInvoicing
            ? paidInvoicing.map((invoice, index) => {
                return (
                  <tr key={index}>
                    <td
                      style={{
                        border: "1px solid black",
                        gap: 30,
                        width: "14%",
                      }}
                    >
                      {invoice[0]}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        gap: 30,
                        width: "14%",
                      }}
                    >
                      {Date(invoice[3] * 1000)}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        gap: 30,
                        width: "14%",
                      }}
                    >
                      {invoice[7]}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        gap: 30,
                        width: "14%",
                      }}
                    >
                      {invoice.amount}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        gap: 30,
                        width: "14%",
                      }}
                    >
                      {invoice[2]}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        gap: 30,
                        width: "14%",
                      }}
                    >
                      {invoice.paid ? "Paid" : "Unpaid"}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        gap: 30,
                        width: "14%",
                      }}
                    >
                      {invoice.active ? "Active" : "Inactive"}
                    </td>
                  </tr>
                );
              })
            : unpaidInvoicing.map((invoice, index) => {
                return (
                  <tr key={index}>
                    <td
                      style={{
                        border: "1px solid black",
                        gap: 30,
                        width: "14%",
                      }}
                    >
                      {invoice[0]}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        gap: 30,
                        width: "14%",
                      }}
                    >
                      {Date(invoice[3] * 1000)}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        gap: 30,
                        width: "14%",
                      }}
                    >
                      {invoice[7]}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        gap: 30,
                        width: "14%",
                      }}
                    >
                      {invoice.amount}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        gap: 30,
                        width: "14%",
                      }}
                    >
                      {invoice[2]}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        gap: 30,
                        width: "14%",
                      }}
                    >
                      {invoice.paid ? "Paid" : "Unpaid"}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        gap: 30,
                        width: "14%",
                      }}
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
