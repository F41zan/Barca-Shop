import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_API_URL ;
  
// Add this check during development
if (!import.meta.env.VITE_API_URL) {
  console.warn('⚠️ VITE_API_URL is not defined. Using fallback URL.');
}
