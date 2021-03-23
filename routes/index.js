const express = require('express');
const router = express.Router();
let template = require('../lib/template');
const db = require('../lib/db');
const auth = require('../lib/auth');



router.get('/', function(req, res){
    db.query('SELECT posts.id, title,description,created,nickName,created FROM posts JOIN authors ON posts.author = authors.id ORDER BY posts.id', 
    function(err, posts){

      console.log("user!",req.user);
      
      const authentication = auth.statusUI(req, res);

      let list = template.LIST(posts);
      let html = template.HTML("Welcome",
      authentication,
      `
      <div class="post__top-bar">
        <span class="post__top-bar__num"=>글번호</span>
        <span class="post__top-bar__title">제목</span>
        <span class="post__top-bar__date">날짜</span>
        <span class="post__top-bar__author">작성자</span>
      </div>

      <div class="post__list">
        ${list}
      </div>

      <div class="post__bottom-bar">
        <div></div>
        <div class="post__page-num">page number</div>
        <div>
          <a href="/posts/create" class="control__fram__button">CREATE</a>            
        </div>
      </div>

      <div class="searchBox__frame">
        <div class="searchBox">
            <input class="searchPost__input" type="text" name="searchPost">
            <button class="searchPost__button" type="submit"><i class="fas fa-search"></i></button>
        </div>
      </div>
      `,
      ``
      ) 
      res.send(html);
    })
})

module.exports = router;