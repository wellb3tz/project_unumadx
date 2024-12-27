// src/components/World.jsx
import React, { useState, useEffect } from 'react';
import { TelegramWebApp } from '@twa-dev/sdk';

const World = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    // Initialize Telegram WebApp
    TelegramWebApp.ready();
    
    // Get user data
    const user = TelegramWebApp.initDataUnsafe.user;
    
    // Initialize world
    generateWorld();
  }, []);

  const generateWorld = async () => {
    try {
      const response = await fetch('/api/world/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: TelegramWebApp.initDataUnsafe.user.id
        })
      });
      const world = await response.json();
      setCurrentLocation(world);
    } catch (error) {
      console.error('Error generating world:', error);
    }
  };

  return (
    <div className="world-container">
      <div className="location-info">
        <h2>{currentLocation?.name}</h2>
        <p>{currentLocation?.description}</p>
      </div>
      <div className="inventory">
        {inventory.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

// src/components/ItemCard.jsx
const ItemCard = ({ item }) => {
  return (
    <div className={`item-card rarity-${item.rarity}`}>
      <h3>{item.name}</h3>
      <p>Rarity: {item.rarity}</p>
      <div className="attributes">
        {Object.entries(item.attributes).map(([key, value]) => (
          <div key={key} className="attribute">
            <span>{key}:</span> {value}
          </div>
        ))}
      </div>
    </div>
  );
};