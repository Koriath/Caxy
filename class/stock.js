var mysqlx = require('@mysql/xdevapi');
var productclass = require('./product.js');
var categoriesclass = require('./categories.js');

module.exports = class Stock {

  constructor(){
    this.currentStock = [];
    this.currentCategories = [];
 }

 // Get Categories
 getCategories (dbConn) {
     return new Promise(function (resolve, reject) {

       var products;
       var results;
       var newCategories = [];
       var doc;

       dbConn.then(session => {
         products = session.getSchema('stock').getTable('categories');
         return products.select(['idcategories', 'name'])
             .execute();
       })
       .then((results) =>{
         while (doc = results.fetchOne()) {
           newCategories.push(new categoriesclass(doc[0],doc[1]));
         }
         resolve(newCategories);
       })

     });
     currentCategories = newCategories;
   }

   // Get All stock
   getStock (dbConn) {

     return new Promise(function (resolve, reject) {
       var products;
       var results;
       var newStock = [];
       var doc;
       dbConn.then(session => {
         products = session.getSchema('stock').getTable('products');
         return products.select(['idproducts', 'name', 'category', 'amount', 'maxAmount', 'lowAlarm', 'price', 'icon']).execute();})
       .then((results) =>{
         while (doc = results.fetchOne()) {newStock.push(new productclass(doc[0],doc[1],doc[2],doc[3],doc[4],doc[5],doc[6],doc[7]));}
         resolve(newStock);
       })
     });
     currentStock = newStock;
   }

   // Remove Stock
   removeStock(saleList,total,dbConn) {
     console.log("Removing stock: ",saleList);
     console.log("Test : ",saleList.length);
     var products;
     var sales;
     dbConn.then(session => {
       products = session.getSchema('stock').getTable('products');
       for(let i = 0; i<saleList.length;i++){
         console.log("Selling ",saleList[i].amount,"x",saleList[i].name);
         products.update()
         .set('amount',  mysqlx.expr("GREATEST(0,amount - "+saleList[i].amount+")"))
         .where('name like :salename')
         .bind('salename',saleList[i].name)
         .execute();
       }
       sales = session.getSchema('stock').getTable('sales');
       sales.insert('idsale','solditems', 'total')
      .values(null, JSON.stringify(saleList), total)
      .execute();
     });


   }

   // Add Stock
   addStock(dbConn) {

   }

};
