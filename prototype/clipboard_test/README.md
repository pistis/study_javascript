# prototype_clipboard
javascirpt로 하는 OS의 clipboard access 프로토타이핑

# Test 방법
- npm install
- npm run watch(webpack 빌드 수행)
- locally와 같은 걸로 간단한 웹서버를 구동한다.
- dist의 index.html 웹페이지에 접속한다.

# Clipboard Event Test
- 단축키 및 컨텍스트 메뉴를 통한 클립보드 이벤트 발생시 Clipboard 개체에 Access 하는 부분은 정상 동작한다.

# MouseClick Event Test
마우스 클릭, 키다운 등 다른 이벤트 동작시 document.execCommand를 이용한 copy, cut, paste 실행시 브라우저 별로 동작이 상이하다.

- Internet Explorer : 보안 프롬프트를 띄우며 사용자가 허용을 하면 문서가 새로고침 되기 전까지 정상 동작한다.
- Chrome (cur 45ver) : copy, cut은 동작하나 paste는 동작하지 않는다.
- FireFox (cur 40ver) : execCommand 실행시 DomException이 발생하며 모두 허용하지 않는다.


# 결론
- 웹 애플리케이션을 개발할 때 Clipboard 이벤트를 이용하여 애플리케이션내의 custom한 복사/잘라내기/붙여넣기 기능을 구현할 수 있다.
- 다만, 마우스 또는 키 이벤트등 특정 UI를 제공하여 복사/잘라내기/붙여넣기 기능을 개발할때에는 강제적으로 Clipboard에 Access 허용이 브라우저별로 달라 어려움이 있다.

# etc...
- 크롬의 경우 extension을 이용하여 가능하게 하는 방법은 제공하고 있다.
- 왠만하면 스펙대로 모든 브라우저 벤더가 맞춰준다면 좋을텐데...
 
 
# 참고
- [MDN Web API Documentation(Document.execCommand())](https://developer.mozilla.org/ko/docs/Web/API/Document/execCommand)
- [Google Developers(Cut and Copy Commands)](https://developers.google.com/web/updates/2015/04/cut-and-copy-commands?hl=en)
- [Lucidchart Service article](https://www.lucidchart.com/techblog/2014/12/02/definitive-guide-copying-pasting-javascript/)
- [Can I use (Clipboard API)](http://caniuse.com/#feat=clipboard)
- [Chrome extension - example code from gist](https://gist.github.com/srsudar/e9a41228f06f32f272a2)
- [Rich-Text Editing in Mozilla](https://developer.mozilla.org/en-US/docs/Rich-Text_Editing_in_Mozilla)
