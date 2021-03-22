const express = require('express');
const router = express.Router();
let template = require('../lib/template');
const db = require('../lib/db');
const shortid = require('shortid'); 




router.get('/login', function(req, res){
    if(req.session.is_logined === true){
      res.redirect('/');
      return false;
    }
    let html = template.HTML("Welcome",
    `
    <span> </span>
    <span><a href="/author/login">로그인</a> | <a href="#=/author/create">회원가입</a></span>
    `,
    `
    <form action="/author/login_process" method="post" class="post__create">
      <span class="author_register_header">로그인</span>
  
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
  
  
router.get('/logout_process', function(req, res){
    req.session.destroy(function(err){
      res.redirect('/');
    })
  });
  
  
router.get('/create', function(req, res){
    let authentication = '';
    if(req.session.is_logined === true){
      const nickName = req.session.nickName;
      authentication += `<span>${nickName}님 어서오세요. </span>`;
      authentication += '<span><a href="/author/logout_process">로그아웃</a></span>';
    } else {
      authentication += `<span>어서오세요</span>`
      authentication += '<span><a href="/author/login">로그인</a> | <a href="/author/create">회원가입</a></span>';
    }
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
    db.query(`SELECT email FROM authors WHERE email=?`,[email], function(err, result){
      if(err){
        throw err;
      } 
      if (result[0]){
        // 이메일 중복
        res.redirect('/author/create');
      } else {
        db.query('SELECT nickName FROM authors WHERE nickName=?', [nickName], function(err, result){
          if(err){
            throw err;
          } 
          if (result[0]){
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