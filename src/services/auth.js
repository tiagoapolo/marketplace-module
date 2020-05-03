import axios from 'axios';

const API_URL = process.env.REACT_APP_API;
const api = axios.create({
  baseURL: API_URL
});

api.interceptors.request.use(
  config => {
      // Don't IE request cache

      config.headers['Pragma'] = 'no-cache';
      config.headers['Access-Control-Allow-Origin'] = '*';

      return config;
  },
  error => Promise.reject(error),
);

export function getAuthUrl() {
  return api.get(`/auth/url`)          
};
