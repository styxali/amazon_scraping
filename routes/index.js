var express = require('express');
var router = express.Router();
var redis = require('redis')
var redisClient = redis.createClient()

var axios = require('axios');
var cheerio = require('cheerio');
var randomHex = require('random-hexadecimal');

/* GET home page. */
router.get('/', function(req, res, next) {
  var id = req.cookies['canopy-aws']
  var newArray = []

  if (!!id) {
    redisClient.expire(id, 604800)
    redisClient.sort(id, 'by', '*->time', 'LIMIT', 0, 25, 'desc', 'get', '#',
      'get', '*->title', 'get','*->reviews', 'get', '*->rating', 'get', '*->time',
      'get', '*->availability', function (err, reply) {
        while (reply.length) newArray.push(reply.splice(0, 6));
        console.warn(newArray);
        res.render('index', { productsInfo: newArray });
      }
    )
  } else {
    res.render('index', { productsInfo: newArray });
  }
});

// POST form data
router.post('/', function(req, res, next){
  var id = req.cookies['canopy-aws']

  if (!id) {
    // create the hex and set the cookie
    id = randomHex()
    res.cookie('canopy-aws', id)
  }

  if (!req.body.asin && !req.body.hiddenAsin) {
    res.redirect('/');
  } else if (req.body.asin) {
    var asin = req.body.asin;
  } else {
    var asin = req.body.hiddenAsin;
  }

  var url = `http://www.amazon.ca/dp/${asin}`

  axios.get(url).then( (response) => {
    var $ = cheerio.load(response.data, {ignoreWhiteSpace: true });
    var info = {
      title: $('#productTitle').text().trim(),
      reviews: $('#acrCustomerReviewText').first().text(),
      rating: $('i.a-icon.a-icon-star').children().first().text(),
      availability: $('#availability').children('span').text().trim()
    }

    return(info);
  }).then ( (info) => {
    var ts = Math.round((new Date()).getTime() / 1000);
    var productInfo = [
      'title', info.title,
      'reviews', info.reviews,
      'rating', info.rating,
      'time', ts,
      'availability', info.availability
    ]
    console.warn(productInfo)

    redisClient.zadd('allSearches', ts, asin)
    redisClient.zadd(id, ts, asin, function(err, reply) {
      redisClient.hmset(asin, productInfo)
    });

    res.redirect('/');
  }).catch ( (error) => {
    console.warn(error)
    res.redirect('/');
  })
});

module.exports = router;
