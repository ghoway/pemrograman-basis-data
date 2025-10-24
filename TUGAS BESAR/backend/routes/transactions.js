const express = require('express');
const router = express.Router();
const {
  borrowAsset,
  returnAsset,
  getAllLoans
} = require('../controllers/transactions');

router.get('/loans', getAllLoans);
router.post('/borrow', borrowAsset);
router.post('/return', returnAsset);

module.exports = router;