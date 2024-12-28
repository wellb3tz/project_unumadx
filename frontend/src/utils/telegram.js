// frontend/src/utils/telegram.js
import { TelegramWebApp } from '@twa-dev/sdk';

export const initTelegramApp = () => {
  TelegramWebApp.ready();
  
  // Configure main button
  TelegramWebApp.MainButton.setText('Explore');
  TelegramWebApp.MainButton.show();
  
  // Set theme
  document.documentElement.className = TelegramWebApp.colorScheme;
};