require('dotenv').config();
const db = require('./config/db');

// Sample departments
const departments = [
  { name: 'IT' },
  { name: 'HR' },
  { name: 'Finance' }
];

// Sample employees
const employees = [
  { name: 'John Doe', email: 'john@example.com', department_id: 1 },
  { name: 'Jane Smith', email: 'jane@example.com', department_id: 2 },
  { name: 'Bob Johnson', email: 'bob@example.com', department_id: 3 }
];

// Sample vendors
const vendors = [
  { name: 'Tech Supplies Inc', contact_info: '123-456-7890', address: '123 Tech St' },
  { name: 'Office Gear Ltd', contact_info: '098-765-4321', address: '456 Office Ave' }
];

// Sample categories
const categories = [
  { name: 'Electronics' },
  { name: 'Furniture' }
];

// Sample assets
const assets = [
  { serial_number: 'SN001', name: 'Laptop Dell', category_id: 1, vendor_id: 1, received_date: '2023-01-01' },
  { serial_number: 'SN002', name: 'Projector Epson', category_id: 1, vendor_id: 1, received_date: '2023-01-02' },
  { serial_number: 'SN003', name: 'Whiteboard', category_id: 2, vendor_id: 2, received_date: '2023-01-03' }
];

// Clear existing data
db.query('SET FOREIGN_KEY_CHECKS = 0', () => {
  db.query('DELETE FROM loans', () => {
    db.query('DELETE FROM assets', () => {
      db.query('DELETE FROM employees', () => {
        db.query('DELETE FROM vendors', () => {
          db.query('DELETE FROM categories', () => {
            db.query('DELETE FROM departments', () => {
              db.query('SET FOREIGN_KEY_CHECKS = 1', () => {
                insertData();
              });
            });
          });
        });
      });
    });
  });
});

function insertData() {
  db.query('SET FOREIGN_KEY_CHECKS = 0', () => {
    // Insert departments
    let deptIndex = 0;
    function insertDept() {
      if (deptIndex < departments.length) {
        db.query('INSERT INTO departments (name) VALUES (?)', [departments[deptIndex].name], (err) => {
          if (err) console.error('Error inserting department:', err);
          else console.log('Inserted department:', departments[deptIndex].name);
          deptIndex++;
          insertDept();
        });
      } else {
        insertVendors();
      }
    }

  // Insert vendors
  let vendIndex = 0;
  function insertVendors() {
    if (vendIndex < vendors.length) {
      const vend = vendors[vendIndex];
      db.query('INSERT INTO vendors (name, contact_info, address) VALUES (?, ?, ?)', [vend.name, vend.contact_info, vend.address], (err) => {
        if (err) console.error('Error inserting vendor:', err);
        else console.log('Inserted vendor:', vend.name);
        vendIndex++;
        insertVendors();
      });
    } else {
      insertCategories();
    }
  }

  // Insert categories
  let catIndex = 0;
  function insertCategories() {
    if (catIndex < categories.length) {
      const cat = categories[catIndex];
      db.query('INSERT INTO categories (name) VALUES (?)', [cat.name], (err) => {
        if (err) console.error('Error inserting category:', err);
        else console.log('Inserted category:', cat.name);
        catIndex++;
        insertCategories();
      });
    } else {
      insertEmployees();
    }
  }

  // Insert employees
  let empIndex = 0;
  function insertEmployees() {
    if (empIndex < employees.length) {
      const emp = employees[empIndex];
      db.query('INSERT INTO employees (name, email, department_id) VALUES (?, ?, ?)', [emp.name, emp.email, emp.department_id], (err) => {
        if (err) console.error('Error inserting employee:', err);
        else console.log('Inserted employee:', emp.name);
        empIndex++;
        insertEmployees();
      });
    } else {
      insertAssets();
    }
  }

  // Insert assets
  let assetIndex = 0;
  function insertAssets() {
    if (assetIndex < assets.length) {
      const asset = assets[assetIndex];
      db.query('INSERT INTO assets (serial_number, name, category_id, vendor_id, received_date, status) VALUES (?, ?, ?, ?, ?, ?)', [asset.serial_number, asset.name, asset.category_id, asset.vendor_id, asset.received_date, 'available'], (err) => {
        if (err) console.error('Error inserting asset:', err);
        else console.log('Inserted asset:', asset.name);
        assetIndex++;
        insertAssets();
      });
    } else {
      db.query('SET FOREIGN_KEY_CHECKS = 1', () => {
        db.end();
      });
    }
  }

  insertDept();
  });
}