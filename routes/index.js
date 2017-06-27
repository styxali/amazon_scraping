var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Amazon Web Scraping' });
});


// POST form data
router.post('/', function(req, res, next){
  res.render('index', { title: 'Amazon Web Scraping' });
});

module.exports = router;
