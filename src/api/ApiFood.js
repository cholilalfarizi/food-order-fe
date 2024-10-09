// src/services/api.js
import axios from "axios";

const expressUrl = import.meta.env.VITE_API_EXPRESS;
const nestUrl = import.meta.env.VITE_API_NEST;

// Fungsi untuk mendapatkan daftar food
export const getFoodsExpress = async () => {
  const response = await axios.get(`${expressUrl}/foods`);
  return response.data.data;
};

export const getFoodsNest = async () => {
  const response = await axios.get(`${nestUrl}/foods`);
  return response.data;
};

export const getFoodByIdExpress = async (id) => {
  try {
    const response = await axios.get(`${expressUrl}/foods/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getFoodByIdNest = async (id) => {
  try {
    const response = await axios.get(`${nestUrl}/foods/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Fungsi untuk menghapus food berdasarkan ID
export const deleteFoodExpress = async (id) => {
  try {
    await axios.delete(`${expressUrl}/foods/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteFoodNest = async (id) => {
  try {
    await axios.delete(`${nestUrl}/foods/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addFoodExpress = async (foodData) => {
  try {
    const response = await axios.post(`${expressUrl}/foods`, foodData);
    return response.data;
  } catch (error) {
    console.error("Error adding food:", error);
    throw error;
  }
};

export const addFoodNest = async (foodData) => {
  try {
    const response = await axios.post(`${nestUrl}/foods`, foodData);
    return response.data;
  } catch (error) {
    console.error("Error adding food:", error);
    throw error;
  }
};

export const editFoodExpress = async (foodData, id) => {
  try {
    const response = await axios.patch(`${expressUrl}/foods/${id}`, foodData);
    return response.data;
  } catch (error) {
    console.error("Error adding food:", error);
    throw error;
  }
};

export const editFoodNest = async (foodData, id) => {
  try {
    const response = await axios.patch(`${nestUrl}/foods/${id}`, foodData);
    return response.data;
  } catch (error) {
    console.error("Error adding food:", error);
    throw error;
  }
};
