var express = require('express');
// var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// // Development Settings
// var pathToUse;
// if (app.get('env')=='development') {
//   console.log("devving")
//   pathToUse = "../client/dev";
// } else {
  // pathToUse = "public/dist";
// }

// app.use(express.static(path.join(__dirname, pathToUse)));
app.use(express.static(__dirname + '/public/dist'));

app.get("*", function(req, res) {
  // res.sendFile("index.html", {root: path.join(__dirname, pathToUse)});
  res.sendFile("public/index.html", {root: __dirname});
})

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   // res.render('error');
// });

module.exports = app;
