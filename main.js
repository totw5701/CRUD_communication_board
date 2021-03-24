const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require("helmet");
const compression = require('compression');
const flash = require('connect-flash');


const db = require('./lib/db');



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

 
// passport    require('./lib/passport'); 이렇게만 써도 됨      
const potato = require('./lib/passport'); 
potato();









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