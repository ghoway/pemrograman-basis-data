const db = require('../config/db');

// Most borrowers
const getMostBorrowers = (req, res) => {
  const query = `
    SELECT e.name, COUNT(l.id) as borrow_count
    FROM loans l
    JOIN employees e ON l.employee_id = e.id
    GROUP BY l.employee_id, e.name
    ORDER BY borrow_count DESC
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Most borrowed categories
const getMostBorrowedCategories = (req, res) => {
  const query = `
    SELECT c.name as category, COUNT(l.id) as borrow_count
    FROM loans l
    JOIN assets a ON l.asset_id = a.id
    JOIN categories c ON a.category_id = c.id
    GROUP BY c.name
    ORDER BY borrow_count DESC
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Asset status summary
const getAssetStatusSummary = (req, res) => {
  const query = `
    SELECT status, COUNT(*) as count
    FROM assets
    GROUP BY status
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

module.exports = {
  getMostBorrowers,
  getMostBorrowedCategories,
  getAssetStatusSummary
};