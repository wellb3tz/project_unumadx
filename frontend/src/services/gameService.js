// frontend/src/services/gameService.js
import axios from 'axios';
import { CONFIG } from '../config';

class GameService {
  constructor() {
    this.api = axios.create({
      baseURL: CONFIG.API_BASE_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async exploreWorld() {
    const response = await this.api.post('/world/explore');
    return response.data;
  }

  async collectItem(itemId) {
    const response = await this.api.post(`/items/${itemId}/collect`);
    return response.data;
  }

  async upgradeItem(itemId) {
    const response = await this.api.post(`/items/${itemId}/upgrade`);
    return response.data;
  }

  async getInventory() {
    const response = await this.api.get('/inventory');
    return response.data;
  }
}

export const gameService = new GameService();