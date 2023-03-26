import { useState } from "react";
import { mockUnpaidData } from "./mockUpaidInvoicing";
import {useInvoiceContext} from "../../context";

const UnpaidInvoicing = () => {
  const [payInvoice, setPayInvoice] = useState(mockUnpaidData);
  const {
    web,
    walletAddress,

  } = useInvoiceContext();
  const handlePay = (invoiceId) => {
    ethPay("0xBa94cA55Bb24617D56EE67D659083A577339BC01", 1);
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

  async function ethPay(recipientAddress, amountInEther) {

    if (!web || !walletAddress) {
      console.error('Missing web3 or account');
      return;
    }

    try {
      //
      const gasPrice = await web.eth.getGasPrice();
      const gasEstimate = await web.eth.estimateGas({ from: walletAddress, to: recipientAddress, value: amountInEther });
      // const amountInWei = web.utils.toWei(String(amountInEther), 'ether');
      const transactionParameters = {
        from: walletAddress,
        to: recipientAddress,
        value: String(amountInEther),
        gasPrice: gasPrice,
        gas: String(gasEstimate),
      };
      console.log(transactionParameters)
      const result = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
      await console.log(result)
    } catch (error) {
      console.error('Error sending transaction ', error);
    }
  }
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
                      handlePay(invoice.invoiceId);
                    }}
                  >
                    {!invoice.paid ? "Pay" : "Paid"}
                  </button>
                  <button
                    style={{ textAlign: "center" }}
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
