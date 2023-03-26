import { useReducer, useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import GenerateInvoicing from "./modules/Generate_Invoice/Generate_Invoice";
import Login from "./modules/ConnectWallet/ConnectWallet";
import MockUnpaidInvoicing from "./Mock_Unpaid_Invoice/Unpaid_Invoicing";
import PaidInvoicing from "./modules/Paid_Invoicing/Paid_Invoicing";
import UnpaidInvoicing from "./modules/Unpaid_Invoicing/Unpaid_Invoicing";
import walletReducer from "./Reducer/WalletReducer";
import { useInvoiceContext } from "./context";

import "./App.css";

const App = () => {
  const [state, dispatch] = useReducer(walletReducer, {
    invoices: [],
  });

  const { wallet } = useInvoiceContext();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };
  return (
    <BrowserRouter>
      <div>
        <h1 style={{ textAlign: "center", marginTop: "15%" }}>
          Onchain Invoicing
        </h1>
        {wallet && (
          <ul>
            <li>
              <Link
                to="/generate_invoicing"
                onClick={() => handleTabChange(1)}
                className={activeTab === 1 ? "active" : ""}
              >
                Generate Invoicing
              </Link>
            </li>
            <li>
              <Link
                to="/unpaid_invoicing"
                onClick={() => handleTabChange(2)}
                className={activeTab === 2 ? "active" : ""}
              >
                Unpaid Invoicing
              </Link>
            </li>
            <li>
              <Link
                to="/paid_invoicing"
                onClick={() => handleTabChange(3)}
                className={activeTab === 3 ? "active" : ""}
              >
                Paid Invoicing
              </Link>
            </li>
          </ul>
        )}

        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/generate_invoicing"
            element={<GenerateInvoicing state={state} dispatch={dispatch} />}
          />
          <Route path="/unpaid_invoicing" element={<UnpaidInvoicing />} />
          <Route
            path="/mock/unpaid_invoicing"
            element={<MockUnpaidInvoicing />}
          />
          <Route path="/paid_invoicing" element={<PaidInvoicing />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
