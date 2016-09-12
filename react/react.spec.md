# React Spec
* React의 기본 구성

## props
### 정의
* 컴포넌트에서 사용 할 데이터 중 변동되지 않는(immutable) 데이터를 다룰 때 사용한다.
* parent 컴포넌트에서 child 컴포넌트로 데이터를 전할 때, props 가 사용된다.
* parent 컴포넌트에 의해 값이 변경 될 수 있다.(상위 컴포넌트의 state가 전달될 때)
* 컴포넌트 내부에서 변경 될 수 없다.(immutable)

### defaultProps
* 기본값 설정
```
{Component}.defaultProps = {
    prop : value
}
```

### Type Validate
* propTypes
```javascript
{Component}.propTypes = {
    prop : React.PropTypes.string,
    prop : React.PropTypes.boolean.isRequired
};
```
* propTypes types(https://facebook.github.io/react/docs/reusable-components.html)
```javascript
React.PropTypes.array
React.PropTypes.bool,
React.PropTypes.func,
React.PropTypes.number,
React.PropTypes.object,
React.PropTypes.string,
React.PropTypes.node
React.PropTyps.element
React.PropTypes.instanceOf(Message)
React.PropTypes.oneOf(['News', 'Photos'])
React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.propTypes.number
])
React.PropTypes.arrayOf(React.PropTypes.number)
React.PropTypes.objectOf(React.PropTypes.number)
React.PropTypes.shape({
    color: React.PropTypes.string,
    fontSize: React.PropTypes.number
})
React.PropTypes.func.isRequired
React.PropTypes.any.isRequired
```

## state
### 정의
* 컴포넌트에서 유동적인 데이터를 다룰 때 사용한다.
* React.js 애플리케이션을 만들 땐, state를 사용하는 컴포넌트의 갯수를 최소화 하는 것을 노력해야 한다.
    * 예를 들어 10개의 컴포넌트에서 유동적인 데이터를 사용 하게 될 땐, 각 데이터에 state를 사용 할 게 아니라 props를 사용하고 10개의 컴포넌트를 포함시키는 container 컴포넌트를 사용하는 것이 효율적이다.
* parent 컴포넌트에 의해 값이 변경 될 수 없다.
* 컴포넌트 내부에서 변경 될 수 있다.    
    
### 사용
* state 의 초기 값을 설정 할 때는 constructor(생성자) 메소드에서 this.state= { } 를 통하여 설정합니다.
* state 를 렌더링 할 때는 { this.state.stateName } 을 사용합니다.
* state 를 업데이트 할 때는 this.setState() 메소드를 사용합니다. ES6 class에선 auto binding이 되지 않으므로, setState 메소드를 사용 하게 될 메소드를 bind 해주어야 합니다. (bind 하지 않으면 React Component 가 가지고있는 멤버 함수 및 객체에 접근 할 수 없습니다.)


## LifeCycle API
* 컴포넌트가 DOM위에 생성되기 전 후 및 데이터가 변경되어 상태를 업데이트하기 전 후로 실행되는 메소드

### 동작
* 컴포넌트 생성 순서
    * constructor -> componentWillMount -> render -> componentDidMount
* 컴포넌트 제거 순서
    * componentWillUnmount
* 컴포넌트의 prop이 변경될 때
    * componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate-> render -> componentDidUpdate
* 컴포넌트의 state가 변경될 때
    * shouldComponentUpdate -> componentWillUpdate-> render -> componentDidUpdate
    * LifeCycle API 그림
        * ![alt text](https://velopert.com/wp-content/uploads/2016/03/f.png)

### API
#### constructor
* 생성자 메소드로서 컴포넌트가 처음 만들어 질 때 실행됩니다.
* 이 메소드에서 기본 state 를 정할 수 있습니다.

#### componentWillMount
* 컴포넌트가 DOM 위에 만들어지기 전에 실행됩니다.

#### render
* 컴포넌트 렌더링을 담당합니다.

#### componentDidMount
* 컴포넌트가 만들어지고 첫 렌더링을 다 마친 후 실행되는 메소드입니다.
* 이 안에서 다른 JavaScript 프레임워크를 연동하거나,
* setTimeout, setInterval 및 AJAX 처리 등을 넣습니다.

#### componentWillReceiveProps
* 컴포넌트가 prop 을 새로 받았을 때 실행됩니다.
* prop 에 따라 state 를 업데이트 해야 할 때 사용하면 유용합니다.
* 이 안에서 this.setState() 를 해도 추가적으로 렌더링하지 않습니다.

#### shouldComponentUpdate
* prop 혹은 state 가 변경 되었을 때, 리렌더링을 할지 말지 정하는 메소드입니다.
* return boolean

#### componentWillUpdate
* 컴포넌트가 업데이트 되기 전에 실행됩니다.
* 이 메소드 안에서는 this.setState() 를 사용하지 마세요 – 무한루프에 빠져들게 됩니다.

#### componentDidUpdate
* 컴포넌트가 리렌더링을 마친 후 실행됩니다.

#### componentWillUnmount
* 컴포넌트가 DOM 에서 사라진 후 실행되는 메소드입니다.

## ref
* ref는 reference 를 의미하며, 이는 DOM 요소에 이름을 달아줍니다.
* HTML 의 id와 사뭇 비슷하지만, id는 일반 DOM 요소에 특정 DOM 메소드만 사용 할 수 있지만,
* ref는 DOM 요소에도 사용하고 컴포넌트에도 사용 할 수 있으며,
* 해당 컴포넌트가 가지고있는 메소드 및 변수들을 사용 할 수 있다는 점이 큰 차이점 입니다.

### 주의점
* state 및 props 로 해결 할 수 있는 부분에선 ref 를 사용하지 않고, 해결 할 수 없는 부분에서만 ref 를 사용하는 것이 유지보수에 좋은 방향입니다.
* 컴포넌트에 의해 렌더 된 DOM 에 직접 어떠한 처리를 해야 할 경우
* 큰 프로젝트에 React 컴포넌트를 사용하는 경우 (예: 다른 웹프레임워크와 혼용)


## state의 자료구조 다루기
* this.state 에 포함된 배열에 원소를 삽입/제거/수정 을 할 때 그 배열에 직접 접근하면 안됩니다.
* 예를들어, 원소를 추가 할 때 배열객체의 push() 메소드를 사용하면 원하는대로 되지 않습니다.
* this.state가 변경된다고해서 컴포넌트가 업데이트되지 않기 때문입니다.
* React 메뉴얼 에서도  this.state를 직접 수정하지 말고 this.setState()를 사용하여 수정 할 것을 강조합니다.

### 추천 방법
*  Immutability Helpers (immutable-js 사용)
    * import update from 'react-addons-update'