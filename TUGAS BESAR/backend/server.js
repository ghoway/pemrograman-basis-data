require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Routes
const departmentRoutes = require('./routes/departments');
const employeeRoutes = require('./routes/employees');
const vendorRoutes = require('./routes/vendors');
const categoryRoutes = require('./routes/categories');
const assetRoutes = require('./routes/assets');
const transactionRoutes = require('./routes/transactions');
const analyticsRoutes = require('./routes/analytics');
app.use('/api/departments', departmentRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/analytics', analyticsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});