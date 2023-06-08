var mysqlx = require('@mysql/xdevapi');


var loginDB = function (dbConn,user,pass) {

  return new Promise(function (resolve, reject) {

  var users;
  var login_level = 0;
  dbConn.then(session => {
    users = session.getSchema('stock').getTable('users');
    return users.select(['username', 'password', 'level'])
        .where('username == :user and password = :pass')
        .bind('user', user)
        .bind('pass', pass)
        .execute();
  })
  .then((results) =>{
    user = results.fetchOne();
    if (user) {
      console.log('User found: ' + user);
      login_level = user[2];
    } else {
      console.log('User not found!');
      login_level = 0;
    }
    resolve(login_level);
  })

  });
};


exports.loginDB = loginDB;
