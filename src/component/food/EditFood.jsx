import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  editFoodExpress,
  editFoodNest,
  getFoodByIdExpress,
  getFoodByIdNest,
} from "../../api/ApiFood";

const EditFood = ({ backend }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getFoodById();
  }, [backend]);

  const updateFood = async (e) => {
    e.preventDefault();
    try {
      const foodData = { name, price, stock };
      await (backend === "express"
        ? editFoodExpress(foodData, id)
        : editFoodNest(foodData, id));
      navigate("/food");
    } catch (error) {
      console.log(error);
    }
  };

  const getFoodById = async () => {
    const response = await (backend === "express"
      ? getFoodByIdExpress(id)
      : getFoodByIdNest(id));
    setName(response.name);
    setPrice(response.price);
    setStock(response.stock);
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={updateFood}>
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFood;
