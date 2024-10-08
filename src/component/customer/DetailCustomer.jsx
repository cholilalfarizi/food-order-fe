import React from "react";

const DetailCustomer = ({ customer, closeModal }) => {
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
