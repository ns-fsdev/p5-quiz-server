/*
  Quiz SERVER
  Db.js    -  database engine

  see Models.js  for table definitions
*/


const {Sequelize} = require('sequelize');
//  process.env.CLEARDB_DATABASE_URL  - heroku var for clearDB URL
const sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL, {logging: false});

module.exports = {sequelize};
