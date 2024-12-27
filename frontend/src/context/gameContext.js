// frontend/src/context/GameContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { gameService } from '../services/gameService';
import { authService } from '../services/authService';

const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = async () => {
    try {
      setLoading(true);
      // Validate Telegram user
      await authService.validateUser();
      const userData = authService.getUserData();
      setUser(userData);

      // Load initial inventory
      const userInventory = await gameService.getInventory();
      setInventory(userInventory);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    inventory,
    loading,
    error,
    refreshInventory: async () => {
      const userInventory = await gameService.getInventory();
      setInventory(userInventory);
    }
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};