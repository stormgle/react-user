"use strict"

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const passport = require('passport');
const LocalStrategy = require('passport-local');

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

 passport.use(new LocalStrategy(
  function(username, password, done) {
    setTimeout(() => {
      const user = findUser(username);
      if (user && password === user.password) { 
        return done(null, user);
      }
      else {
        return done(null, false) 
      }
    }, 2000); 
  }
));

app.post('/login',
  passport.authenticate('local', {
    session : false
  }),
  function(req, res, next) {
    const tokens = {foo: 'foo.token'}
    req.tokens = tokens;
    next();
  },
  function serializeUser(req, res, next) {
    req.user.password = null;
    next();
  },
  function (req, res, next) { 
    res.status(200).json({user: req.user, tokens: req.tokens}) 
  }
)

app.post('/check/user', (req, res) => {
  setTimeout(() => {
    const username = req.body.username;
    const usr = findUser(username);
    if (usr) {
      res.status(200).json({user: usr});
    } else {
      res.status(200).json({user: null});
    }
  }, 0);
  
})

app.post('/signup', (req, res) => {
  setTimeout(() => {
    const { username, password, profile } = req.body;

    console.log(username)
    console.log(password)
    console.log(profile)

    const usr = findUser(username);
    if (usr) {
      res.status(403).json({error: 'Email is already registered'});
    } else {
      USERS[username] = {
        _id: `00${gid++}`, 
        email: username,
        password: password,
        profile: profile
      }
      res.status(200).json({user: USERS[username], tokens: {foo: 'foo.token'}});
    }
  }, 0);
});


const server = app.listen('3001', 'localhost', () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log (` Server is running at http://${host}:${port}`);
});