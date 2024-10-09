// src/services/api.js
import axios from "axios";

const expressUrl = import.meta.env.VITE_API_EXPRESS;
const nestUrl = import.meta.env.VITE_API_NEST;

// Fungsi untuk mendapatkan daftar customer
export const getCustomersExpress = async () => {
  const response = await axios.get(`${expressUrl}/customers`);
  return response.data.data;
};

export const getCustomersNest = async () => {
  const response = await axios.get(`${nestUrl}/customers`);
  return response.data;
};

export const getCustomerByIdExpress = async (id) => {
  try {
    const response = await axios.get(`${expressUrl}/customers/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCustomerByIdNest = async (id) => {
  try {
    const response = await axios.get(`${nestUrl}/customers/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Fungsi untuk menghapus customer berdasarkan ID
export const deleteCustomerExpress = async (id) => {
  try {
    await axios.delete(`${expressUrl}/customers/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCustomerNest = async (id) => {
  try {
    await axios.delete(`${nestUrl}/customers/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addCustomerExpress = async (customerData) => {
  try {
    const response = await axios.post(`${expressUrl}/customers`, customerData);
    return response.data;
  } catch (error) {
    console.error("Error adding customer:", error);
    throw error;
  }
};

export const addCustomerNest = async (customerData) => {
  try {
    const response = await axios.post(`${nestUrl}/customers`, customerData);
    return response.data;
  } catch (error) {
    console.error("Error adding customer:", error);
    throw error;
  }
};

export const editCustomerExpress = async (customerData, id) => {
  try {
    const response = await axios.patch(
      `${expressUrl}/customers/${id}`,
      customerData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding customer:", error);
    throw error;
  }
};

export const editCustomerNest = async (customerData, id) => {
  try {
    const response = await axios.patch(
      `${nestUrl}/customers/${id}`,
      customerData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding customer:", error);
    throw error;
  }
};
