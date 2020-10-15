const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('../src/app/model/post');

const app = express();

mongoose.connect('mongodb+srv://Lakshman:aWFNKfOCuoiDAHI2@cluster0.zu1wz.mongodb.net/node-angular?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Connected to database !');
  })
  .catch(() => {
    console.log('Connection Failed !');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE, OPTIONS');
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
    });
  });
});

app.put("/api/posts/:id", (res, req, next) => {
  const post = new Post({
    //_id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log(result);
    res.status(200).json({message: 'Updated !'});
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'Posts fetched successfully',
        posts: documents
      });
    });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
  });
  res.status(200).json({message:'Post Deleted !'});
});

module.exports = app;
