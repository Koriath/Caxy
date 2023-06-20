var express = require('express');
var router = express.Router();
var login = require('../loginDB.js');
var dbConn = require('../dbConn.js');


var session_level = 0;

/* GET users listing. */
router.post('/user', async function(req, res) {
  console.log("Received: " + req.body.pasword);
  try {
      session_level = await login.loginDB(dbConn,"user",req.body.password);
        res.send({session_level: session_level});
    } catch (error) {
      console.log('Error during Login: '+error);
    }
});

router.post('/manager', function(req, res) {
  res.send('respond with a resource');
});

router.post('/administrator', function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;
