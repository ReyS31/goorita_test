import axios from 'axios';

import authHeader from './auth-header';

const API_URL = 'http://127.0.0.1:8000';

export default {
  async getProfile() {
    const response = await axios.get(`${API_URL}/user`, { headers: authHeader() });
    return response.data;
  },
};
