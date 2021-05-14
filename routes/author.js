import express from "express";
const router = express.Router();
const { login, loginProcess, logoutProcess, create } = require('../controllers/authorController');

router.get('/login', login);
router.post('/login_process', loginProcess);

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
  
router.get('/logout_process', logoutProcess);
router.get('/create', create);
router.post('/create_process', create);
  
export default router;