const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const {User} = require('./models');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const bcrypt = require('bcrypt');

const isValidPassword = async function(password, user) {
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}


passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            console.log(email)
            console.log(password)
            const hash = await bcrypt.hash(password, 10);
            password = hash;
            try {
                const user = await User.create({ email, password });

                return done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);


passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            console.log('email, password', email, password)
            try {
                const user = await User.findOne({where: {email: email}});

                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }

                // const validate = await user.isValidPassword(password);
                const validate = await isValidPassword(password, user)

                if (!validate) {
                    return done(null, false, { message: 'Wrong Password' });
                }

                return done(null, user, { message: 'Logged in Successfully' });
            } catch (error) {
                return done(error);
            }
        }
    )
);


passport.use(
    new JWTstrategy(
        {
            secretOrKey: 'TOP_SECRET',
            jwtFromRequest: ExtractJWT.fromUrlQueryParameter('token')
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);


module.exports = passport;
