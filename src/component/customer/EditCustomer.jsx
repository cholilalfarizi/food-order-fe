import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  editCustomerExpress,
  editCustomerNest,
  getCustomerByIdExpress,
  getCustomerByIdNest,
} from "../../api/ApiCustomer";
const EditCustomer = ({ backend }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getCustomerById();
  }, [backend]);

  const updateCustomer = async (e) => {
    e.preventDefault();
    try {
      const customerData = { name, phone, address };
      await (backend === "express"
        ? editCustomerExpress(customerData)
        : editCustomerNest(customerData));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomerById = async () => {
    const response = await (backend === "express"
      ? getCustomerByIdExpress(id)
      : getCustomerByIdNest(id));
    setName(response.name);
    setPhone(response.phone);
    setAddress(response.address);
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={updateCustomer}>
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
            <label className="label">phone</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Address</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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

export default EditCustomer;
