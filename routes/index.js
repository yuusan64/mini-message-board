const express = require('express');
const router = express.Router();

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
    res.render('index', { title: "Mini Messageboard", messages });
  });

  //display form
  router.get('/new', (req, res)=>{
    res.render('form', {title: "New Message"});
  });

  //handle form actions
  router.post('/new', (req, res)=>{
    const {user, text} = req.body;
    messages.push({text, user, added: new Date()});
    res.redirect('/');
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