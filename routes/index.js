const express = require('express');
const router = express.Router();
const pool = require('../db/db');

const messages = [
    {
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    {
      text: "Hello World!",
      user: "Charles",
      added: new Date()
    }
  ];

  //route to display messages
  router.get('/', (req, res)=>{
    pool.query('SELECT * FROM messages ORDER BY timestamp DESC')
    .then(result=>{
    res.render('index', { title: "Mini Messageboard", messages });
  })
  .catch(err=>console.error("Error fetching messages:", err));
});

  //display form
  router.get('/new', (req, res)=>{
    res.render('form', {title: "New Message"});
  });

  //handle form actions
  router.post('/new', (req, res)=>{
    console.log('Form submitted:', req.body);
    const { name, message } = req.body;
    pool.query('INSERT INTO messages (name, message) VALUES ($1, $2)', [name, message])
      .then(() => {
        res.redirect('/');
      })
      .catch(err => {
        console.error("Error inserting message:", err);
        res.status(500).send('Internal Server Error');
  });
});
  //display message details

  router.get('/message/:id',(req,res)=>{
    const message = messages[req.params.id];
    if(message){
      res.render('message', {title:"Message Details", message});
    }else{
      res.status(404).send('Message not found');
    }
  });


  module.exports = router;