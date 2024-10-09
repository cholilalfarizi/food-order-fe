import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DetailCustomer from "./DetailCustomer";
import {
  getCustomersExpress,
  getCustomersNest,
  deleteCustomerExpress,
  deleteCustomerNest,
} from "../../api/ApiCustomer";

const CustomerList = ({ backend }) => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    getCustomer();
  }, [backend]);

  const getCustomer = async () => {
    const response =
      backend === "express"
        ? await getCustomersExpress()
        : await getCustomersNest();
    setCustomers(response);
  };

  console.log(customers);
  console.log("backend: ", backend);

  const deleteCustomer = async (id) => {
    try {
      await (backend === "express"
        ? deleteCustomerExpress(id)
        : deleteCustomerNest(id));
      getCustomer();
    } catch (error) {
      console.log(error);
    }
  };

  // Function to open the modal with the selected customer's details
  const handleDetailClick = (id) => {
    setSelectedCustomer(id); // Set the customer to display in the modal
    setIsModalActive(true); // Open the modal
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalActive(false);
    setSelectedCustomer(null); // Clear selected customer when closing
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
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={customer.customer_id}>
                <td>{index + 1}</td>
                <td>{customer.name}</td>
                <td>{customer.phone}</td>
                <td>{customer.address}</td>
                <td>
                  <button
                    className="button is-small is-info"
                    onClick={() => handleDetailClick(customer.customer_id)}
                  >
                    Detail
                  </button>
                  <Link
                    to={`edit/${customer.customer_id}`}
                    className="button is-small is-info mx-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteCustomer(customer.customer_id)}
                    className="button is-small is-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Render the modal */}
        {isModalActive && selectedCustomer && (
          <DetailCustomer
            id={selectedCustomer}
            closeModal={closeModal}
            backend={backend}
          />
        )}
      </div>
    </div>
  );
};

export default CustomerList;
