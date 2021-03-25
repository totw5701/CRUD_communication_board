const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require("helmet");
const compression = require('compression');
const flash = require('connect-flash');


const db = require('./lib/db');

// passport
const passport = require('passport')
,LocalStrategy = require('passport-local').Strategy;


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




app.use(passport.initialize());
app.use(passport.session());  




// Middleware
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(compression());

// Authentication
      // Control Session
  passport.serializeUser(function(user, done) {     
    console.log('serializeUser', user);
    done(null, user.id);        
  });
  
  passport.deserializeUser(function(id, done) {     
    console.log('deserializeUser', id); 

    db.query('SELECT id, email, nickName FROM authors WHERE id=?', [id], function(err, author){
      done(null, author);     // req.user에 이 데이터 전송
    })
  });
  

      // Login info check
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {

    db.query('SELECT * FROM authors WHERE email=?', [username], function(err, author){
      console.log(author);
      if(err){
        throw err;
      }

      if(!author[0]){    // 아이디 정보 없음.
        console.log('LocalStraregy', '아이디 정보 없음')
        return done(null, false, { message: 'Incorrect email' })
      } else {
        if(password !== author[0].password){  // 비밀번호 오류
          console.log('LocalStrategy', '비밀번호 오류');
          return done(null, false, { message: 'Incorrect password' })
        } else {      // 아이디, 비밀번호 일치.
          console.log('LocalStrategy', '아이디정보 확인');
          return done(null, author[0], { message: 'Welcome' })
        }
      }
    })
  }
));


app.post('/author/login_process', (req, res, next) => {
  console.log("pre-info!")
  passport.authenticate('local',(err, user, info) => {

    if(req.session.flash){
      req.session.flash = {}      
    }

    req.flash('message', info.message);
  
    console.log("info!",info);
    console.log(user);

    req.session.save(() => {
      if (err) { 
      return next(err)
      }

      if (!user) {     //user가 없다는 말은 serialzie 혹은 desrialize 에서 아무런 데이터를 못받았단 이야기 = 로그인 실패
      return res.redirect('/author/login')   
      }
      
      req.logIn(user, (err) => {
        if (err) {
        return next(err)
        }
        return req.session.save(() => {
        res.redirect('/')
        })
      })
    })
  })(req, res, next)
  })

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