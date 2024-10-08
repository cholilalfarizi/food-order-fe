import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditFood = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getFoodById();
  }, []);

  const updateFood = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/foods/${id}`, {
        name,
        price,
        stock,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getFoodById = async () => {
    const response = await axios.get(`http://localhost:5000/foods/${id}`);
    setName(response.data.data.name);
    setPrice(response.data.data.price);
    setStock(response.data.data.stock);
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
