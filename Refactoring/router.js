import PostList from "./pages/post/PostList.js";

const $app = document.querySelector("#app");

const routes = {
  "/auth/login": "Login", // 로그인
  "/auth/register": "Register", // 회원가입
  "/auth/update-profile": "UpdateProfile", // 회원정보 수정
  "/auth/update-password": "UpdatePassword", // 비밀번호 수정

  "/post/create": "PostDetail", // 게시글 상세 추가
  "/post/list": PostList, // 게시글 목록 조회
  "/post/detail": "PostDetail", // 게시글 상세 조회
  "/post/update": "PostDetail", // 게시글 상세 수정
};

/** 초기 웹페이지 로딩 */
router("/post/list");

export const navigateTo = (requestedUrl) => {
  history.pushState(null, null, requestedUrl);
  router(requestedUrl);
};

/** 라우팅 함수 (SPA-실제 라우팅X) */
function router(requestedUrl) {
  const app = document.querySelector("#app");

  const Component = routes[requestedUrl];

  if (Component) {
    app.innerHTML = new Component(app).template();
  } else {
    /** 정의되지 않은 컴포넌트(페이지) */
    /** TODO: 404 페이지 제작하기 */
    app.innerHTML = "<h1>404 - Page Not Found</h1>";
  }
}

window.addEventListener("popstate", () => {
  navigateTo(window.location.pathname);
});
