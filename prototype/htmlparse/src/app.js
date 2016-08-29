require('./css/style.css');
var $ = require('jquery');

var htmlparser = require("htmlparser2");
var sanitizeHtml = require('sanitize-html');

/**
 * 사용방법 테스트해본 것
 */
function test() {
    var dirty = '<p>some text...</p>some really tacky HTML<p>This is <a href="http://www.linux.org"></a><br/>Linux</p>'
        + '<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" />';

    var clean = sanitizeHtml(dirty, {
        exclusiveFilter: function(frame) {
            return frame.tag === 'a' && !frame.text.trim();
        },
        textFilter: function(text) {
            return text.replace(/\.\.\./, '&hellip;');
        },
        allowedTags: [ 'img', 'p' ],
        allowedSchemes: [ 'http' ]
    });
    console.log('dirty : ', dirty);
    console.log('clean : ', clean);


    dirty = '<div><wiggly>Hello</wiggly></div>';
    clean = sanitizeHtml(dirty, {
        allowedTags: false,
        allowedAttributes: false
    });
    console.log('dirty : ', dirty);
    console.log('clean : ', clean);
}

function initEvent() {
    $('#sanitize').click(function(){
        sanitize();
    });
    $('#parsing').click(function(){
        parsing();
    });
}

function sanitize() {
    console.log('sanitize');
    var dirty = $('#dirty').val();
    console.log(dirty);
    var clean = sanitizeHtml(dirty, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'span', 'font' ])
    });
    console.log(clean);
    $('#clean').val(clean);
}

function parsing() {
    console.log('parsing');
    var clean = $('#clean').val();

    var handler = new htmlparser.DomHandler(function (error, dom) {
        if (error)
            console.log(error);
        else
            console.log(dom);
    });
    var parser = new htmlparser.Parser(handler, {
        normalizeWhitespace : true
    });
    parser.write(clean);
    parser.done();

}

$(document).ready(function(){
    console.log('load document...');
    initEvent();
});