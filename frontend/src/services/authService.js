// frontend/src/services/authService.js
import { TelegramWebApp } from '@twa-dev/sdk';
import axios from 'axios';

class AuthService {
  constructor() {
    this.initData = TelegramWebApp.initData || '';
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
    return TelegramWebApp.initDataUnsafe.user;
  }
}

export const authService = new AuthService();