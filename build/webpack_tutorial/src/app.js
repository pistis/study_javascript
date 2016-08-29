require('./css/style.css');
var yell = require('./js/alert.js');

require('hash-change').on('change', function(hash) {
    yell(hash);
});