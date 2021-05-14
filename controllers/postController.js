const express = require('express');
let template = require('../lib/template');
const db = require('../lib/db');
const auth = require('../lib/auth');

export const createProcess = (req, res) => {
    if(!auth.isLogined(req, res)){
        res.redirect('/');
        return false;
      }
    
        const post = req.body;
        const title = post.title;
        const description = post.description;
        const author = post.author;
        db.query(`INSERT INTO posts (title, description, created, author) VALUES(?, ?, NOW(), ?)`,
          [title, description, author], 
          function(err, result){
            if(err){
              throw err;
            }
            res.redirect(`/posts/${result.insertId}`);
          })
}

export const deleteProcess = (req, res) => {
    const post = req.body;
  console.log(post);

  if(!auth.isLogined(req, res)){
    res.redirect('/');
    return false;
  } else if (req.user[0].id !== post.author){
    res.redirect('/');
    return false;
  }
  
const id = req.body.id;
db.query(`DELETE FROM posts WHERE id=?`, [id], function(err, result){
    if(err){
    throw err;
    }
    res.redirect('/');
    })
}

export const create = (req, res) => {
    if(!auth.isLogined(req, res)){
        res.redirect('/');
        return false;
      }
      const authentication = auth.statusUI(req, res);
    
      db.query("SELECT * FROM authors WHERE id=?", [req.user[0].id], function(err, author){
        let html = template.HTML("Welcome",
        authentication,
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
}

export const updateProcess = (req, res) => {
    const post = req.body;
    const title = post.title;
    const description = post.description;
    const id = post.id;
  
    if(!auth.isLogined(req, res)){
      res.redirect('/');
      return false;
    } else if (req.user[0].id !== post.author){
      res.redirect('/');
      return false;
    }
    
    
      db.query(`UPDATE posts SET title=?, description=? WHERE id=?`,
        [title, description, id], 
        function(err, result){
          if(err){
            throw err;
          }
          console.log(result);
          res.redirect(`/posts/${post.id}`);
        })  
}

export const update = (req, res) => {
    const pageId = req.params.pageId;
    db.query(`SELECT * FROM posts WHERE id=?`,[pageId], function(err, post){
      if(err){
        throw err;
      }
    
      if(!auth.isLogined(req, res)){
        res.redirect('/');
        return false;
      } else if (req.user[0].id !== post[0].author){
        res.redirect('/');
        return false;
      }
      
   
      let html = template.HTML("Welcome",
      `
      <span>세계로님 안녕하세요</span>
      <span><a href="#">로그인</a> | <a href="#">회원가입</a></span>
      `,
      `
      <form action="/posts/update_process" method="post" class="post__create">
        <input type="hidden" value="${post[0].id}" name="id">
        <input type="hidden" value="${post[0].author}" name="author">
        <input class="post_title" type="text" name="title" value="${post[0].title}">
        <textarea class="post_description" name="description">${post[0].description}</textarea>
        <input class="post_submit" type="submit" value="Update">
      </form>
      `,
      ` `    
      )
      res.send(html);
    })
}

export const postDetail = (req, res) => {
    const authentication = auth.statusUI(req, res);
    const pageId = req.params.pageID;
    db.query(`SELECT posts.id, title, description, created, nickName, created, author FROM posts JOIN authors ON posts.author = authors.id WHERE posts.id=?`, 
      [pageId],
      function(err, posts){
        if(err){
          throw err;
        }
        const title = posts[0].title;
        const nickName = posts[0].nickName;
        const created = posts[0].created;
        const year = created.getFullYear();
        const month = created.getMonth();
        const day = created.getDate();
        const hour = created.getHours();
        const minuite = created.getMinutes();
        const description = posts[0].description;
        let html = template.HTML("Welcome",
        authentication,
        `
        <div class="post__detail">
          <span class="post__detail__title">${title}</span>
          <div class="post__detail__metaInfo">
              <span class="post__detail__author">${nickName}</span>
              <span class="post__detail__created">${year}-${month + 1}-${day} ${hour}:${minuite}</span>
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
              <input type="hidden" name="author" value="${posts[0].author}">
              <button class="posts__delete__button" type="submit">DELETE</button>
            </form>
            <a href="/posts/update/${posts[0].id}" class="control__fram__button">UPDATE</a>            
          </div>
        </div>
        `
        ) 
        res.send(html);
      })
}
