exports.testClipboardEvents = function testClipboardEvents(element, copyText) {
    var $ = require('jquery');

    $(element).on('copy', function(event) {
        event.stopPropagation();
        event.preventDefault();
        event.originalEvent.clipboardData.setData('text/html', copyText);
        event.originalEvent.clipboardData.setData('text/plain', copyText);
        event.originalEvent.clipboardData.setData('text', copyText);
        alert('"' + copyText + '" \n 문자열이 복사되었습니다.');
    });

    $(element).on('cut', function(event) {
        event.stopPropagation();
        event.preventDefault();
        event.originalEvent.clipboardData.setData('text/html', copyText);
        event.originalEvent.clipboardData.setData('text/plain', copyText);
        event.originalEvent.clipboardData.setData('text', copyText);
        alert('"' + copyText + '" \n 문자열이 복사되었습니다.');
    });

    $(element).on('paste', function(event) {
        event.stopPropagation();
        event.preventDefault();
        var copyText = event.originalEvent.clipboardData.getData('text/plain');
        alert('클립보드에 복사된 문자열은 \n "' + copyText + '" 입니다.');
    });
};

exports.testMouseClickEvents = function testMouseClickEvents(copyElement, cutElement, pasteElement) {
    var $ = require('jquery');
    var createClipboardFrame = function() {
        var elIframe = document.createElement('IFRAME');
        elIframe.id = 'clipboard';
        elIframe.src = 'about:blank';
        elIframe.style.cssText = "position:absolute;left:-1000000px;top:-1000000px;border:1px black solid;width:300px;height:300px;z-index:1000000;";

        elIframe.onload = function() {
            this.contentWindow.document.body.setAttribute("contenteditable", true);
            $(this.contentWindow.document.body).on('copy', function(event) {
                console.log('execCommand copy가 실행되었습니다.');
            });

            $(this.contentWindow.document.body).on('cut', function(event) {
                console.log('execCommand cut가 실행되었습니다.');
            });

            $(this.contentWindow.document.body).on('paste', function(event) {
                console.log('execCommand paste가 실행되었습니다.');
            });
        }

        document.body.appendChild(elIframe);
    };

    createClipboardFrame();

    $(copyElement).on('click', function() {
        var elFrame = document.getElementById("clipboard");
        var elDoc = elFrame.contentWindow.document;
        var elBody = elDoc.body;
        elFrame.contentWindow.focus();
        elBody.focus();
        try{
            var success = elDoc.execCommand('copy');
            console.log('copy ', success);
        }catch(e){
            console.log(e);
        }
    });

    $(cutElement).on('click', function() {
        var elFrame = document.getElementById("clipboard");
        var elDoc = elFrame.contentWindow.document;
        var elBody = elDoc.body;
        elFrame.contentWindow.focus();
        elBody.focus();
        try{
            var success = elDoc.execCommand('cut');
            console.log('cut ', success);
        }catch(e){
            console.log(e);
        }
    });

    $(pasteElement).on('click', function() {
        var elFrame = document.getElementById("clipboard");
        var elDoc = elFrame.contentWindow.document;
        var elBody = elDoc.body;
        elFrame.contentWindow.focus();
        elBody.focus();
        try{
            var success = elDoc.execCommand('paste');
            console.log('paste ', success);
        }catch(e){
            console.log(e);
        }
    });

};