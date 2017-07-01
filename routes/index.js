var express = require('express');
var router = express.Router();
var redis = require('redis')
var redisClient = redis.createClient()

var axios = require('axios');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res, next) {
  redisClient.sort('ramon', 'by', '*->time', 'LIMIT', 0, 25, 'desc', 'get', '*->title', 'get',
    '*->reviews', 'get', '*->rating', 'get', '*->time', function (err, reply) {
      var newArray = []
      while (reply.length) newArray.push(reply.splice(0, 4));
      res.render('index', { productsInfo: newArray });
    }
  )
});

// POST form data
router.post('/', function(req, res, next){
  var asin = req.body.asin;
  console.warn('asin', typeof(asin))
  if (!asin) {
    res.redirect('/');
  }

  var url = `http://www.amazon.ca/dp/${asin}`

  axios.get(url).then( (response) => {
    var $ = cheerio.load(response.data, {ignoreWhiteSpace: true });
    var info = {
      title: $('#productTitle').text().trim(),
      reviews: $('#acrCustomerReviewText').first().text(),
      rating: $('i.a-icon.a-icon-star').children().first().text()
    }

    return(info);
  }).then ( (info) => {
    var ts = Math.round((new Date()).getTime() / 1000);
    var productInfo = ['title', info.title, 'reviews', info.reviews, 'rating', info.rating, 'time', ts]

    redisClient.zadd('allSearches', ts, asin)
    redisClient.zadd('ramon', ts, asin, function(err, reply) {
      redisClient.hmset(asin, productInfo)
    });

    res.redirect('/');
  }).catch ( (error) => {
    res.redirect('/');
  })
});

module.exports = router;
