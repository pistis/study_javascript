var express = require('express');
var app = express();
var user = require('./routes/user');
var morgan = require('morgan');
var bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/', express.static('public'));

app.use('/user', user);

app.listen(3000, function (){
    console.log('example app is listening on port 3000');
});