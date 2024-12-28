<<<<<<< HEAD
// frontend/src/components/Inventory.jsx
import React, { useState, useEffect } from 'react';
import { gameService } from '../services/gameService';

const Inventory = () => {
  const [items, setItems] = useState([]);

  // Load inventory items when component mounts
  useEffect(() => {
    const loadInventory = async () => {
      try {
        const userInventory = await gameService.getInventory();
        setItems(userInventory || []); // Use empty array as fallback
      } catch (error) {
        console.error('Failed to load inventory:', error);
        // Could add error state handling here if needed
      }
    };

    loadInventory();
  }, []);

  return (
    <div className="inventory">
      <h2>Inventory</h2>
      <div className="items-grid">
        {items.length === 0 ? (
          <p>Your inventory is empty</p>
        ) : (
          items.map(item => (
            <div key={item.id} className={`item-card rarity-${item.rarity}`}>
              <h3>{item.name}</h3>
              <p>Rarity: {item.rarity}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

=======
// frontend/src/components/Inventory.jsx
import React, { useState, useEffect } from 'react';
import { gameService } from '../services/gameService';

const Inventory = () => {
  const [items, setItems] = useState([]);

  // Load inventory items when component mounts
  useEffect(() => {
    const loadInventory = async () => {
      try {
        const userInventory = await gameService.getInventory();
        setItems(userInventory || []); // Use empty array as fallback
      } catch (error) {
        console.error('Failed to load inventory:', error);
        // Could add error state handling here if needed
      }
    };

    loadInventory();
  }, []);

  return (
    <div className="inventory">
      <h2>Inventory</h2>
      <div className="items-grid">
        {items.length === 0 ? (
          <p>Your inventory is empty</p>
        ) : (
          items.map(item => (
            <div key={item.id} className={`item-card rarity-${item.rarity}`}>
              <h3>{item.name}</h3>
              <p>Rarity: {item.rarity}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

>>>>>>> c5ddd412e7966043910823035b0bfaf2b578edcf
export default Inventory;