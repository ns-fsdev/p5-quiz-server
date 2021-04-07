/*
  Quiz SERVER
  Models.js
  define Model info :  tables and fields

  see db.js for database definition
*/

const {Sequelize, DataTypes, Model} = require('sequelize');
const {sequelize} = require('../lib/db');


// Category table
class Category extends Model {}
Category.init({
    name: {
        type: DataTypes.STRING,
        // allowNull: false
    },
},

{
    sequelize,              // We need to pass the connection instance
    modelName: 'Category', // We need to choose the model name
});


// Question table
class Question extends Model {}
Question.init({
    questionTxt: {
        type: 'LONGTEXT'
        // allowNull: false
    },
},

{
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Question', // We need to choose the model name
});

Category.hasMany(Question, {foreignKey: 'categoryId'});
Question.belongsTo(Category, {foreignKey: 'categoryId'});


// Answer table
class Answer extends Model {}
Answer.init({
    answerTxt: {
        type: 'LONGTEXT'
        // allowNull: false
    },
    // correctAnswer: {
    //     type: 'LONGTEXT'
    //     // allowNull: false
    // },
},

{
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Answer', // We need to choose the model name
});

Question.hasMany(Answer, {foreignKey: 'questionId'});
Answer.belongsTo(Question, {foreignKey: 'questionId'});


// User table  -  used for Authentication
class User extends Model {}
User.init({
    email: {
        type: 'LONGTEXT'
        // allowNull: false
    },
    password: {
        type: 'LONGTEXT'
        // allowNull: false
    },

    // correctAnswer: {
    //     type: 'LONGTEXT'
    //     // allowNull: false
    // },
},
{
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
});



User.hasMany(Question, {foreignKey: 'userId'});
Question.belongsTo(User, {foreignKey: 'userId'});



sequelize.sync({alter: true});

// NOTE: Code below will drop and recreate the DB again. Please use only in localhost. I have added a condition that checks for localhost before it runs
// if(process.env.BASE_URL.match('localhost')){
//     sequelize.sync({force: true});
// }

module.exports = {
    Category, Question, Answer, User
};
