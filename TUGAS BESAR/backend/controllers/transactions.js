const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

// Borrow asset
const borrowAsset = (req, res) => {
  const { asset_id, employee_id, expected_return_date } = req.body;
  if (!asset_id || !employee_id || !expected_return_date) return res.status(400).json({ message: 'Asset ID, employee ID, and expected return date are required' });

  // Check if asset is available
  db.query('SELECT status FROM assets WHERE id = ?', [asset_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Asset not found' });
    if (results[0].status !== 'available') return res.status(400).json({ message: 'Asset is not available for borrowing' });

    const loan_id = uuidv4();
    const borrow_date = new Date().toISOString().split('T')[0];

    db.query('INSERT INTO loans (id, asset_id, employee_id, borrow_date, expected_return_date) VALUES (?, ?, ?, ?, ?)', [loan_id, asset_id, employee_id, borrow_date, expected_return_date], (err) => {
      if (err) return res.status(500).json({ error: err.message });

      // Update asset status
      db.query('UPDATE assets SET status = ? WHERE id = ?', ['borrowed', asset_id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ loan_id, asset_id, employee_id, borrow_date, expected_return_date });
      });
    });
  });
};

// Return asset
const returnAsset = (req, res) => {
  const { loan_id, return_condition } = req.body;
  if (!loan_id || !return_condition) return res.status(400).json({ message: 'Loan ID and return condition are required' });
  if (!['good', 'damaged'].includes(return_condition)) return res.status(400).json({ message: 'Return condition must be good or damaged' });

  // Find loan
  db.query('SELECT asset_id FROM loans WHERE id = ? AND status = ?', [loan_id, 'active'], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Active loan not found' });

    const asset_id = results[0].asset_id;
    const actual_return_date = new Date().toISOString().split('T')[0];
    const asset_status = return_condition === 'damaged' ? 'damaged' : 'available';

    // Update loan
    db.query('UPDATE loans SET actual_return_date = ?, return_condition = ?, status = ? WHERE id = ?', [actual_return_date, return_condition, 'returned', loan_id], (err) => {
      if (err) return res.status(500).json({ error: err.message });

      // Update asset status
      db.query('UPDATE assets SET status = ? WHERE id = ?', [asset_status, asset_id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Asset returned successfully', loan_id, return_condition, asset_status });
      });
    });
  });
};

// Get all loans
const getAllLoans = (req, res) => {
  db.query('SELECT * FROM loans', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

module.exports = {
  borrowAsset,
  returnAsset,
  getAllLoans
};