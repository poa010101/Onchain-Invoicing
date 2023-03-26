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
    invoices,
    setInvoices,
  } = useInvoiceContext();

  useEffect(() => {
    const unpaidInvoice = JSON.stringify(state.invoices);
    sessionStorage.setItem("unpaid_invoicing", unpaidInvoice);
  });

  const paidInvoicingString = sessionStorage.getItem("paid_invoicing");
  const paidInvoicing = JSON.parse(paidInvoicingString);
  // console.log("xxxx", state);
  // console.log("web:", web);
  // console.log("contract:", contract);

  /*
  * address fromWallet,
    address toWallet,
    uint256 amount,
    address currency,
    string memory POnumber
  * */
  // const invoice = {
  //   fromWallet: walletAddress,
  //   toWallet: clientWallet,
  //   amount: 1,
  //   address: "0xe1382c12f1da57b83a0ea368bc1e5a0b70b303ff",
  //   POnumber: "666666",
  // }
  const token_address = "0xe1382c12f1da57b83a0ea368bc1e5a0b70b303ff";
  // console.log("invoice:", invoice)
  const handleCreateTest = () => {
    createInvoiceTest()
  }
  async function handleCreate() {
    const gasPrice = await web.eth.getGasPrice();
    // console.log(walletAddress, clientWallet, token_address)
    const gasEstimate = await contract.methods.createInvoice(walletAddress,
        clientWallet, amount, token_address, poNumber)
        .estimateGas({ from: walletAddress });
    await console.log("gasPrice, gasEstimate:", gasPrice, gasEstimate)
    createInvoice(gasPrice, gasEstimate);
  }
  async function handleGetUnpaid (){
    // const result = await contract.methods.getUnpaidInvoice(walletAddress).call();
    const result = await contract.methods.getAllInvoice().call();
    await setInvoices(result);
    await console.log('Result of createInvoice:', invoices);
  }
  async function handleGetPaid () {
    // const result = await contract.methods.getPaidInvoice(walletAddress).call();
    // console.log('Result of getUnpaid:', result);
  }
  async function handleGetInfo () {
    const result = await contract.methods.getInvoiceByID(1).call();
    console.log('Result of info:', result);
    console.log('passing address:', result[1], result[2]);
  }

  async function createInvoiceTest() {
    const result = await contract.methods.createInvoice(walletAddress,
        clientWallet, amount, token_address, poNumber).call();
    console.log('Result of createInvoiceTest:', result);
  }
  async function createInvoice(gasPrice, gasEstimate) {
    const result = await contract.methods.createInvoice(walletAddress,
        clientWallet, amount, token_address, poNumber)
        .send({ from: walletAddress, gasPrice, gas: gasEstimate })
        .on('transactionHash', (hash) => {
          console.log('Transaction hash:', hash);
        })
        .on('receipt', (receipt) => {
          console.log('Transaction receipt:', receipt);
        })
        .on('error', (error) => {
          console.error('Transaction error:', error);
        });
    console.log('Result of createInvoice:', result);
  }


  // 0xe1382c12f1da57b83a0ea368bc1e5a0b70b303ff
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
                invoiceId: Math.floor(Math.random() * 1000000000000000),
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

      <div>
        <button
            onClick={(e) => {
              handleCreateTest()
            }}
        >
          Test create
        </button>
        <button
            onClick={(e) => {
              handleCreate()
            }}
        >
          Create Invoice
        </button>
        <button
            onClick={(e) => {
              handleGetUnpaid()
            }}
        >
          Get All
        </button>
        {/*<button*/}
            {/*onClick={(e) => {*/}
              {/*handleGetPaid()*/}
            {/*}}*/}
        {/*>*/}
          {/*Get Paid*/}
        {/*</button>*/}
        <button
            onClick={(e) => {
              handleGetInfo()
            }}
        >
          Get Info
        </button>
      </div>

      <h1>Wallet Invoices Record</h1>
      <table style={{ border: "1px solid black", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", gap: 30, width: "14%" }}>
              Invoice Number
            </th>
            {/*<th style={{ border: "1px solid black", gap: 30, width: "14%" }}>*/}
              {/*Date*/}
            {/*</th>*/}
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
            {invoices.map((invoice, index) => {
              return (
                <tr key={index}>
                  <td
                    style={{ border: "1px solid black", gap: 30, width: "14%" }}
                  >
                    {invoice[0]}
                  </td>
                  {/*<td*/}
                    {/*style={{ border: "1px solid black", gap: 30, width: "14%" }}*/}
                  {/*>*/}
                    {/*{invoice.date}*/}
                  {/*</td>*/}
                  <td
                    style={{ border: "1px solid black", gap: 30, width: "14%" }}
                  >
                    {invoice[7]}
                  </td>
                  <td
                    style={{ border: "1px solid black", gap: 30, width: "14%" }}
                  >
                    {invoice.amount} {selectedCurrency}
                  </td>
                  <td
                    style={{ border: "1px solid black", gap: 30, width: "14%" }}
                  >
                    {invoice[2]}
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
                    {invoice[0]}
                  </td>
                  {/*<td*/}
                    {/*style={{ border: "1px solid black", gap: 30, width: "14%" }}*/}
                  {/*>*/}
                    {/*{invoice.date}*/}
                  {/*</td>*/}
                  <td
                    style={{ border: "1px solid black", gap: 30, width: "14%" }}
                  >
                    {invoice[7]}
                  </td>
                  <td
                    style={{ border: "1px solid black", gap: 30, width: "14%" }}
                  >
                    {invoice.amount} {selectedCurrency}
                  </td>
                  <td
                    style={{ border: "1px solid black", gap: 30, width: "14%" }}
                  >
                    {invoice[2]}
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
