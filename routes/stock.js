var express = require('express');
var router = express.Router();

var StockClass = require('../class/stock.js');
var productclass = require('../class/product.js');
var categoriesclass = require('../class/categories.js');

var dbConn = require('../dbConn.js');

var stock = new StockClass;

/* GET home page. */
router.get('/', async function(req, res, next) {

  var products = await stock.getStock(dbConn);
  var categories= await stock.getCategories(dbConn);
  console.log("Fetching product list.");

  try {res.send({products: products, categories: categories});}
  catch (error) {console.log('Error fetching stock: '+error);}
});

module.exports = router;
