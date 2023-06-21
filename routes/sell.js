var express = require('express');
var router = express.Router();

var StockClass = require('../class/stock.js');
var productclass = require('../class/product.js');

var dbConn = require('../dbConn.js');

var stock = new StockClass;

const cors = require('cors')
const app = express()

const corsOptions = {
  origin: 'http://localhost:3000',
}

const configuredCors = cors(corsOptions);

app.options('*', configuredCors)

/* GET home page. */
router.post('/',configuredCors, async function(req, res, next) {
  //res.setHeader('Content-Type', 'application/json')
  var products = await stock.getStock(dbConn);
  console.log("Selling: " , req.body.list," for ",req.body.total," €.");
  stock.removeStock(req.body.list,req.body.total,dbConn);
  // Add total saving here
  try {res.status(200).send("Sold!");}
  catch (error) {console.log('Error fetching stock: '+error);}

});

module.exports = router;
