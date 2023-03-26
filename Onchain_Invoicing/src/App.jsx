import { BrowserRouter, Route, Routes } from "react-router-dom";
import GenerateInvoicing from "./modules/Generate_Invoice/Generate_Invoice";
import Login from "./modules/ConnectWallet/ConnectWallet";

const App = () => {
  return (
    <div>
      <h1>Onchain Invoicing</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/generate_invoicing" element={<GenerateInvoicing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
