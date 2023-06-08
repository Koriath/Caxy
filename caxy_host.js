const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysqlx = require('@mysql/xdevapi');
const json = require('json');

var dbConn = require('./caxy_dbConnection.js');
var login = require('./caxy_login.js');
var stock = require('./caxy_stock.js');
var productclass = require('./caxy_productclass.js');
var categoriesclass = require('./caxy_categoriesclass.js');
var saleClass = require('./caxy_sales.js');

const viewsDirPath = [__dirname, "./views", "./views/templates"];

var serverPort = 3001;
var session_level = 0;
var products;
var categories;
var sales = new saleClass();
var sucess;

  // Create an instance of the Express.js server
  const app = express();

  app.set("views", viewsDirPath);
  app.set("view engine", "ejs");
  app.use(express.static(path.join(__dirname, "public")));
  // Use body-parser middleware to parse URL-encoded bodies
  app.use(bodyParser.urlencoded({ extended: true }));

// ------------------------Functions----------------------------

async function refreshStock(){
  products = await stock.getStock(dbConn);
  categories= await stock.getCategories(dbConn);
}

async function renderPage(page,res){
  res.render(page, {
    stock: products,
    categories: categories,
    session_level: session_level,
    sales: sales.sList
  });
}

// ------------------------GET----------------------------

  // Serve the login page
  app.get('/', async (req, res) => {
    await renderPage("landing",res);
  });


  // Serve the Stock content
  app.get("/stock", async (req, res) => {
    await renderPage("stock",res);
  });

  // Serve the Stock content
  app.get("/sales", async (req, res) => {
    await renderPage("sales",res);
  });

// ------------------------POST----------------------------

  // Handle the Landing login form submission
  app.post('/loginlanding', async (req, res) => {
    try {
      session_level = await login.loginDB(dbConn,"user",req.body.password);
        if (session_level >0) {
          await refreshStock();
          res.redirect('/sales');}
          //await renderPage("sales",res);}
          else {await renderPage("landing",res);}
    } catch (error) {
      console.log('Error during Login: '+error);
    }
  });

  // Handle the Manager login form submission
  app.post('/loginmanager', async (req, res) => {
    try {
      session_level = await login.loginDB(dbConn,"manager",req.body.password);
        if (session_level >1) {
          await refreshStock();
          await renderPage("management",res);}
          else {await renderPage("landing",res);}
    } catch (error) {
      console.log('Error during Login: '+error);
    }
  });

  // Handle the Admin login form submission
  app.post('/loginadmin', async (req, res) => {
    try {
      session_level = await login.loginDB(dbConn,"admin",req.body.password);
        if (session_level >2) {
          await refreshStock();
          await renderPage("administration",res);}
          else {await renderPage("landing",res);}
    } catch (error) {
      console.log('Error during Login: '+error);
    }
  });



// ------------------------PUT----------------------------

// Mark a product for sale
app.put('/markProduct', async (req, res) => {
    await sales.markProduct(req.body.productID,products);
    res.send(sales.sList);
});

// Make a sale
app.put('/executeSale', async (req, res) => {
  sales.executeSale();
  await renderPage( "sales",res);
});

// ------------------------Start the server----------------------------
  app.listen(serverPort, () => {
    console.log('Server is running on http://localhost:' + serverPort);
    refreshStock();
  });
