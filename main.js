const express = require('express');
const app = express();
let template = require('./lib/template');
const bodyParser = require('body-parser');


// Middleware
app.use(bodyParser.urlencoded({ extended: false }))


// DB
const db = require('./lib/db');

app.get('/', function(req, res){
  db.query('SELECT posts.id, title,description,created,nickName,created FROM posts JOIN authors ON posts.author = authors.id ORDER BY posts.id', 
    function(err, posts){
      
      let list = template.LIST(posts);
      let html = template.HTML("Welcome",
      `
      <span>세계로님 안녕하세요</span>
      <span><a href="#">로그인</a> | <a href="#">회원가입</a></span>
      `,
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


app.get('/posts/create', function(req, res){
  db.query("SELECT * FROM authors WHERE id='aaaaaa'", function(err, author){
    let html = template.HTML("Welcome",
    `
    <span>세계로님 안녕하세요</span>
    <span><a href="#">로그인</a> | <a href="#">회원가입</a></span>
    `,
    `
    <form action="/posts/create_process" method="post" class="post__create">
      <input type="hidden" value="${author[0].id}" name="author">     
      <input class="post_title" type="text" name="title" placeholder="Title">
      <textarea class="post_description" name="description" placeholder="description"></textarea>
      <input class="post_submit" type="submit" value="Create">
    </form>
    `,
    ` `    
    )
    res.send(html);
  })
})

app.post('/posts/create_process', function(req, res){
  const post = req.body;
  const title = post.title;
  const description = post.description;
  const author = post.author;
  db.query(`INSERT INTO posts (title, description, created, author) VALUES('${title}', '${description}', NOW(), '${author}')`, 
    function(err, result){
      if(err){
        throw err;
      }
      res.redirect(`/posts/${result.insertId}`);
    })
})

app.post('/posts/delete_process', function(req, res){
  const id = req.body.id;
  db.query(`DELETE FROM posts WHERE id='${id}'`, function(err, result){
    if(err){
      throw err;
    }
    res.redirect('/');
  })
})


app.post('/posts/update_process', function(req, res){
  const post = req.body;
  const title = post.title;
  const description = post.description;
  const id = post.id;

  db.query(`UPDATE posts SET title=?, description=? WHERE id=${id}`,
    [title, description], 
    function(err, result){
      if(err){
        throw err;
      }
      console.log(result);
      res.redirect(`/posts/${post.id}`);
    })
})


app.get('/posts/update/:pageId', function(req, res){
  const pageId = req.params.pageId;
  db.query(`SELECT * FROM posts WHERE id=${pageId}`, function(err, post){
    if(err){
      throw err;
    }
    let html = template.HTML("Welcome",
    `
    <span>세계로님 안녕하세요</span>
    <span><a href="#">로그인</a> | <a href="#">회원가입</a></span>
    `,
    `
    <form action="/posts/update_process" method="post" class="post__create">
      <input type="hidden" value="${post[0].id}" name="id">
      <input class="post_title" type="text" name="title" value="${post[0].title}">
      <textarea class="post_description" name="description">${post[0].description}</textarea>
      <input class="post_submit" type="submit" value="Update">
    </form>
    `,
    ` `    
    )
    res.send(html);
  })
})

app.get('/posts/:pageID', function(req, res){
  const pageId = req.params.pageID;
  db.query(`SELECT posts.id, title, description, created, nickName, created FROM posts JOIN authors ON posts.author = authors.id WHERE posts.id=${pageId}`, 
    function(err, posts){
      if(err){
        throw err;
      }
      const title = posts[0].title;
      const author = posts[0].nickName;
      const created = posts[0].created;
      const year = created.getFullYear();
      const month = created.getMonth();
      const day = created.getDate();
      const hour = created.getHours();
      const minuite = created.getMinutes();
      const description = posts[0].description;
      let html = template.HTML("Welcome",
      `
      <span>세계로님 안녕하세요</span>
      <span><a href="#">로그인</a> | <a href="#">회원가입</a></span>
      `,
      `
      <div class="post__detail">
        <span class="post__detail__title">${title}</span>
        <div class="post__detail__metaInfo">
            <span class="post__detail__author">${author}</span>
            <span class="post__detail__created">${year}-${month}-${day} ${hour}:${minuite}</span>
        </div>
        <p class="post__detail__description">${description}</p>
      </div>
      `,
      `
      <div class="post__bottom-bar">
        <div></div>
        <div class="post__page-num"></div>
        <div class="post__detail__control_box">
          <form action="/posts/delete_process" method="post" class="post__detail__control_box__delete">
            <input type="hidden" name="id" value="${posts[0].id}">
            <button class="posts__delete__button" type="submit">DELETE</button>
          </form>
          <a href="/posts/update/${posts[0].id}" class="control__fram__button">UPDATE</a>            
        </div>
      </div>
      `
      ) 
      res.send(html);
    })
});

app.listen(3000, () => {
  console.log(`Server connected 😃`);
})