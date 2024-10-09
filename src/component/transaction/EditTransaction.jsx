import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditTransaction = () => {
  const [transaction, setTransaction] = useState(null);
  const [foods, setFoods] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getFoods();
    getCustomers();
    getTransaction();
  }, []);

  const getFoods = async () => {
    try {
      const response = await axios.get("http://localhost:5000/foods");
      setFoods(response.data.data);
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  const getCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/customers");
      setCustomers(response.data.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const getTransaction = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/transactions/${id}`
      );
      setTransaction(response.data.data);
      setFoodItems(
        response.data.data.transaction_details.map((detail) => ({
          food_id: detail.food_id,
          qty: detail.qty,
        }))
      );
    } catch (error) {
      console.error("Error fetching transaction:", error);
    }
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
      prevItems.map((item) =>
        item.food_id === foodId ? { ...item, qty } : item
      )
    );
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const validFoodItems = foodItems.filter(
      (item) => item.food_id !== undefined && item.qty > 0
    );

    if (validFoodItems.length === 0) {
      alert(
        "Please select at least one food item with a quantity greater than zero."
      );
      return;
    }

    const orderData = {
      transactionDetails: validFoodItems,
    };

    try {
      await axios.patch(`http://localhost:5000/transactions/${id}`, orderData);
      alert("Transaction updated successfully!");
      navigate("/transaction");
    } catch (error) {
      console.error("Error updating transaction:", error);
      alert("Failed to update transaction. Please try again.");
    }
  };

  if (!transaction) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="title">Edit Transaction</h1>

      <div className="field">
        <label className="label">Customer</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={
              customers.find((c) => c.customer_id === transaction.customer_id)
                ?.name || ""
            }
            disabled
          />
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
          {foods.map((food) => {
            const foodItem = foodItems.find(
              (item) => item.food_id === food.food_id
            );
            const isSelected = !!foodItem;
            return (
              <tr key={food.food_id}>
                <td>
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      checked={isSelected}
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
                    value={foodItem?.qty || 0}
                    onChange={(e) =>
                      handleQuantityChange(
                        food.food_id,
                        parseInt(e.target.value)
                      )
                    }
                    className="input is-small"
                    style={{ width: "60px" }}
                    disabled={!isSelected}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="field">
        <div className="control">
          <button className="button is-primary" onClick={handleSubmitEdit}>
            Update Transaction
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTransaction;
