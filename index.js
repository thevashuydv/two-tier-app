const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

const dbConfig = {
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'appuser',
  password: process.env.DB_PASSWORD || 'apppassword',
  database: process.env.DB_NAME || 'appdb'
};

app.get('/', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.execute('SELECT NOW() AS now');
    await conn.end();
    res.send(`App is working. DB time: ${rows[0].now}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('DB error');
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

