///


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require("helmet");
const compression = require('compression');
const flash = require('connect-flash');
const passport = require('passport');






// session
var session = require('express-session')
var FileStore = require('session-file-store')(session)
app.use(session({
  secret: 'asadlfkj!@#!@#dfgasdg',
  resave: false,
  saveUninitialized: true,
  store:new FileStore()
}))
app.use(flash());



// Middleware
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(compression());
    // passport
app.use(passport.initialize());
app.use(passport.session());  






/*
app.post('/author/login_process',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/author/login' }));
*/


// ROUTING
const indexRouter = require('./routes/index');
const postRouter = require('./routes/post');
const authorRouter = require('./routes/author');

app.use('/', indexRouter);
app.use('/posts', postRouter);
app.use('/author', authorRouter);



// SERVER CONNECTE
app.listen(3000, () => {
  console.log(`Server connected 😃`);
})