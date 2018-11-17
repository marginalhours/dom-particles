var express = require('express');
var app = express();

app.use(express.static('dist'));

app.get("/", (request, response) => {
  response.sendFile(__dirname + '/examples/index.html');
});

app.get("/index.js", (request, response) => {
  response.sendFile(__dirname + '/examples/index.js');
});

app.get("/lib/letterbomb.js", (request, response) => {
  response.sendFile(__dirname + '/lib/letterbomb.js');
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});