import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import CustomerList from "./component/customer/CustomerList";
import AddCustomer from "./component/customer/AddCustomer";
import EditCustomer from "./component/customer/EditCustomer";
import NavBar from "./component/NavBar";
import FoodList from "./component/food/FoodList";
import AddFood from "./component/food/AddFood";
import EditFood from "./component/food/EditFood";
import TransactionList from "./component/transaction/TransactionList";
import AddTransaction from "./component/transaction/AddTransaction";
import EditTransaction from "./component/transaction/EditTransaction";
import { useState } from "react";

function App() {
  const [backend, setBackend] = useState("express"); // Default to Express
  return (
    <>
      <BrowserRouter>
        <NavBar setBackend={setBackend} />
        <Routes>
          <Route path="/" element={<Navigate to="/customer" />} />
          <Route
            path="/customer"
            element={<CustomerList backend={backend} />}
          />
          <Route
            path="/customer/add"
            element={<AddCustomer backend={backend} />}
          />
          <Route
            path="/customer/edit/:id"
            element={<EditCustomer backend={backend} />}
          />
          <Route path="/food" element={<FoodList backend={backend} />} />
          <Route path="/food/add" element={<AddFood backend={backend} />} />
          <Route
            path="/food/edit/:id"
            element={<EditFood backend={backend} />}
          />
          <Route path="/transaction" element={<TransactionList />} />
          <Route path="/transaction/add" element={<AddTransaction />} />
          <Route path="/transaction/edit/:id" element={<EditTransaction />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
