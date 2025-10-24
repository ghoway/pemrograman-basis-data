const express = require('express');
const router = express.Router();
const {
  getMostBorrowers,
  getMostBorrowedCategories,
  getAssetStatusSummary
} = require('../controllers/analytics');

router.get('/most-borrowers', getMostBorrowers);
router.get('/most-borrowed-categories', getMostBorrowedCategories);
router.get('/asset-status-summary', getAssetStatusSummary);

module.exports = router;