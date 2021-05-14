///
import express from "express";
const app = express();
import bodyParser from "body-parser";
import helmet from "helmet";
import compression from "compression";
import flash from "connect-flash";
import passport from "passport";

/*
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require("helmet");
const compression = require('compression');
const flash = require('connect-flash');
const passport = require('passport');
*/





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
import indexRouter from "./routes/index";
//const indexRouter = require('./routes/index');
import postRouter from "./routes/post";
//const postRouter = require('./routes/post');
import authorRouter from "./routes/author";
//const authorRouter = require('./routes/author');

app.use('/', indexRouter);
app.use('/posts', postRouter);
app.use('/author', authorRouter);



// SERVER CONNECTE
app.listen(3000, () => {
  console.log(`Server connected 😃`);
})