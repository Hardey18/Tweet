// import dotenv from 'dotenv';
import axios from 'axios';

// dotenv.config();

const API = axios.create({
  baseURL: "https://fast-oasis-18308.herokuapp.com/api/v1",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
// console.log(process.env.REACT_APP_ENDPOINT_BASE_URL);
API.interceptors.request.use(config => {
  const token: string | null = localStorage.getItem('token');
  if (!config?.headers) {
    throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
  }
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});
export default API