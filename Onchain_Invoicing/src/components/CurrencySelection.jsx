import React, { useState } from "react";
import { useInvoiceContext } from "../context";

const currencies = ["OKT","BTC", "ETH", "USDT"];

const CurrencySelection = () => {
  const { selectedCurrency, setSelectedCurrency } = useInvoiceContext();

  const handleChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  return (
    <select value={selectedCurrency} onChange={handleChange}>
      {currencies.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  );
};

export default CurrencySelection;
