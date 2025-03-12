# 프로젝트 설명

바닐라 자바스크립트를 이용하여 커뮤니티 서비스를 제작하는 개인 프로젝트입니다. <br />
바닐라 자바스크립트로 SPA (Single Page Application) 아키텍쳐를 사용하여 구현되었으며, 서버와 데이터베이스 추가 설정부터 리액트로의 마이그레이션까지 진행될 프로젝트입니다.

## 프로젝트 중요 개념

- 프로젝트 루프에 위치한 `index.html`의 화면에 내용을 구성하며, 라우팅간 페이지 구성요소를 교체하는 SPA 방식으로 작동합니다. <br/>

- 3️⃣ `router.js`를 토대로 라우팅이 진행됩니다. <br />
  브라우저로 요청된 URL을 토대로 알맞는 컴포넌트를 토대로 2️⃣의 구성요소를 교체하는 방식입니다. <br />

```
<body>
    <header id="app-header"></header>   // 1️⃣ 헤더 컴포넌트
    <div id="app"></div>                // 2️⃣ 핵심 로직 구현 영역
    <script type="module" src="/router.js"></script> // 3️⃣ SPA 라우팅 구현 함수
  </body>
```

- `Component.js`는 app에 위치하는 컴포넌트를 구현하기 위한 클래스입니다.
- `InlineComponent.js`는 지정된 요소가 아닌 태그에 컴포넌트를 위치시키기 위한 클래스입니다.

## 프로젝트 구조

```
├── README.md
├── components (공통 컴포넌트)
│   └── common
│       ├── Component.js (페이지 컴포넌트)
│       ├── InlineComponent.js (인라인 컴포넌트)
│       ├── Button
│       │   ├── Button.css
│       │   └── Button.js
│       ├── Header
│       │   ├── Header.css
│       │   └── Header.js
│       ├── Modal
│       │   ├── Modal.css
│       │   └── Modal.js
│       └── Toast
│           ├── Toast.css
│           └── Toast.js
├── index.html (프로젝트 유일 페이지)
├── lib (라이브러리 함수)
│   ├── utils (유틸 함수)
│   │   ├── date.js
│   │   └── number.js
│   └── validation (유효성 검사)
│       ├── inputValidations.js
│       └── postValidations.js
├── pages (라우팅간 컴포넌트)
│   ├── auth
│   │   ├── Login.js
│   │   ├── Mypage.js
│   │   ├── PasswordChange.js
│   │   └── Register.js
│   └── post
│       ├── PostDetail.js
│       ├── PostList.js
│       ├── PostModify.js
│       └── PostWrite.js
├── public (정적 데이터)
│   ├── data
│   │   ├── dummy_posts.js
│   │   └── routes.js (프로젝트 라우트)
│   └── images
│       └── header_image.jpeg
├── reset.css (기본 스타일 리셋)
├── router.js (라우팅 구현 함수(
├── style.css
└── styles (스타일링 코드)
    ├── auth
    │   ├── login.css
    │   ├── mypage.css
    │   ├── password_change.css
    │   └── register.css
    └── post
        ├── detail.css
        ├── list.css
        ├── modify.css
        └── write.css
```

## 회고 통합 저장소

SPA 회고 (바닐라 자바스크립트)

  <details>
  <summary>📌 클릭해서 열기</summary>

### 회고

정말 뜻깊었지만 매우 불쾌했던 구현과정이었습니다.

처음에는 MPA (페이지당 HTML, CSS, JS)로 구현하려고 하다보니, HTML마다 중복되는 내용에 대한 처리, 매우 더러워지는 파일 · 폴더 구조로 인해 참지 못하고 기존에 익숙했던 리액트 방식으로 전환하였습니다.

SPA를 구현하면서도 순탄하지만은 않았습니다. _(아직 해결하지 못한 이슈도 있습니다.)_

클래스 컴포넌트 구조로 컴포넌트를 설계하고 렌더링, 이벤트 위임 등 고려해야 하는 사항들이 많았습니다.

리액트에서는 당연하게 여겨졌던 것들이 작동하는데 추가적인 인풋이 필요한 사실에 충격을 많이 받았습니다.

### 고려했던 사항

- 클래스 vs 함수형 컴포넌트 중에 **클래스 컴포넌트를 선택한 이유**
  리액트는 클래스 → 함수형 컴포넌트로 더 편리하도록 진화하였는데 그 과정을 몸소 느껴보고자 클래스 컴포넌트로 구현하였습니다.
  다만, 역시나 클래스 컴포넌트는 불편한 점들이 많았습니다.
  1. `this 바인딩`이 필요하다. (생명주기 메소드)
  2. 상속이 된다는 점이 오히려 불편하게 다가왔다.

     함수형 컴포넌트에서는 각 컴포넌트가 독립적으로 존재해서 사용할 수 있어 자유도가 높았던 반면, 클래스형 컴포넌트는 부모 컴포넌트 아래 구현되다 보니 생명주기, 메소드 등 신경써야 했던 부분들이 많았습니다.
- 폴더 구조 정리 (리팩토링)

  개발을 깔끔하게 해서 동료가(kevin) 코드를 이해하는데 1초의 시간도 걸리지 않도록 코드 및 프로젝트를 관리하는 것도 개발자에게 중요한 능력중 하나라고 생각합니다.

  오늘 `kevin`의 강의에서 **“폴더 및 파일 구조는 같이 봐야하는 코드끼리 모아놓아져 있어야 한다”**는 말씀을 토대로 최대한 관심사가 비슷한 코드들끼리 구조화하려고 노력했습니다.

  cf) `Next.js`의 폴더 구조를 비슷하게 따라해았습니다. (Page Router)

  혹시라도 추후에 바닐라 JS → React → Next.js 로 마이그레이션 할 수 있다고 생각했기 때문이기도 합니다.

