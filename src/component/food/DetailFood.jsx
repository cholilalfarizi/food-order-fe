import React, { useEffect, useState } from "react";
import { getFoodByIdExpress, getFoodByIdNest } from "../../api/ApiFood";

const DetailFood = ({ id, closeModal, backend }) => {
  const [food, setfood] = useState(null); // Set to null initially
  console.log("ID: ", id);
  useEffect(() => {
    getFood(id);
  }, [id]);

  const getFood = async (id) => {
    const response =
      backend === "express"
        ? await getFoodByIdExpress(id)
        : await getFoodByIdNest(id);

    setfood(response);
  };

  console.log("ID: ", id);

  if (!food) {
    // Display a loading message or an empty div while waiting for the data
    return (
      <div className={`modal is-active`}>
        <div className="modal-background" onClick={closeModal}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Loading...</p>
            <button
              className="delete"
              aria-label="close"
              onClick={closeModal}
            ></button>
          </header>
        </div>
      </div>
    );
  }
  return (
    <div className={`modal is-active`}>
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Food Information</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeModal}
          ></button>
        </header>
        <section className="modal-card-body">
          {/* Content inside the modal */}
          <div className="content">
            <p>
              <strong>ID:</strong> {food.food_id}
            </p>
            <p>
              <strong>Name:</strong> {food.name}
            </p>
            <p>
              <strong>Price:</strong> {food.price}
            </p>
            <p>
              <strong>Stock:</strong> {food.stock}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {food.is_deleted ? "Not Available" : "Available"}
            </p>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={closeModal}>
            OK
          </button>
        </footer>
      </div>
    </div>
  );
};

export default DetailFood;
