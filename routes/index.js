const express = require('express');
const router = express.Router();
const pool = require('../db/db');

  //route to display messages
  router.get('/', (req, res) => {
    pool.query('SELECT * FROM messages ORDER BY timestamp DESC')
      .then(result => {
        res.render('index', { title: "Mini Message-board", messages: result.rows });
      })
      .catch(err => console.error("Error fetching messages:", err));
  });

  //display form
  router.get('/new', (req, res)=>{
    res.render('form', {title: "New Message"});
  });

  //handle form actions
  router.post('/new', (req, res) => {
    const { name, message } = req.body;
    pool.query('INSERT INTO messages (name, message) VALUES ($1, $2)', [name, message])
      .then(() => {
        res.redirect('/');
      })
      .catch(err => console.error("Error inserting message:", err));
  });
  
  //display message details

  router.get('/message/:id', (req, res) => {
    const messageId = req.params.id;
  
    pool.query('SELECT * FROM messages WHERE id = $1', [messageId])
      .then(result => {
        if (result.rows.length > 0) {
          res.render('message', { title: "Message Details", message: result.rows[0] });
        } else {
          res.status(404).send('Message not found');
        }
      })
      .catch(err => {
        console.error("Error fetching message details:", err);
        res.status(500).send('Internal Server Error');
      });
  });
  

  module.exports = router;