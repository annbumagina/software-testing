var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");

users = new Map();

router.post("/login", bodyParser.json(), function(req, res, next) {
  var login = req.body.login;
  var pass = req.body.password;
  if (users.has(login)) {
    if (users.get(login) === pass) {
      res.send("Ok");
    } else {
      res.send("Wrong password");
    }
  } else {
    res.send("User with this login does not exist");
  }
});

router.post("/register", bodyParser.json(), function(req, res, next) {
  var login = req.body.login;
  var pass = req.body.password;
  if (users.has(login)) {
    res.send("This login already exists");
  } else {
    users.set(login, pass);
    res.send("Successfully registered, you can log in now");
  }
});

module.exports = router;
