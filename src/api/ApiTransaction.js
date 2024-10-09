// src/services/api.js
import axios from "axios";

const expressUrl = import.meta.env.VITE_API_EXPRESS;
const nestUrl = import.meta.env.VITE_API_NEST;

// Fungsi untuk mendapatkan daftar transaction
export const getTransactionsExpress = async () => {
  const response = await axios.get(`${expressUrl}/transactions`);
  return response.data.data;
};

export const getTransactionsNest = async () => {
  const response = await axios.get(`${nestUrl}/transactions`);
  return response.data;
};

export const getTransactionByIdExpress = async (id) => {
  try {
    const response = await axios.get(`${expressUrl}/transactions/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTransactionByIdNest = async (id) => {
  try {
    const response = await axios.get(`${nestUrl}/transactions/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Fungsi untuk menghapus transaction berdasarkan ID
export const deleteTransactionExpress = async (id) => {
  try {
    await axios.delete(`${expressUrl}/transactions/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteTransactionNest = async (id) => {
  try {
    await axios.delete(`${nestUrl}/transactions/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addTransactionExpress = async (orderData) => {
  //   try {
  const response = await axios.post(`${expressUrl}/transactions`, orderData);
  return response.data;
  //   } catch (error) {
  //     console.error("Error adding transaction:", error);
  //     throw error;
  //   }
};

export const addTransactionNest = async (orderData) => {
  //   try {
  const response = await axios.post(`${nestUrl}/transactions`, orderData);
  return response.data;
  //   } catch (error) {
  //     console.error("Error adding transaction:", error);
  //     throw error;
  //   }
};

export const editTransactionExpress = async (orderData, id) => {
  const response = await axios.patch(
    `${expressUrl}/transactions/${id}`,
    orderData
  );
  return response.data;
};

export const editTransactionNest = async (orderData, id) => {
  const response = await axios.patch(
    `${nestUrl}/transactions/${id}`,
    orderData
  );
  return response.data;
};
