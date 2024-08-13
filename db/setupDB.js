const pool = require('./db');

const createTableQuery = `
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
`;

pool.query(createTableQuery)
  .then(() => {
    console.log("Table created successfully.");
    pool.end();
  })
  .catch(err => {
    console.error("Error creating table:", err);
    pool.end();
  });
