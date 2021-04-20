/*
  Quiz SERVER
  API.js
*/

var express = require('express');
var router = express.Router();
const {Category, Question, Answer, User} = require('../lib/models');

// List out the questions for a particular category

// GET /api/v1/categories
// GET /api/v1/categories/:categoryId/questions
// POST /api/v1/categories/:categoryId/questions
// POST /api/v1/categories/:categoryId/questions/:questionId/answers
// GET /api/v1/categories/:categoryId/questions/:questionId/answers

router.get(
    '/profile',
    async (req, res, next) => {
        console.log('req.user is', req.user);
        // write code like find the user where the email id is this
        let u = await User.findOne({where: {email: req.user.email}});

        res.json({
            message: 'You made it to the secure route',
            // user: req.user,
            user: u,
            token: req.query.token
        })
    }
);

router.get(
    '/users/me',
    async (req, res, next) => {
        console.log('req.user is', req.user);


        let u = await User.findOne({where: {email: req.user.email}});
        res.json({
            message: 'You made it to the secure route',
            // user: req.user,
            userId: u.id,
            token: req.query.token
        })
    }
);

//  get Categories
router.get('/categories', async function(req, res, next) {
    console.log('req.user is', req.user);
    let categories = await Category.findAll({});
    res.json(categories);
});

// Write Ques to DB
router.post('/categories/:categoryId/questions', async function(req, res, next) {
    let body = req.body;
    body.categoryId = req.params.categoryId;
    let question = await Question.create(body);
    res.json(question);
});

// Read Ques from DB
router.get('/categories/:categoryId/questions', async function(req, res, next) {
    console.log('req.query.userId', req.query.userId)
    let questions = await Question.findAll({where: {categoryId: req.params.categoryId, userId: req.query.userId}, include: [{model: Answer}]});
    console.log("call endpoint get questions on server ... ") ;
    console.log("here are questions: ") ;
    console.log(questions);
    res.json(questions);
});

// Write Ans to DB   -
router.post('/categories/:categoryId/questions/:questionId/answers', async function(req, res, next) {
    console.log('server endpoint reached, write answer')

    console.log("question id: ")
    console.log(req.params.questionId)
    let body = req.body;
    body.questionId = req.params.questionId;
    let answer = await Answer.create(body);
    res.json(answer);
});

// Read Ans from DB
router.get('/categories/:categoryId/questions/:questionId/answers', async function(req, res, next) {
    let answers = await Answer.findAll({where: {questionId: req.params.questionId}});
    res.json(answers);
});

// Delete Ans from DB
router.delete('/categories/:categoryId/answers', async function(req, res, next) {
    console.log('server endpoint reached, delete request ...');
    await Answer.destroy({where: {id: req.body.answerId} });
    res.json();
});


// Delete Ques from DB
router.delete('/categories/:categoryId/questions', async function(req, res, next) {
    console.log('server endpoint reached, Delete Ques ...');
    console.log('answer id to del: ', req.body.questionId);
    await Answer.destroy({where: {questionId: req.body.questionId} });
    await Question.destroy({where: {id: req.body.questionId} });
    res.json();
});



module.exports = router;
