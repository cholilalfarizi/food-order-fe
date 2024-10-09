import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DetailTransaction from "./TransactionDetail";
import {
  deleteTransactionExpress,
  deleteTransactionNest,
  getTransactionsExpress,
  getTransactionsNest,
} from "../../api/ApiTransaction";

const TransactionList = ({ backend }) => {
  const [transactions, setTransactions] = useState([]);
  const [isModalActive, setIsModalActive] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null); // State for selected transaction ID
  const baseUrl = "http://localhost:5000/transactions";

  useEffect(() => {
    getTransaction();
  }, [backend]);

  const getTransaction = async () => {
    try {
      const response =
        backend === "express"
          ? await getTransactionsExpress()
          : await getTransactionsNest();
      setTransactions(response);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await (backend === "express"
        ? deleteTransactionExpress(id)
        : deleteTransactionNest(id));
      getTransaction();
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle the click on the "Detail" button
  const handleDetailClick = (transactionId) => {
    setSelectedTransactionId(transactionId); // Set the selected transaction ID
    setIsModalActive(true); // Open the modal
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalActive(false);
    setSelectedTransactionId(null); // Clear the selected transaction ID when closing
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
              <th>Customer ID</th>
              <th>Total Item</th>
              <th>Total Price</th>
              <th>Transaction Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction.transaction_id}>
                <td>{index + 1}</td>
                <td>{transaction.customer_id}</td>
                <td>{transaction.total_item}</td>
                <td>{transaction.total_price}</td>
                <td>{transaction.transaction_date}</td>
                <td>
                  <button
                    className="button is-small is-info"
                    onClick={() =>
                      handleDetailClick(transaction.transaction_id)
                    }
                  >
                    Detail
                  </button>
                  <Link
                    to={`edit/${transaction.transaction_id}`}
                    className="button is-small is-info mx-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() =>
                      deleteTransaction(transaction.transaction_id)
                    }
                    className="button is-small is-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Render the modal if isModalActive is true */}
        {isModalActive && selectedTransactionId && (
          <DetailTransaction
            id={selectedTransactionId}
            closeModal={closeModal}
            backend={backend}
          />
        )}
      </div>
    </div>
  );
};

export default TransactionList;
