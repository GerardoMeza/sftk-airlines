// scripts/seedFlightsViaApi.js
const axios = require('axios');
const fs = require('fs');

const API_URL = process.env.SEED_API_URL || 'https://<TU_DOMINIO>/api/admin/seed-flights';
const TOKEN = process.env.SEED_API_TOKEN || '<PEGA_AQUI_EL_TOKEN_GENERADO>';
const FLIGHTS_FILE = process.argv[2] || 'flights_seed_data.json';

async function main() {
  const data = JSON.parse(fs.readFileSync(FLIGHTS_FILE, 'utf-8'));
  const res = await axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
  console.log(res.data);
}

main().catch((err) => {
  console.error(err.response?.data || err.message);
  process.exit(1);
});
