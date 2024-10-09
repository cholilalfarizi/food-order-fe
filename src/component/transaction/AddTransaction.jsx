import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFoodsExpress, getFoodsNest } from "../../api/ApiFood";
import { getCustomersExpress, getCustomersNest } from "../../api/ApiCustomer";
import {
  addTransactionExpress,
  addTransactionNest,
} from "../../api/ApiTransaction";

const AddTransaction = ({ backend }) => {
  const [foods, setFoods] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getFoods();
    getCustomers();
  }, [backend]);

  const getFoods = async () => {
    try {
      const response =
        backend === "express" ? await getFoodsExpress() : await getFoodsNest();
      setFoods(response);
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  const getCustomers = async () => {
    try {
      const response =
        backend === "express"
          ? await getCustomersExpress()
          : await getCustomersNest();
      setCustomers(response);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleCustomerChange = (e) => {
    setSelectedCustomer(e.target.value);
  };

  const handleFoodSelection = (foodId) => {
    setFoodItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.food_id === foodId);
      if (existingItem) {
        return prevItems.filter((item) => item.food_id !== foodId);
      } else {
        return [...prevItems, { food_id: foodId, qty: 0 }];
      }
    });
  };

  const handleQuantityChange = (foodId, qty) => {
    setFoodItems((prevItems) =>
      prevItems
        .map((item) => (item.food_id === foodId ? { ...item, qty } : item))
        .filter((item) => item.qty > 0 || item.food_id === foodId)
    );
  };

  const handleSubmitOrder = async () => {
    if (!selectedCustomer || foodItems.length === 0) {
      alert("Please select a customer and at least one food item.");
      return;
    }

    const orderData = {
      customer_id: parseInt(selectedCustomer),
      food_items: foodItems.filter((item) => item.qty > 0),
    };

    try {
      await (backend === "express"
        ? addTransactionExpress(orderData)
        : addTransactionNest(orderData));
      alert("Order submitted successfully!");
      setSelectedCustomer("");
      setFoodItems([]);
      navigate("/transaction");
    } catch (error) {
      console.error("Error submitting order:", error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="title">Food Order</h1>

      <div className="field">
        <label className="label">Select Customer</label>
        <div className="control">
          <div className="select">
            <select value={selectedCustomer} onChange={handleCustomerChange}>
              <option value="">Select a customer</option>
              {customers.map((customer) => (
                <option key={customer.customer_id} value={customer.customer_id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food) => (
            <tr key={food.food_id}>
              <td>
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={foodItems.some(
                      (item) => item.food_id === food.food_id
                    )}
                    onChange={() => handleFoodSelection(food.food_id)}
                  />
                </label>
              </td>
              <td>{food.name}</td>
              <td>${food.price}</td>
              <td>{food.stock}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  max={food.stock}
                  value={
                    foodItems.find((item) => item.food_id === food.food_id)
                      ?.qty || 0
                  }
                  onChange={(e) =>
                    handleQuantityChange(food.food_id, parseInt(e.target.value))
                  }
                  className="input is-small"
                  style={{ width: "60px" }}
                  disabled={
                    !foodItems.some((item) => item.food_id === food.food_id)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="field">
        <div className="control">
          <button className="button is-primary" onClick={handleSubmitOrder}>
            Submit Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
