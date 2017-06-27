var express = require('express');
var router = express.Router();

var axios = require('axios');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Amazon Web Scraping' });
});


// POST form data
router.post('/', function(req, res, next){
  var asin = req.body.asin;
  var url = `http://www.amazon.com/dp/${asin}`

  axios.get(url).then( (response) => {
    var $ = cheerio.load(response.data, {ignoreWhiteSpace: true });
    var info = {
      title: $('#productTitle').text().trim()
    }
      // kurs.push( {
      //   currency: $(elm).children().first().text(),
      //   erate: {
      //     sell: $(elm).children().eq(1).first().text(),
      //     buy: $(elm).children().eq(2).first().text()
      //   },
      //   tt: {
      //     sell: $(elm).children().eq(3).first().text(),
      //     buy: $(elm).children().eq(4).first().text()
      //   },
      //   notes: {
      //     sell: $(elm).children().eq(5).first().text(),
      //     buy: $(elm).children().eq(6).first().text()
      //   }
      // });
    // });
    return(info);
  })
  .then ( (kurs) => {
    res.send(kurs);
  }).catch ( (error) => {
    res.send(error);
  })
});

module.exports = router;
