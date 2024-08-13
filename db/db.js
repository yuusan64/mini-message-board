const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL ||'postgresql://postgres:ASJrPmZKcCzeNHHXlSrqfdqVWEcJbtIH@postgres.railway.internal:5432/railway';

const pool = new Pool({
 connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
