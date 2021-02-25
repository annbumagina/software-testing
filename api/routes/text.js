var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();

var words = new Set();
var text = "";

router.post("/add", bodyParser.json(), function(req, res, next) {
    newWord = req.body.word;
    if (newWord !== "") {
        words.add(req.body.word);
    }
});

router.get("/get", function(req, res, next) {
    res.send(text);
});

router.get("/generate", function(req, res, next) {
    var items = Array.from(words);
    var n = items.length;
    text = "";
    if (n > 0) {
        for (var i = 0; i < 1000; i++) {
            text += " ";
            text += items[Math.floor(Math.random() * n)];
        }
    }
    res.send(text);
});

module.exports = router;