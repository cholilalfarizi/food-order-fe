import { Route, Routes, BrowserRouter } from "react-router-dom";
import CustomerList from "./component/customer/CustomerList";
import AddCustomer from "./component/customer/AddCustomer";
import EditCustomer from "./component/customer/EditCustomer";
import NavBar from "./component/NavBar";
import FoodList from "./component/food/FoodList";
import AddFood from "./component/food/AddFood";
import EditFood from "./component/food/EditFood";
import TransactionList from "./component/transaction/TransactionList";
import AddTransaction from "./component/transaction/AddTransaction";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<CustomerList />} />
          <Route path="/customer" element={<CustomerList />} />
          <Route path="/customer/add" element={<AddCustomer />} />
          <Route path="/customer/edit/:id" element={<EditCustomer />} />
          <Route path="/food" element={<FoodList />} />
          <Route path="/food/add" element={<AddFood />} />
          <Route path="/food/edit/:id" element={<EditFood />} />
          <Route path="/transaction" element={<TransactionList />} />
          <Route path="/transaction/add" element={<AddTransaction />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
