const app = require('../app');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');

app.use(passport.initialize()); //Dòng này thông báo sử dụng passport
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

app.use(passport.session());
app.use((req, res, next) => {
    if (!req.path.startsWith('/routes')) {
        return next();
    }
    // if (isNotAuthPath(req.path)) {
    //     return next();
    // }
    passport.authenticate('jwt')(req, res, () => {
        if (isUnauthorized(req)) {
        return res.status(401).end();
        }
        next();
    });
});

