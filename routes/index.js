/*
  Quiz SERVER
  INDEX.js

  index.js -  Authentication routes, which call ../lib/auth.js

*/

var express = require('express');
var router = express.Router();
// const passport = require('../lib/auth');
const passport = require('passport');
const jwt = require('jsonwebtoken');


// calls SignUp from  ../lib/auth.js

router.post(
    '/signup',
    passport.authenticate('signup', {session: false}),
    async (req, res, next) => {
      console.log(req.body)
      res.json({
        message: 'Signup successful',
        success: true,
        // user: req.user
      });
    }
);


// calls Login from  ../lib/auth.js

router.post(
    '/login',
    async (req, res, next) => {

      passport.authenticate(
          'login',
          async (err, user, info) => {
            try {
              if (err || !user) {
                const error = new Error('An error occurred.');
                return next(error);
              }

              req.login(
                  user,
                  {session: false},
                  async (error) => {
                    if (error) return next(error);

                    const body = {_id: user._id, email: user.email};
                    const token = jwt.sign({user: body}, 'TOP_SECRET');

                    return res.json({token});
                  }
              );
            } catch (error) {
              return next(error);
            }
          }
      )(req, res, next);



    }
);


router.get('/', function(req, res, next) {
  console.log('yay')
  res.render('index', { title: 'Express' });
});

module.exports = router;


/* END */
