var express = require('express');
var app = express();

app.use(express.static('examples'));

app.get("/lib/DomParticles.js", (request, response) => {
  response.sendFile(__dirname + '/lib/DomParticles.js');
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});