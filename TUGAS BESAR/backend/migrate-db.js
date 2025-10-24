require('dotenv').config();
const db = require('./config/db');

db.query('ALTER TABLE employees ADD COLUMN department_id INT AFTER email', (err) => {
  if (err) console.error('Error adding department_id:', err);
  else console.log('Added department_id column');

  db.query('ALTER TABLE employees ADD FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL', (err) => {
    if (err) console.error('Error adding FK:', err);
    else console.log('Added FK to departments');

    db.query('ALTER TABLE employees DROP COLUMN department', (err) => {
      if (err) console.error('Error dropping department:', err);
      else console.log('Dropped department column');
      db.end();
    });
  });
});