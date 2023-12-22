import axios from 'axios';

import authHeader from './auth-header';

const API_URL = 'http://127.0.0.1:8000/api';

export default {
  async addToCart({ amount, product_id }) {
    const response = await axios.post(
      `${API_URL}/user/cart/add`,
      {
        amount,
        product_id,
      },
      {
        headers: authHeader(),
      }
    );

    return response.data;
  },

  async cart() {
    const response = await axios.get(`${API_URL}/user/cart`, {
      headers: authHeader(),
    });

    return response.data;
  },

  async checkout() {
    const response = await axios.post(
      `${API_URL}/user/cart/add`,
      {},
      {
        headers: authHeader(),
      }
    );

    return response.data;
  },

  async removeItem({ id }) {
    const response = await axios.delete(`${API_URL}/user/cart/remove/${id}`, {
      headers: authHeader(),
    });

    return response.data;
  },

  async updateItem({ amount, id }) {
    const response = await axios.put(
      `${API_URL}/user/cart/update`,
      { amount, detail_id: id },
      {
        headers: authHeader(),
      }
    );

    return response.data;
  },
};
