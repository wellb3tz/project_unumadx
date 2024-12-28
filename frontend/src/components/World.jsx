// frontend/src/components/World.jsx
import React, { useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';

const World = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeWorld = async () => {
      try {
        // Initialize Telegram WebApp
        WebApp.ready();
        
        const user = WebApp.initDataUnsafe.user;
        console.log('Current user:', user); // For debugging

        // Initialize world
        await generateWorld();
        
        // Load user's inventory
        const response = await fetch('/api/inventory', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'User-ID': user.id
          }
        });
        
        if (response.ok) {
          const items = await response.json();
          setInventory(items);
        }
      } catch (error) {
        console.error('Error initializing world:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeWorld();
  }, []);

  const generateWorld = async () => {
    try {
      const response = await fetch('/api/world/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: WebApp.initDataUnsafe.user.id
        })
      });
      const world = await response.json();
      setCurrentLocation(world);
    } catch (error) {
      console.error('Error generating world:', error);
    }
  };

  if (loading) {
    return <div>Loading world...</div>;
  }

  return (
    <div className="world-container">
      <div className="location-info">
        <h2>{currentLocation?.name || 'Unknown Location'}</h2>
        <p>{currentLocation?.description || 'Discovering new realms...'}</p>
      </div>
      <div className="inventory">
        {inventory.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

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

export default World;