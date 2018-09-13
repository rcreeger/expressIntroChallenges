var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

app.get('/hello', function(req, res) {
  res.send("Hello!");
});

app.post('/create/:name', function (req,res) {
  res.json({
    "id": 1,
    "name": req.params.name
  })
})

app.get('/', function (req,res) {
  res.sendFile(__dirname + '/index.html');
})

app.get('/verify/:age', function(req,res) {
  let age = parseInt(req.params.age)
  if (age > 13) {
    res.send('200')
  } else {
    res.send('403')
  }
})

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
