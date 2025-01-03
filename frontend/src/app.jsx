<<<<<<< HEAD:frontend/src/app.jsx
// frontend/src/App.jsx
import React from 'react';
import { GameProvider } from './context/gameContext';
import World from './components/World';
import Inventory from './components/Inventory';
import WebApp from '@twa-dev/sdk';

const App = () => {
  React.useEffect(() => {
    WebApp.ready();
    // Set app header color
    WebApp.setHeaderColor('#1a1a1a');
    // Enable closing confirmation
    WebApp.enableClosingConfirmation();
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

=======
// frontend/src/App.jsx
import React from 'react';
import { GameProvider } from './context/gameContext';
import World from './components/World';
import Inventory from './components/Inventory';
import WebApp from '@twa-dev/sdk';

const App = () => {
  React.useEffect(() => {
    WebApp.ready();
    // Set app header color
    WebApp.setHeaderColor('#1a1a1a');
    // Enable closing confirmation
    WebApp.enableClosingConfirmation();
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

>>>>>>> c5ddd412e7966043910823035b0bfaf2b578edcf:frontend/src/App.jsx
export default App;