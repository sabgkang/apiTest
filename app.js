var express = require('express');
var app = express();
var port = process.env.PORT || 5000

app.use(function(req, res, next) {
    console.log("aaa");
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()});

app.get('/', function (req, res) {
  console.log(req.query);
  res.send(req.query.aaa);
});

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});