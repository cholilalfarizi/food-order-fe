import React from "react";

const DetailFood = ({ food, closeModal }) => {
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
