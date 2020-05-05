

import axios from 'axios';

const API_URL = 'https://a9652eb0.ngrok.io';

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

export default api;
