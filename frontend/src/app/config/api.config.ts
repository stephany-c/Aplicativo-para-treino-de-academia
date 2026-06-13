const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export const API_CONFIG = {
  baseUrl: isLocalhost 
    ? 'http://localhost:8080' 
    : 'https://aplicativo-para-treino-de-academia.onrender.com' 
};
