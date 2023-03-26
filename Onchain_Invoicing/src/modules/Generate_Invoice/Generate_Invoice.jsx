import { useReducer, useState } from "react";
import { useInvoiceContext } from "../../context";
import walletReducer from "../../Reducer/WalletReducer";

const GenerateInvoicing = () => {
  const [date, setDate] = useState("");
  const [item, setItem] = useState("");
  // const [done, setDone] = useState(true)
  const [state, dispatch] = useReducer(walletReducer, {
    items: [
      {
        id: Math.floor(Math.random() * 10000),
        date: "1/1/2023",
        item: "study",
        done: false,
      },
    ],
  });

  console.log("xxxx", state);

  return (
    <div className="App">
      <h1>Generate Invoice</h1>
      <form>
        <div>
          <label>PO Number: </label>
          <input onChange={(e) => setDate(e.target.value)} />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Amount: </label>
          <input onChange={(e) => setItem(e.target.value)} />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Client Wallet: </label>
          <input onChange={(e) => setItem(e.target.value)} />
        </div>
        <button
          style={{ marginTop: 10, marginBottom: 30 }}
          onClick={(e) => {
            e.preventDefault();
            dispatch({
              type: "ADD_ITEMS",
              payload: {
                id: Math.floor(Math.random() * 10000),
                date: date,
                item: item,
                done: false,
              },
            });
          }}
        >
          Add
        </button>
      </form>

      <h1>Wallet Invoices Record</h1>
      <table style={{ border: "1px solid black", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", gap: 30, width: "30%" }}>
              Date
            </th>
            <th style={{ border: "1px solid black", gap: 30, width: "30%" }}>
              To-Do Item
            </th>
            <th style={{ border: "1px solid black", gap: 30, width: "30%" }}>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {state.items.map((todo, index) => {
            return (
              <tr key={index}>
                <td
                  style={{ border: "1px solid black", gap: 30, width: "30%" }}
                >
                  {todo.date}
                </td>
                <td
                  style={{ border: "1px solid black", gap: 30, width: "30%" }}
                >
                  {todo.item}
                </td>
                <td
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
                    {todo.done ? "Done" : "To-Do"}
                  </button>{" "}
                  <button
                    disabled={todo.done}
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GenerateInvoicing;
