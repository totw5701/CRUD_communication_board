const express = require('express');
const router = express.Router();
let template = require('../lib/template');
const db = require('../lib/db');
const auth = require('../lib/auth');
const url = require('url');

export const home = (req, res) => {
    db.query('SELECT posts.id, title,description,created,nickName,created FROM posts JOIN authors ON posts.author = authors.id ORDER BY posts.id', 
    function(err, posts){

      console.log("user!",req.user);
      
      const authentication = auth.statusUI(req, res);

      //pages
      const _url = req.url;
      const queryData = url.parse(_url, true).query;
      const page_query = queryData.page_num;

      const page_select = template.PAGES_SELECTOR(posts, page_query);

      let list = template.LIST(posts, page_query);
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
        <div class="post__page-num">
          ${page_select}
        </div>
        <div>
          <a href="/posts/create" class="control__fram__button">CREATE</a>            
        </div>
      </div>

      <div class="searchBox__frame">
        <form class="searchBox" action="/search" method="get">
            <input class="searchPost__input" type="text" name="searchPost">
            <button class="searchPost__button" type="submit"><i class="fas fa-search"></i></button>
        </form>
      </div>
      `,
      ``
      ) 
      res.send(html);
    })
}

export const search = (req, res) => {
  const {
    query: { searchPost: searchingBy }
  } = req;

  console.log(searchingBy);


  db.query(`SELECT posts.id, title,description,created,nickName,created FROM posts JOIN authors ON posts.author = authors.id  WHERE title like "%${searchingBy}%" ORDER BY posts.id`, 
  function(err, posts){

    console.log("search!",posts);
    if(!posts){
      posts = [];
    }
    
    const authentication = auth.statusUI(req, res);

    //pages
    const _url = req.url;
    const queryData = url.parse(_url, true).query;
    const page_query = queryData.page_num;

    const page_select = template.PAGES_SELECTOR(posts, page_query);

    let list = template.LIST(posts, page_query);
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
      <div class="post__page-num">
        ${page_select}
      </div>
      <div>
        <a href="/posts/create" class="control__fram__button">CREATE</a>            
      </div>
    </div>

    <div class="searchBox__frame">
      <form class="searchBox" action="/search" method="get">
          <input class="searchPost__input" type="text" name="searchPost">
          <button class="searchPost__button" type="submit"><i class="fas fa-search"></i></button>
      </form>
    </div>
    `,
    ``
    ) 
    res.send(html);
  })
}