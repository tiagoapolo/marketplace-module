require('dotenv').config();
const meli = require('mercadolibre');
const meliObject = new meli.Meli(process.env.NODE_ML_CLIENT_ID, process.env.NODE_ML_CLIENT_SECRET);
export default meliObject;
