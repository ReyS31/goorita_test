import axios from 'axios';

import authHeader from './auth-header';

const API_URL = 'http://127.0.0.1:8000/api';

export default {
  async history({ page = 1 }) {
    const response = await axios.get(`${API_URL}/user/history?page=${page}`, {
      headers: authHeader(),
    });

    return response.data;
  },

  async historyDetail({ id }) {
    const response = await axios.get(`${API_URL}/user/history/${id}`, {
      headers: authHeader(),
    });

    return response.data;
  },
};
