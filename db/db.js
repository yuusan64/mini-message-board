const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL ||'postgresql://postgres:cYqERrsmZjTJvtFYYRnzYNBYMAsrwcgj@monorail.proxy.rlwy.net:14106/railway';

const pool = new Pool({
 connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
