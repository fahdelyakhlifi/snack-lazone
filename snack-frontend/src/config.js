// Configuration de l'application
export const config = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Snack La Zone',
};

console.log('📋 Configuration chargée:', config);