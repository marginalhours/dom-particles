var express = require('express');
var app = express();

app.use(express.static('examples'));

// app.get("/", (request, response) => {
//   response.sendFile(__dirname + '/examples/index.html');
// });

// app.get("/index.js", (request, response) => {
//   response.sendFile(__dirname + '/examples/index.js');
// });

// app.get("/index.css", (request, response) => {
//   response.sendFile(__dirname + '/examples/index.css');
// });

app.get("/lib/letterbomb.js", (request, response) => {
  response.sendFile(__dirname + '/lib/letterbomb.js');
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});