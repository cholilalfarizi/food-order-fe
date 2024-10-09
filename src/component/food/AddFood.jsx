import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addFoodExpress, addFoodNest } from "../../api/ApiFood";

const AddFood = ({ backend }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const navigate = useNavigate();

  const saveFood = async (e) => {
    e.preventDefault();
    try {
      const foodData = { name, price, stock };
      await (backend === "express"
        ? addFoodExpress(foodData)
        : addFoodNest(foodData));
      navigate("/food");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={saveFood}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">price</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">stock</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <button type="submit" className="button is-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
