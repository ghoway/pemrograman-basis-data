const db = require('../config/db');

// Get all departments
const getAllDepartments = (req, res) => {
  db.query('SELECT * FROM departments', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Get department by ID
const getDepartmentById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM departments WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Department not found' });
    res.json(results[0]);
  });
};

// Create new department
const createDepartment = (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });
  db.query('INSERT INTO departments (name) VALUES (?)', [name], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, name });
  });
};

// Update department
const updateDepartment = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  db.query('UPDATE departments SET name = ? WHERE id = ?', [name, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Department not found' });
    res.json({ message: 'Department updated' });
  });
};

// Delete department
const deleteDepartment = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM departments WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Department not found' });
    res.json({ message: 'Department deleted' });
  });
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment
};