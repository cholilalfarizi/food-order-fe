import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DetailFood from "./DetailFood";

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const baseUrl = "http://localhost:5000/foods";
  useEffect(() => {
    getFood();
  }, []);

  const getFood = async () => {
    const response = await axios.get(baseUrl);
    // console.log(response.data.data);
    setFoods(response.data.data);
  };

  const deleteFood = async (id) => {
    try {
      await axios.delete(`${baseUrl}/${id}`);
      getFood();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDetailClick = (food) => {
    setSelectedFood(food); // Set the food to display in the modal
    setIsModalActive(true); // Open the modal
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalActive(false);
    setSelectedFood(null); // Clear selected food when closing
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <Link to={`add`} className="button is-success">
          Add New
        </Link>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food, index) => (
              <tr key={food.food_id}>
                <td>{index + 1}</td>
                <td>{food.name}</td>
                <td>{food.price}</td>
                <td>{food.stock}</td>
                <td>
                  <button
                    className="button is-small is-info"
                    onClick={() => handleDetailClick(food)}
                  >
                    Detail
                  </button>
                  <Link
                    to={`edit/${food.food_id}`}
                    className="button is-small is-info mx-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteFood(food.food_id)}
                    className="button is-small is-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isModalActive && selectedFood && (
          <DetailFood food={selectedFood} closeModal={closeModal} />
        )}
      </div>
    </div>
  );
};

export default FoodList;
