/*
  Quiz SERVER
  Db.js    -  database engine

  see Models.js  for table definitions
*/


const {Sequelize} = require('sequelize');
//  process.env.CLEARDB_DATABASE_URL  - heroku var for clearDB URL
//  const sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL, {logging: false});
/* const sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL, {logging: false});   - my code heroku */
const sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL || 'mysql://root:mysql@localhost/quiz_db', {logging: false});

module.exports = {sequelize};
