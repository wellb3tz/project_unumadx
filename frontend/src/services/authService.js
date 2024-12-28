// frontend/src/services/authService.js
import WebApp from '@twa-dev/sdk';
import axios from 'axios';
import { CONFIG } from '../config';  // Add this import

class AuthService {
  constructor() {
    this.initData = WebApp.initData || '';
  }

  async validateUser() {
    try {
      const response = await axios.post(`${CONFIG.API_BASE_URL}/auth/validate`, {
        initData: this.initData
      });
      return response.data;
    } catch (error) {
      console.error('Auth validation failed:', error);
      throw error;
    }
  }

  getUserData() {
    return WebApp.initDataUnsafe.user;
  }
}

export const authService = new AuthService();