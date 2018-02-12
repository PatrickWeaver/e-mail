// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var nodemailer = require('nodemailer');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

var email = process.env.EMAIL_ADDRESS;
var sender = process.env.SENDER;



var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: process.env.PASSWORD
  }
});

var mailOptions = {
  from: sender,
  to: process.env.RECIPIENT,
  subject: 'New Test',
  text: 'New test'
};

app.get("/send", function (request, response) {
  // Disabled for now
  if (false){
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    }); 
    response.sendFile(__dirname + '/views/send.html');
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
