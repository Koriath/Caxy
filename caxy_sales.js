var productclass = require('./caxy_productclass.js');
var categoriesclass = require('./caxy_categoriesclass.js');

module.exports = class Sale {

  constructor(){
    this.sList = [];
    console.log("New Sales Data!");
  }

  async markProduct(productID,stock){
    // Find product in stock
    var newProduct = true;
    var l = this.sList;
    stock.forEach(function(p){
      if(p.id == productID){
        console.log("Selling: "+p.name+" for "+p.price+"€.");
        // Add to existing product in sales if it exists
        l.forEach(function(s){
          if(s.id == p.id){s.amount++; newProduct = false;}
        })
        // Product does not exist in sale, add a new one.
        if(newProduct){l.push(new productclass(p.id,p.name,p.category,1,0,0,p.price,''));}
      }
    })
    this.sList = l;
  }

  async executeSale(){
    this.sList = [];
    console.log("Sold!");
  }
};
