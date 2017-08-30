// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var url = require('url');
let paramDate;
let unix = null;
let natural = null;


function parseDate(unix, natural) {
    return {  
        'unix': unix,
        'natural': natural
    }
}

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


app.get("/*", function (request, response, callback) {
  if (isNaN(request.params[0])) {
      paramDate = new Date(request.params[0]);
  } else {
      paramDate = new Date(parseInt(request.params[0])*1000);
  }
  if (!isNaN(paramDate.getDate())) {
    unix = paramDate.getTime()/1000;
    natural = paramDate.getDate() + "-" +(paramDate.getMonth() + 1) +"-"+ paramDate.getFullYear();
    response.send(parseDate(unix,natural));
  } else {
    response.send(parseDate(null,null));
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});