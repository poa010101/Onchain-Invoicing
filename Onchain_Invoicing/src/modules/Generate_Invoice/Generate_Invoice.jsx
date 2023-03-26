import { useReducer, useState } from "react";
import { useInvoiceContext } from "../../context";
import walletReducer from "../../Reducer/WalletReducer";

const GenerateInvoicing = () => {

  const date = new Date().toLocaleString();
  const [poNumber, setPoNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [clientWallet, setClientWallet] = useState("");
  const { setGeneratedInvoice } = useInvoiceContext();
  const { wallet, walletAddress, setWallet, setWalletAddress, contract, setContract, web, setWeb } =
      useInvoiceContext();

  const [state, dispatch] = useReducer(walletReducer, {
    invoices: [
      {
        invoiceId: Math.floor(Math.random() * 10000),
        date: "1/1/2023",
        poNumber: "123",
        amount: "$7",
        clientWallet: "abc",
        paid: true,
        active: true,
      },
    ],
  });

  // console.log("xxxx", state);
  console.log("web:", web);
  console.log("contract:", contract);

  return (
    <div className="App">
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
              },
            });
            setGeneratedInvoice(true);
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
                {/* <td
                  style={{ border: "1px solid black", gap: 30, width: "30%" }}
                >
                  <button
                    onClick={() =>
                      dispatch({
                        type: "DONE_BUTTON",
                        payload: {
                          id: todo.id,
                          done: true,
                        },
                      })
                    }
                  >
                    {invoice.done ? "Done" : "To-Do"}
                  </button>{" "}
                  <button
                    disabled={invoice.done}
                    onClick={() =>
                      dispatch({
                        type: "DELETE_BUTTON",
                        payload: {
                          id: todo.id,
                        },
                      })
                    }
                  >
                    Delete
                  </button>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GenerateInvoicing;
