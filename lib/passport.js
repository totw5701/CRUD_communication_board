
const db = require('../lib/db');
const passport = require('passport')
,LocalStrategy = require('passport-local').Strategy;

module.exports = function(app){

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
return passport;
}