import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DetailCustomer from "./DetailCustomer";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const baseUrl = "http://localhost:5000/customers";

  useEffect(() => {
    getCustomer();
  }, []);

  const getCustomer = async () => {
    const response = await axios.get(baseUrl);
    setCustomers(response.data.data);
  };

  const deleteCustomer = async (id) => {
    try {
      await axios.delete(`${baseUrl}/${id}`);
      getCustomer();
    } catch (error) {
      console.log(error);
    }
  };

  // Function to open the modal with the selected customer's details
  const handleDetailClick = (customer) => {
    setSelectedCustomer(customer); // Set the customer to display in the modal
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
                    onClick={() => handleDetailClick(customer)}
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
          <DetailCustomer customer={selectedCustomer} closeModal={closeModal} />
        )}
      </div>
    </div>
  );
};

export default CustomerList;
