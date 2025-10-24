require('dotenv').config();
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

// Connect without database to create it
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

  tempConnection.query('CREATE DATABASE IF NOT EXISTS manajemen_aset_sekolah', (err) => {
    if (err) {
      console.error('Error creating database:', err);
      tempConnection.end();
      return;
    }
    console.log('Database created or already exists');

    // Now connect to the database
    const db = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306
    });

    db.connect((err) => {
      if (err) {
        console.error('Database connection failed:', err);
        tempConnection.end();
        return;
      }
      console.log('Connected to database');

      const schemaPath = path.join(__dirname, 'database', 'schema.sql');
      const schema = fs.readFileSync(schemaPath, 'utf8');

      // Remove the CREATE DATABASE and USE lines
      const lines = schema.split('\n');
      const filteredLines = lines.filter(line => !line.includes('CREATE DATABASE') && !line.includes('USE '));
      const filteredSchema = filteredLines.join('\n');

      const queries = filteredSchema.split(';').filter(q => q.trim());

      let completed = 0;
      queries.forEach((query, index) => {
        if (query.trim()) {
          db.query(query, (err) => {
            if (err) {
              console.error(`Error executing query ${index + 1}:`, err);
            } else {
              console.log(`Query ${index + 1} executed successfully`);
            }
            completed++;
            if (completed === queries.length) {
              db.end();
              tempConnection.end();
            }
          });
        } else {
          completed++;
        }
      });
    });
  });
});