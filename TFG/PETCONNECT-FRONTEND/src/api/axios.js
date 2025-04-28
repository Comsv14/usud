import axios from 'axios';

export default axios.create({
  baseURL: 'http://tu-dominio.com/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});
