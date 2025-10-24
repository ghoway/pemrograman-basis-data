const db = require('../config/db');

// Get all assets
const getAllAssets = (req, res) => {
  db.query('SELECT * FROM assets', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Get asset by ID
const getAssetById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM assets WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Asset not found' });
    res.json(results[0]);
  });
};

// Create new asset
const createAsset = (req, res) => {
  const { serial_number, name, category_id, vendor_id, received_date } = req.body;
  if (!serial_number || !name) return res.status(400).json({ message: 'Serial number and name are required' });
  db.query('INSERT INTO assets (serial_number, name, category_id, vendor_id, received_date, status) VALUES (?, ?, ?, ?, ?, ?)', [serial_number, name, category_id, vendor_id, received_date, 'available'], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, serial_number, name, category_id, vendor_id, received_date, status: 'available' });
  });
};

// Update asset
const updateAsset = (req, res) => {
  const { id } = req.params;
  const { serial_number, name, category_id, vendor_id, received_date, status } = req.body;
  db.query('UPDATE assets SET serial_number = ?, name = ?, category_id = ?, vendor_id = ?, received_date = ?, status = ? WHERE id = ?', [serial_number, name, category_id, vendor_id, received_date, status, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Asset not found' });
    res.json({ message: 'Asset updated' });
  });
};

// Delete asset
const deleteAsset = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM assets WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Asset not found' });
    res.json({ message: 'Asset deleted' });
  });
};



module.exports = {
  getAllAssets,
  getAssetById,
  createAsset,
  updateAsset,
  deleteAsset
};