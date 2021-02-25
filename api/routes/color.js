var express = require("express");
var router = express.Router();

var color = 'white';

router.get("/generate", function(req, res, next) {
    var letters = '0123456789ABCDEF';
    color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    res.send(color);
});

router.get("/get", function(req, res, next) {
    res.send(color);
});

module.exports = router;