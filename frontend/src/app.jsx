// frontend/src/App.jsx
import React from 'react';
import { GameProvider } from './context/gameContext';
import World from './components/World';
import Inventory from './components/Inventory';
import { TelegramWebApp } from '@twa-dev/sdk';

const App = () => {
  React.useEffect(() => {
    TelegramWebApp.ready();
    // Set app header color
    TelegramWebApp.setHeaderColor('#1a1a1a');
    // Enable closing confirmation
    TelegramWebApp.enableClosingConfirmation();
  }, []);

  return (
    <GameProvider>
      <div className="app-container">
        <World />
        <Inventory />
      </div>
    </GameProvider>
  );
};

export default App;