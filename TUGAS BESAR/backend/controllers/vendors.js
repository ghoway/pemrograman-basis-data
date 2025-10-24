const db = require('../config/db');

// Get all vendors
const getAllVendors = (req, res) => {
  db.query('SELECT * FROM vendors', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Get vendor by ID
const getVendorById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM vendors WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Vendor not found' });
    res.json(results[0]);
  });
};

// Create new vendor
const createVendor = (req, res) => {
  const { name, contact_info, address } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });
  db.query('INSERT INTO vendors (name, contact_info, address) VALUES (?, ?, ?)', [name, contact_info, address], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, name, contact_info, address });
  });
};

// Update vendor
const updateVendor = (req, res) => {
  const { id } = req.params;
  const { name, contact_info, address } = req.body;
  db.query('UPDATE vendors SET name = ?, contact_info = ?, address = ? WHERE id = ?', [name, contact_info, address, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Vendor not found' });
    res.json({ message: 'Vendor updated' });
  });
};

// Delete vendor
const deleteVendor = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM vendors WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Vendor not found' });
    res.json({ message: 'Vendor deleted' });
  });
};

module.exports = {
  getAllVendors,
  getVendorById,
  createVendor,
  updateVendor,
  deleteVendor
};