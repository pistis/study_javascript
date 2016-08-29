var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

//////// ============================================= /////////
// books api routes
app.get('/api/books', function (req, res) {
  return BookModel.find(function (err, books) {
    if (!err) {
      return res.send(books);
    } else {
      return console.log(err);
    }
  });
});

app.post('/api/books', function (req, res) {
  var book = new BookModel({
    title:req.body.title,
    author:req.body.author,
    releaseDate:req.body.releaseDate,
    keywords: req.body.keywords
  });
  book.save(function (err) {
    if (!err) {
      return console.log('created');
    } else {
      return console.log(err);
    }
  });
  return res.send(book);
});

app.get('/api/books/:id', function(req, res){
  return BookModel.findById(req.params.id, function(err, book){
    if(!err){
      return res.send(book);
    } else {
      return console.log(err);
    }
  });
});


app.put('/api/books/:id', function(req, res){
  return BookModel.findById(req.params.id, function(err, book){
    book.title = req.body.title;
    book.author = req.body.author;
    book.releaseDate = req.body.releaseDate;
    book.keywords = req.body.keywords;
    return book.save(function(err){
      if(!err){
        console.log('book updated');
      } else {
        console.log(err);
      }
      return res.send(book);
    });
  });
});

app.delete('/api/books/:id', function(req, res){
  console.log('Deleting book with id: ' + req.params.id);
  return BookModel.findById(req.params.id, function(err, book){
    return book.remove(function(err){
      if(!err){
        console.log('Book removed');
        return res.send('');
      } else {
        console.log(err);
      }
    });
  });
});
//////// ============================================= /////////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



////// ======================================== /////////
// DB config

mongoose.connect('mongodb://localhost/library_database');

var Keywords = new mongoose.Schema({
  keyword: String
});

// 스키마
var Book = new mongoose.Schema({
  title:String,
  author:String,
  releaseDate:Date,
  keywords: [Keywords]
});

// 모델
var BookModel = mongoose.model('Book', Book);



module.exports = app;
