import axios from 'axios';

import authHeader from './auth-header';

const API_URL = 'http://localhost:8000/api';
const BASE_URL = 'http://localhost:3030';

export default {
  async login(user) {
    const response = await axios.post(
      `${API_URL}/login`,
      {
        email: user.email,
        password: user.password,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.data.data.access_token) {
      localStorage.setItem('user', JSON.stringify(response.data.data));
      localStorage.setItem('user_free', JSON.stringify(response.data.data.access_token));
    }
    return response.data;
  },

  async logout() {
    await axios.post(`${API_URL}/logout`, {}, { headers: authHeader() });
    localStorage.removeItem('user_free');
  },

  async register(user) {
    console.log(user);
    const response = await axios.post(`${API_URL}/register`, {
      name: user.name,
      email: user.email,
      password: user.password,
      password_confirmation: user.password_confirmation,
    });
    if (response.data.data.access_token) {
      localStorage.setItem('user', JSON.stringify(response.data.data));
      localStorage.setItem('user_free', JSON.stringify(response.data.data.access_token));
    }
    return response.data;
  },

  async passwordForgot(userEmail) {
    const response = await axios.post(`${API_URL}/password-forgot`, {
      redirect_url: `${BASE_URL}/password-reset`,
      email: userEmail,
    });
    return response.status;
  },

  async passwordReset(passwordDTO) {
    const response = await axios.post(`${API_URL}/password-reset`, {
      password: passwordDTO.newPassword,
      password_confirmation: passwordDTO.confirmPassword,
      email: passwordDTO.email,
      token: passwordDTO.token,
    });
    return response.status;
  },
};
