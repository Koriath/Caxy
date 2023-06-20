var mysqlx = require('@mysql/xdevapi');

var mysqlSession = mysqlx.getSession({
    user: 'bartender',
    password: 'woozy',
    host: 'localhost',
    port: '33060'
  });

module.exports = mysqlSession;
