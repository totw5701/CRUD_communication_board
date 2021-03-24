const express = require('express');
const router = express.Router();
let template = require('../lib/template');
const db = require('../lib/db');
const shortid = require('shortid'); 
const auth = require('../lib/auth');




router.get('/login', function(req, res){

    const fmsg = req.flash();
    let feedback = '';
    if(fmsg.message){
      feedback = fmsg.message;
    }
    let html = template.HTML("Welcome",
    `
    <span> </span>
    <span><a href="/author/login">로그인</a> | <a href="/author/create">회원가입</a></span>
    `,
    `
    <form action="/author/login_process" method="post" class="post__create">
      <span class="author_register_header">로그인</span>

      <span style='color:tomato; font-weight:bolder;'>${feedback}</span>
  
      <span class="author_register_form">Email</span>
      <input class="author_register_text" type="text" name="email">
  
      <span class="author_register_form">Password</span>
      <input class="author_register_text" type="password" name="password">
      
      <input class="post_submit post_submit_login" type="submit" value="Login">
    </form>
    `,
    ` `    
    )
    res.send(html);
});
  
router.post('/author/login_process', (req, res, next) => {
  console.log("pre-info!")
  passport.authenticate('local',(err, user, info) => {           // Localstrategy에 message가 info로 온다.


    if(req.session.flash){
      req.session.flash = {}      
    }

    req.flash('message', info.message);

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

/*
router.post('/login_process', function(req, res){
    const post = req.body;
    const email = post.email;
    const password = post.password;
    db.query(`SELECT email, password, id, nickName FROM authors WHERE email=?`,[email], function(err, author){
      if(err){
        throw err;
      }
      if(!author[0]){
        // 아이디를 찾을 수 없습니다.
        console.log('no such a email');
        res.redirect('/login');
      } else if (password !== author[0].password){
        // 비밀번호 오류
        console.log('wrong password')
        res.redirect('/login')
      } else {
        // 로그인 성공. :)
        console.log('login success :)');
        req.session.author_id = author[0].id;
        req.session.is_logined = true;
        req.session.nickName = author[0].nickName;
        req.session.save(function(){
        res.redirect('/');
        })
      }
    })
  });
  */
  
  
router.get('/logout_process', function(req, res){
    req.session.destroy(function(err){
      res.redirect('/');
    })
  });
  
  
router.get('/create', function(req, res){

    const authentication = auth.statusUI(req, res);
    let html = template.HTML("Welcome",
    authentication,
    `
    <form action="/author/create_process" method="post" class="post__create">
      <span class="author_register_header">회원가입</span>
  
      <span class="author_register_form">Email</span>
      <input class="author_register_text" type="text" name="email">
  
      <span class="author_register_form">Nick Name</span>
      <input class="author_register_text" type="text" name="nickName">
  
      <span class="author_register_form">Password</span>
      <input class="author_register_text" type="password" name="password">
  
      <span class="author_register_form">Confirm Password</span>
      <input class="author_register_text" type="password" name="password2">
  
      <input class="post_submit" type="submit" value="Register">
    </form>
    `,
    ` `    
    )
    res.send(html);
  });
  
  
router.post('/create_process', function(req, res){
  
    const post = req.body;
    const email = post.email;
    const nickName = post.nickName;
    const password = post.password;
    const password2 = post.password2;
    db.query(`SELECT email FROM authors WHERE email=?`,[email], function(err, resultEmail){
      if(err){
        throw err;
      } 
      if (resultEmail[0]){
        // 이메일 중복
        res.redirect('/author/create');
      } else {
        db.query('SELECT nickName FROM authors WHERE nickName=?', [nickName], function(err, resultNickName){
          if(err){
            throw err;
          } 
          if (resultNickName[0]){
            // 별명 중복
            res.redirect('/author/create')
          } else if (password !== password2){
            // 비밀번호 틀림
            res.redirect('/author/create')
          }
            // 회원 정보 등록
          db.query(`INSERT INTO authors (id, email, nickName, password, registerDate) VALUES('${shortid()}', '${email}', '${nickName}', '${password}', NOW())`, function(err, result){
            if(err){
              throw err;
            }
            res.redirect('/');
          })
        })
      }
    })
});
  

module.exports = router;