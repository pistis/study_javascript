require('./css/style.css');
var $ = require('jquery');
var ClipboardTest = require('./js/clipboardTest');

$(document).ready(function() {
    ClipboardTest.testClipboardEvents(document.body, 'Test clipboard shortcuts/contextmenu Events');
    ClipboardTest.testMouseClickEvents($('#copy'), $('#cut'), $('#paste'));
});