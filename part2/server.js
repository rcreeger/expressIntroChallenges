var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
let fs = require('fs');

app.post('/create/:name/:age', function(req, res) {
  let storage = fs.readFileSync(__dirname + '/storage.json', 'utf-8');
  let newData = JSON.parse(storage);
  let nameAge = {
    name: req.params.name,
    age: req.params.age
  };
  newData.push(nameAge);
  fs.writeFileSync(__dirname + '/storage.json', JSON.stringify(newData));
  res.send(newData);
});

app.get('/', function(req, res) {
  let storage = fs.readFileSync(__dirname + '/storage.json', 'utf-8');
    res.send(JSON.parse(storage));
});

app.get('/:name', function(req, res) {
    let storage = fs.readFileSync(__dirname + '/storage.json', 'utf-8');
    let parsedData = JSON.parse(storage);
    let user = parsedData.filter((item) => {
      return item.name === req.params.name;
    });
    if (user.length >= 1) {
      res.json(user[0]);
    } else {
      res.sendStatus(400);
    }
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
