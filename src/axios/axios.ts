import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api/v1/',
  withCredentials: true,  // Esto asegura que las cookies se envíen en cada solicitud
});

export default api;
