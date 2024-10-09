import React, { useEffect, useState } from "react";
import {
  getCustomerByIdExpress,
  getCustomerByIdNest,
} from "../../api/ApiCustomer";

const DetailCustomer = ({ id, closeModal, backend }) => {
  const [customer, setCustomer] = useState(null); // Set to null initially
  console.log("ID: ", id);
  useEffect(() => {
    getCustomer(id);
  }, [id]);

  const getCustomer = async (id) => {
    const response =
      backend === "express"
        ? await getCustomerByIdExpress(id)
        : await getCustomerByIdNest(id);

    setCustomer(response);
  };

  console.log("ID: ", id);

  if (!customer) {
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
          <p className="modal-card-title">Customer Information</p>
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
              <strong>ID:</strong> {customer.customer_id}
            </p>
            <p>
              <strong>Name:</strong> {customer.name}
            </p>
            <p>
              <strong>Phone:</strong> {customer.phone}
            </p>
            <p>
              <strong>Address:</strong> {customer.address}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {customer.is_deleted ? "Inactive" : "Active"}
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

export default DetailCustomer;
