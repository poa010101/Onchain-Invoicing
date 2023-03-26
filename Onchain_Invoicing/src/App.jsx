import { useReducer } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GenerateInvoicing from "./modules/Generate_Invoice/Generate_Invoice";
import Login from "./modules/ConnectWallet/ConnectWallet";
import UnpaidInvoicing from "./modules/Unpaid_Invoicing/Unpaid_Invoicing";
import PaidInvoicing from "./modules/Paid_Invoicing/Paid_Invoicing";
import walletReducer from "./Reducer/WalletReducer";

const App = () => {
  const [state, dispatch] = useReducer(walletReducer, {
    invoices: [],
  });

  return (
    <div>
      <h1>Onhain Invoicing</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/generate_invoicing"
            element={<GenerateInvoicing state={state} dispatch={dispatch} />}
          />
          <Route path="/unpaid_invoicing" element={<UnpaidInvoicing />} />
          <Route path="/paid_invoicing" element={<PaidInvoicing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
