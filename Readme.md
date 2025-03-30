## FOODY

자신이 먹었던 음식 사진을 올리며 당시의 기분을 작성하는 커뮤니티 프로젝트입니다.

### Stacks

- FE : Vanillia JS를 이용한 SPA 직접 구현 (useState, useEffect 포함)
- BE : Java Spring(JDK 21), MySQL, JPA, Amazon S3

### 개발 기간 및 인원

기간 : 25.01 ~ 25.03 (3개월)
인원 : 1인 프로젝트이며, FE, BE 모두 담당하였습니다

### FE 프로젝트 설명 (README.md링크)

  <details>
  <summary>FE 설명 토글</summary>
  
  ## 실행 방법

VSCode의 Live Server로 실행됩니다.

    다만, Live Server는 폴더 구조로 라우팅을 구현하므로, 이에 대한 설정을 바꿔 항상 루트에 위치한 `index.html`로 라우팅되도록 구현해야 합니다.

    1. `ctrl + shift + p`를 누른 뒤, settings **"Preferences: Open User Settings(JSON)"**을 열어주세요.
    2. `"liveServer.settings.file": "index.html"`를 그대로 추가해주세요. 해당 설정은 라우팅시 파일을 루트에 위치한 `index.html`로 고정하는 역할을 합니다.
    3. Live Server를 실행시키면 프로젝트에 위치한 `router.js`로 자동 라우팅됩니다.

    ## 주요 개념

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

    - ✅ `BaseComponent.js`는 아래 모든 종류의 컴포넌트의 상위 클래스입니다.
        - 1️⃣ `Component.js`는 **특정 요소**에 원하는 요소를 **자식으로 추가**하는 컴포넌트입니다.
        - 2️⃣ `InlineComponent.js` 는 **특정 요소를 대체**하는 컴포넌트입니다.
        - 3️⃣ `PortalComponent.js`는 모달과 같이 **Portal에 적용**하기 위한 컴포넌트입니다.
    - 💡`StateMangaer.js` 는 useState 상태 관리 로직을 제공하는 클래스입니다.
    - 🔧 `EffectManager.js` 는 useEffect 로직을 제공하는 클래스입니다.

    ## 폴더 구조

    ```
    ├── README.md
    ├── components
    │   ├── common
    │   │   ├── BaseComponent.js   // ✅
    │   │   ├── Component.js       // 1️⃣
    │   │   ├── InlineComponent.js // 2️⃣
    │   │   ├── PortalComponent.js // 3️⃣
    │   │   ├── StateManager.js    // 💡
    │   │   ├── EffectManager.js   // 🔧
    │   │   ├── Button
    │   │   │   ├── Button.css
    │   │   │   └── Button.js
    │   │   ├── Header
    │   │   │   ├── Header.css
    │   │   │   └── Header.js
    │   │   ├── Modal
    │   │   │   ├── Modal.css
    │   │   │   └── Modal.js
    │   │   ├── TextInput
    │   │   │   ├── TextInput.css
    │   │   │   └── TextInput.js
    │   │   ├── Textarea
    │   │   │   ├── Textarea.css
    │   │   │   └── Textarea.js
    │   │   └── Toast
    │   │       ├── Toast.css
    │   │       └── Toast.js
    │   └── pages                 // 라우트간 공용 컴포넌트
    │       └── post
    │           ├── Comment.css
    │           ├── Comment.js
    │           ├── PostCard.css
    │           └── PostCard.js
    ├── index.html
    ├── lib                       // 유틸함수
    │   ├── utils
    │   │   ├── auth.js           // 유저 인증 관련
    │   │   ├── date.js           // 시간 처리 관련
    │   │   └── number.js         // 숫자 처리 관련
    │   └── validation
    │       ├── inputValidations.js // 인풋 태그 유효성 검사 관련
    │       └── postValidations.js  // 게시글 유효성 검사 관련
    ├── pages
    │   ├── auth
    │   │   ├── Login.js          // 로그인 페이지
    │   │   ├── Mypage.js         // 회원정보 수정 페이지
    │   │   ├── PasswordChange.js // 비밀번호 수정 페이지
    │   │   └── Register.js       // 회원가입 페이지
    │   └── post
    │       ├── PostDetail.js     // 게시글 디테일 페이지
    │       ├── PostList.js       // 게시글 목록 페이지
    │       ├── PostModify.js     // 게시글 수정 페이지
    │       └── PostWrite.js      // 게시글 작성 페이지
    ├── public
    │   ├── data
    │   │   └── routes.js         // 라우트 정보
    ├── reset.css
    ├── router.js
    ├── service
    │   ├── Fetch.js              // 기본 페칭 함수
    │   ├── endpoints.js          // 엔드포인트 상수
    │   ├── postService.js        // 게시글 관련 API
    │   ├── userService.js        // 유저 관련 API
    │   └── utilService.js        // 이미지 업로드 등 서비스 미특정 API
    ├── style.css
    └── styles
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

    <details>
    <summary>📌 SPA 회고 (바닐라 자바스크립트)</summary>

    ### 회고

    정말 뜻깊었지만 매우 불쾌했던 구현과정이었습니다.

    처음에는 MPA (페이지당 HTML, CSS, JS)로 구현하려고 하다보니, HTML마다 중복되는 내용에 대한 처리, 매우 더러워지는 파일 · 폴더 구조로 인해 참지 못하고 기존에 익숙했던 리액트 방식으로 전환하였습니다.

    SPA를 구현하면서도 순탄하지만은 않았습니다. *(아직 해결하지 못한 이슈도 있습니다.)*

    클래스 컴포넌트 구조로 컴포넌트를 설계하고 렌더링, 이벤트 위임 등 고려해야 하는 사항들이 많았습니다.

    리액트에서는 당연하게 여겨졌던 것들이 작동하는데 추가적인 인풋이 필요한 사실에 충격을 많이 받았습니다.

    ### 고려했던 사항

    - 클래스 vs 함수형 컴포넌트 중에 **클래스 컴포넌트를 선택한 이유**
    리액트는 클래스 → 함수형 컴포넌트로 더 편리하도록 진화하였는데 그 과정을 몸소 느껴보고자 클래스 컴포넌트로 구현하였습니다.
    다만, 역시나 클래스 컴포넌트는 불편한 점들이 많았습니다.
        1. `this 바인딩`이 필요하다. (생명주기 메소드)
        2. 상속이 된다는 점이 오히려 불편하게 다가왔다.

            함수형 컴포넌트에서는 각 컴포넌트가 독립적으로 존재해서 사용할 수 있어 자유도가 높았던 반면, 클래스형 컴포넌트는 부모 컴포넌트 아래 구현되다 보니 생명주기, 메소드 등 신경써야 했던 부분들이 많았습니다.

    - **폴더 구조** 정리 (리팩토링)

        개발을 깔끔하게 해서 동료가(kevin) 코드를 이해하는데 1초의 시간도 걸리지 않도록 코드 및 프로젝트를 관리하는 것도 개발자에게 중요한 능력중 하나라고 생각합니다.

        오늘 `kevin`의 강의에서 **“폴더 및 파일 구조는 같이 봐야하는 코드끼리 모아놓아져 있어야 한다”**는 말씀을 토대로 최대한 관심사가 비슷한 코드들끼리 구조화하려고 노력했습니다.

        cf) `Next.js`의 폴더 구조를 비슷하게 따라해았습니다. (Page Router)

        혹시라도 추후에 바닐라 JS → React → Next.js 로 마이그레이션 할 수 있다고 생각했기 때문이기도 합니다.

    - **개인 코드 리뷰 및 기록 남기기**
        1. 바닐라 JS로 useState, useEffect 훅 개발 https://github.com/100-hours-a-week/2-noah-kim-community/pull/14
        2. S3 이미지 업로드 기능 https://github.com/100-hours-a-week/2-noah-kim-community/pull/17

        수정해야할 사항들을 리뷰후에 반영하는 방식으로 연습해서 현업에 나가서도 코드 리뷰하는 습관을 들이도록 노력했습니다.

        단, 아직은 제가 만든 코드를 제가 보는거라 **사소한 에러들 밖에 보이지 않습니다.**

        경험이 쌓이고 실력이 쌓이면 코드 구조 혹은  효율적으로 변경할 수 있는 눈이 생기기를 기대해봅니다..


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

  </details>
    


### BE 프로젝트 설명 (README.md링크)

 <details>
  <summary>BE 설명 토글</summary>
  
## 실행 방법

1. 비밀키를 추가해야 합니다. _(당연히 비공개입니다.)_

   [`application.properties`](http://application.properties) (JWT 관련 비밀값)

   [`application-private.properties`](http://application-private.properties) (S3 관련 비밀값)

## 주요 개념

- 각 서비스별로 파일을 분리하여 `domain` 폴더 아래 정리했습니다.

## 폴더 구조

```
├── KtcApplication.java
├── SpringConfig.java
└── domain
    ├── S3                    // S3 서비스 관련
    │   ├── S3Config.java
    │   ├── S3Controller.java // 이미지 삭제, 이미지 업로드
    │   ├── S3Service.java
    │   └── response
    │       └── ImageUploadResponse.java
    ├── post
    │   ├── controller        // 게시글 관련
    │   │   └── PostController.java
    │   ├── dto
    │   │   ├── request
    │   │   │   ├── comment
    │   │   │   │   ├── CommentCreateRequest.java
    │   │   │   │   └── CommentUpdateRequest.java
    │   │   │   ├── like
    │   │   │   └── post
    │   │   │       ├── PostCreateRequest.java
    │   │   │       ├── PostListResponse.java
    │   │   │       └── PostModifyRequest.java
    │   │   └── response
    │   │       ├── comment
    │   │       │   ├── CommentCreateResponse.java
    │   │       │   └── CommentUpdateResponse.java
    │   │       └── post
    │   │           └── PostDetailResponse.java
    │   ├── entity
    │   │   ├── Comment.java
    │   │   ├── Like.java
    │   │   └── Post.java
    │   ├── repository
    │   │   ├── CommentRepository.java
    │   │   ├── LikeRepository.java
    │   │   └── PostRepository.java
    │   └── service
    │       ├── CommentService.java
    │       ├── LikeService.java
    │       └── PostService.java
    ├── user
    │   ├── controller
    │   │   └── UserController.java
    │   ├── dto
    │   │   ├── request
    │   │   │   ├── LoginRequest.java
    │   │   │   ├── ModifyRequest.java
    │   │   │   ├── PasswordModifyRequest.java
    │   │   │   └── RegisterRequest.java
    │   │   └── response
    │   │       ├── CreateResponse.java
    │   │       ├── LoginResponse.java
    │   │       ├── RegisterResponse.java
    │   │       └── UserDataResponse.java
    │   ├── entity
    │   │   └── User.java
    │   ├── repository
    │   │   ├── JpaUserRepository.java
    │   │   └── UserRepository.java
    │   └── service
    │       └── UserService.java
    └── utils
        ├── response
        │   ├── CommonResponse.java         // 공통 응답 형식
        │   ├── CustomException.java
        │   ├── GlobalExceptionHandler.java
        │   └── errorcode                   // 각 서비스별 응답 에러 코드
        │       ├── AuthErrorCode.java
        │       ├── CommentErrorCode.java
        │       ├── ErrorCode.java
        │       ├── JwtErrorCode.java
        │       ├── PostErrorCode.java
        │       └── S3ErrorCode.java
        └── security                        // JWT, 비밀번호 해싱 등 보안 관련
            ├── JwtProperties.java
            ├── JwtUtils.java
            └── PasswordUtils.java

```

### 회고

1. FE 개발자로써는 처음으로 BE 개발을 해보면서 어떤 로직이 불편하고 손이 많이가는지 약간은 이해하게 되었습니다.

   특히, 무한스크롤이랑 페이지네이션 방식 중에서 어떤 방식이 BE 입장에서 불편한지 항상 궁금했는데, 별반 차이가 없는것 같습니다.

1. 이번 과제를 하면서 가장 크게 느낀점은 한 분야에서만 능력자가 되기도 힘들겠다는 점입니다.

   이번 부트캠프 시작하면서 야심차게 백엔드 개발을 해보려고 했는데, 생각보다 첩첩산중인 것을 느꼈습니다.

   CRUD 개발은 기본이며, JPA, ERD 설계, 동시성 처리, AOP… 등등 할게 많았습니다.

   그렇다고 FE 개발이 편하고 좋은 것은 아닙니다.

   오히려 공부할게 많지만, 지금까지 해왔던 프로젝트가 대부분 FE 였어서 비교적 편리하게 진행한 것 같습니다.

</details>
