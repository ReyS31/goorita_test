import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export default {
  async products({ link = `${API_URL}/api/products` }) {
    const response = await axios.get(link, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
   
    return response.data;
  },

  async product({ id }) {
    const response = await axios.get(`${API_URL}/api/products/${id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  },
};
