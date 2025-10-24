require('dotenv').config();
const mysql = require('mysql2');

const tempConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT || 3306
});

tempConnection.connect((err) => {
  if (err) {
    console.error('Temp database connection failed:', err);
    return;
  }
  console.log('Temp connected to MySQL');

  tempConnection.query('DROP DATABASE IF EXISTS manajemen_aset_sekolah', (err) => {
    if (err) {
      console.error('Error dropping database:', err);
    } else {
      console.log('Database dropped');
    }
    tempConnection.end();
  });
});