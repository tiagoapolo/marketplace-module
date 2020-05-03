require('dotenv').config();
// import axios from 'axios';

// const API_URL = process.env.REACT_APP_API;
// const api = axios.create({
//   baseURL: API_URL
// });

// api.interceptors.request.use(
//   config => {
//       // Don't IE request cache

//       config.headers['Pragma'] = 'no-cache';
//       config.headers['Access-Control-Allow-Origin'] = '*';

//       return config;
//   },
//   error => Promise.reject(error),
// );

const meli = require('mercadolibre');
console.log('process.env.NODE_ML_CLIENT_ID', process.env.NODE_ML_CLIENT_ID)
const meliObject = new meli.Meli(process.env.NODE_ML_CLIENT_ID, process.env.NODE_ML_CLIENT_SECRET);


module.exports = { meliObject }