- 셀프리뷰 (PR)

  저는 **코드리뷰**에 대한 ⭐️**환상**⭐️이 있습니다.

  혼자 개발하면 **항상 쓰던 코드에 매몰**된다는 생각에 코드리뷰를 통해서 객관적 시선으로 코드를 바라봐야 한다고 생각합니다.

  이번에도 코드리뷰에 대한 고민이 있었는데 `Kevin`이 수업에서 **“셀프 리뷰를 해서 자신만의 코드 기준을 찾아보고 이를 자신의 코드에 적용해보는 시간을 가지는 것도 좋은 방법입니다..”** 라고 하셔서 바로 쉬는시간에 메인 푸시 불가 설정을 해두고 이슈-PR을 작성하도록 하였습니다.

    <br />
    
    [PR링크](https://github.com/100-hours-a-week/2-noah-kim-community/pull/3)

  _(사실 실수로 머지를 위한 리뷰어수를 제한해두지 않아서 무의식적으로 머지해버렸습니다. 다음부터 셀프리뷰 하겠습니다)_

  해당 PR은 리펙토링 PR이고, Chore한 사항들이 많아서 설명이 부실합니다.. 앞으로 코드리뷰 잘 작성하는 법도 체득해 나가고 싶습니다.

### 신기했던 것 / 불편했던 점들

- CSS 적용이 전역으로 되는 문제
  `CSS Module` 혹은 `Tailwindcss`와 같은 방법으로 개발을 하다보면 전역 CSS에 대한 고려를 하지 않아도 되었는데, 타 컴포넌트에서 자꾸 스타일이 치고 들어와서 HTML 속성명을 고민하는 시간과, 중복 CSS가 발생하지 않도록 고려하는 과정에서 시간적 소요가 있었습니다.
- JSX의 소중함
  1. `template()` 함수에서 HTML을 작성하였는데, 문자열 안에 작성하다 보니 코드 에디터의 기능을 일절 사용하지 못했습니다. (자동 완성, 속성 추천 등)
  2. JSX에서 자동으로 변환해주던 것들
     1. `map()` 함수에서 `.join(””)` 없이 각 원소를 렌더링

        `map()`이 배열을 반환한다는 사실을 망각한채, 리액트에서는 `map()`을 사용하면 당연히 각 요소를 렌더링한다고 생각했었음. 이는, JSX가 지원하는 기능이었던 것.

     2. 조건부 렌더링의 편리함

        삼항 연산자, && 연산자 등으로 State에 따른 조건 렌더링을 편하게 했었는데, 바닐라 JS 환경에서는 아래 코드와 같이 작성하면 `<` 를 인식하지 못하였다. 생각해보면 당연했는데 이 또한 충격받았다.

        ```jsx
        return `
        	${isDone ? <div>It is Done</div> : <div>Not Done</div>}
        `
        ```

### 추가

저는 리액트 개발할때 클래스를 거의 사용하지 않았었습니다.

심지어는 “자바스크립트에서 클래스를 도데체 왜 알아야하지?”를 고수하던 개발자였는데, 이번 기회로 생각이 조금 바뀌었습니다.

클래스 문법에 익숙해지다 보니, 함수형 컴포넌트 내부에서 모듈처럼 함수들을 관리하면 생각보다 사용하기 편리할 것 같다고 생각해서, 다음 프로젝트때 한번 적용해보면 좋을 것 같습니다.

- handlers를 묶으면 좋을 것 같습니다. 중구난방 이벤트 핸들러 함수들이 퍼져있는게 마음에 안들었는데 클래스로 묶어버리면 MVC처럼 관심사 분리가 잘될 것 같습니다.

```jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// 🎯 핸들러들을 묶어서 관리하는 클래스
class LoginHandlers {
  constructor(setUser, navigate) {
    this.setUser = setUser
    this.navigate = navigate
  }

  login = () => {
    // 로그인 로직 (예제에서는 간단한 사용자 정보 저장)
    this.setUser({ username: 'testUser', isLoggedIn: true })
    alert('로그인 성공!')
    this.navigate('/dashboard') // 로그인 후 이동
  }

  logout = () => {
    this.setUser({ username: '', isLoggedIn: false })
    alert('로그아웃 되었습니다.')
  }

  routeToSignup = () => {
    this.navigate('/signup')
  }
}

// 🎯 함수형 컴포넌트 (핸들러 클래스를 활용)
const Login = () => {
  const [user, setUser] = useState({ username: '', isLoggedIn: false })
  const navigate = useNavigate()

  // 🔥 LoginHandlers 인스턴스 생성 후 활용
  const handlers = new LoginHandlers(setUser, navigate)

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>로그인 페이지</h1>

      {user.isLoggedIn ? (
        <>
          <p>안녕하세요, {user.username}님!</p>
          <button onClick={handlers.logout}>로그아웃</button>
        </>
      ) : (
        <>
          <button onClick={handlers.login}>로그인</button>
          <button onClick={handlers.routeToSignup} style={{ marginLeft: '10px' }}>
            회원가입
          </button>
        </>
      )}
    </div>
  )
}

export default Login
```
