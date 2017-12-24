const express = require('express');
const router = express.Router();

router.use('/todos', require('./todos'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;