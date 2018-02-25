"use strict"

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

let gid = 2;

const USERS = {
  'tester@team.com': {
    _id: '001',
    name: 'Tester',
    email: 'tester@team.com',
    password: '123456'
  }
}

function findUser(username) {
  if (USERS[username]) {
    return USERS[username];
  } else {
    return null;
  }
}

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
 // .use(cors());

app.post('/user', (req, res) => {
  setTimeout(() => {
    const username = req.body.username;
    const usr = findUser(username);
    if (usr) {
      res.status(200).json({user: usr});
    } else {
      res.status(200).json({user: null});
    }
  }, 2000);
  
})

app.post('/login', (req, res) => {
  setTimeout(() => {
    const { username, password } = req.body;
    const usr = findUser(username);
    if (usr && password === usr.password) {
      res.status(200).json({user: usr, tokens: {foo: 'foo.token'}});
    } else {
      res.status(401).json({error: 'invalid login credential'});
    }
  }, 2000);
});

app.post('/signup', (req, res) => {
  setTimeout(() => {
    const { username, password } = req.body;
    const usr = findUser(username);
    if (usr) {
      res.status(403).json({error: 'Email is already registered'});
    } else {
      USERS[username] = {
        _id: `00${gid++}`, 
        email: username,
        password: password
      }
      res.status(200).json({user: USERS[username], tokens: {foo: 'foo.token'}});
    }
  }, 2000);
});

const server = app.listen('3001', 'localhost', () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log (` Server is running at http://${host}:${port}`);
});