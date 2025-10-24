const db = require('../config/db');

// Get all employees
const getAllEmployees = (req, res) => {
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Get employee by ID
const getEmployeeById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM employees WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Employee not found' });
    res.json(results[0]);
  });
};

// Create new employee
const createEmployee = (req, res) => {
  const { name, email, department_id } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });
  db.query('INSERT INTO employees (name, email, department_id) VALUES (?, ?, ?)', [name, email, department_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, name, email, department_id });
  });
};

// Update employee
const updateEmployee = (req, res) => {
  const { id } = req.params;
  const { name, email, department_id } = req.body;
  db.query('UPDATE employees SET name = ?, email = ?, department_id = ? WHERE id = ?', [name, email, department_id, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee updated' });
  });
};

// Delete employee
const deleteEmployee = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM employees WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted' });
  });
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};