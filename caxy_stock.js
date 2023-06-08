var mysqlx = require('@mysql/xdevapi');
var productclass = require('./caxy_productclass.js');
var categoriesclass = require('./caxy_categoriesclass.js');

var currentStock = [];
var currentCategories = [];

// Get Categories
var getCategories = function (dbConn) {

  return new Promise(function (resolve, reject) {

    var products;
    var results;

    dbConn.then(session => {
      products = session.getSchema('stock').getTable('categories');
      return products.select(['idcategories', 'name'])
          .execute();
    })
    .then((results) =>{
      currentCategories = [];
      while (doc = results.fetchOne()) {
        currentCategories.push(new categoriesclass(doc[0],doc[1]));
      }
      resolve(currentCategories);
    })

  });

};

// Get All stock
var getStock = function (dbConn) {

  return new Promise(function (resolve, reject) {

    var products;
    var results;

    dbConn.then(session => {
      products = session.getSchema('stock').getTable('products');
      return products.select(['idproducts', 'name', 'category', 'amount', 'maxAmount', 'lowAlarm', 'price', 'icon'])
          .execute();
    })
    .then((results) =>{
      currentStock = [];
      while (doc = results.fetchOne()) {
        currentStock.push(new productclass(doc[0],doc[1],doc[2],doc[3],doc[4],doc[5],doc[6],doc[7]));
      }
      resolve(currentStock);
    })

  });

};

// Remove Stock
var removeStock = function (dbConn) {

}

// Add Stock
var addStock = function (dbConn) {

}

exports.getCategories = getCategories;
exports.getStock = getStock;
exports.removeStock = removeStock;
exports.addStock = addStock;
