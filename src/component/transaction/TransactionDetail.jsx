import axios from "axios";
import React, { useState, useEffect } from "react";

const DetailTransaction = ({ id, closeModal }) => {
  const [transaction, setTransaction] = useState(null); // Set to null initially
  const baseUrl = "http://localhost:5000/transactions";

  useEffect(() => {
    getTransaction(id);
  }, [id]);

  const getTransaction = async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/${id}`);
      setTransaction(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(transaction);

  if (!transaction) {
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
          <p className="modal-card-title">Transaction Information</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeModal}
          ></button>
        </header>
        <section className="modal-card-body">
          {/* Transaction details */}
          <div className="content">
            <p>
              <strong>Customer Name:</strong> {transaction.customer?.name}
            </p>
            <p>
              <strong>Transaction Date:</strong> {transaction.transaction_date}
            </p>
            <p>
              <strong>Total Price:</strong> {transaction.total_price}
            </p>

            <h3 className="subtitle">Transaction Details:</h3>
            <table className="table is-fullwidth">
              <thead>
                <tr>
                  <th>Food Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {transaction.transaction_details?.map((detail, index) => (
                  <tr key={index}>
                    <td>{detail.food.name}</td>
                    <td>{detail.food.price}</td>
                    <td>{detail.qty}</td>
                    <td>{detail.total_price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default DetailTransaction;
