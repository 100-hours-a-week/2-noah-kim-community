## 프로젝트 설명

바닐라 자바스크립트를 이용하여 커뮤니티 서비스를 제작하는 개인 프로젝트입니다. <br />
바닐라 자바스크립트로 SPA (Single Page Application) 아키텍쳐를 사용하여 구현되었으며, 서버와 데이터베이스 추가 설정부터 리액트로의 마이그레이션까지 진행될 프로젝트입니다.

### 프로젝트 중요 개념

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



1. `Component.js`
2. `InlineComponent.js`


### 프로젝트 구조
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

### 회고

- SPA 회고 (바닐라 자바스크립트)
  <details>
  <summary>📌 클릭해서 열기</summary>
