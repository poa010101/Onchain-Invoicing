import { useEffect, useState } from "react";
import { useInvoiceContext } from "../../context";
import CurrencySelection from "../../components/CurrencySelection";

const GenerateInvoicing = ({ state, dispatch }) => {
  const date = new Date().toLocaleString();
  const [poNumber, setPoNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [clientWallet, setClientWallet] = useState("");

  const {
    wallet,
    setWallet,
    setWalletAddress,
    contract,
    setContract,
    web,
    setWeb,
    selectedNetwork,
    walletAddress,
    selectedCurrency,
  } = useInvoiceContext();

  useEffect(() => {
    const unpaidInvoice = JSON.stringify(state.invoices);
    sessionStorage.setItem("unpaid_invoicing", unpaidInvoice);
  });

  const paidInvoicingString = sessionStorage.getItem("paid_invoicing");
  const paidInvoicing = JSON.parse(paidInvoicingString);
  // console.log("xxxx", state);
  console.log("web:", web);
  console.log("contract:", contract);

  return (
    <div className="App">
      <nav>
        <div style={{ border: "1px solid black", width: "50%" }}>
          Current Network: {selectedNetwork}
        </div>
        <div style={{ border: "1px solid black", width: "50%", marginTop: 10 }}>
          Wallet Address: {walletAddress}
        </div>
      </nav>
      <h1>Generate Invoice</h1>
      <form>
        <div>Date: {date} </div>
        <div style={{ marginTop: 10 }}>
          <label>PO Number: </label>
          <input onChange={(e) => setPoNumber(e.target.value)} />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Amount: </label>
          <input onChange={(e) => setAmount(e.target.value)} />
          <CurrencySelection />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Client Wallet: </label>
          <input onChange={(e) => setClientWallet(e.target.value)} />
        </div>
        <button
          style={{ marginTop: 10, marginBottom: 30 }}
          onClick={(e) => {
            e.preventDefault();
            dispatch({
              type: "GENERATE_INVOICE",
              payload: {
                invoiceId: Math.floor(Math.random() * 10000),
                date: date,
                poNumber: poNumber,
                amount: amount,
                clientWallet: clientWallet,
                paid: false,
                active: true,
              },
            });
          }}
        >
          Generate
        </button>
      </form>

      <h1>Wallet Invoices Record</h1>
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
        {!paidInvoicing ? (
          <tbody>
            {state.invoices.map((invoice, index) => {
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
                    {invoice.amount} {selectedCurrency}
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
        ) : (
          <tbody>
            {paidInvoicing.map((invoice, index) => {
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
                    {invoice.amount} {selectedCurrency}
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
        )}
      </table>
    </div>
  );
};

export default GenerateInvoicing;
