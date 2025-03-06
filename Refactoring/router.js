import Header from "./components/common/Header/Header.js";
import Login from "./pages/auth/Login.js";
import Mypage from "./pages/auth/Mypage.js";
import PasswordChange from "./pages/auth/PasswordChange.js";
import Register from "./pages/auth/Register.js";
import PostDetail from "./pages/post/PostDetail.js";
import PostList from "./pages/post/PostList.js";
import PostWrite from "./pages/post/PostWrite.js";

export const ROUTES = {
  AUTH: {
    LOGIN: { url: "/auth/login", component: Login },
    REGISTER: { url: "/auth/register", component: Register },
    MYPAGE: { url: "/auth/mypage", component: Mypage },
    PASSWORD_CHANGE: {
      url: "/auth/password_change",
      component: PasswordChange,
    },
  },
  POST: {
    MAIN: { url: "/post/main", component: PostList },
    DETAIL: { url: "/post/detail", component: PostDetail },
    WRITE: { url: "/post/write", component: PostWrite },
  },
};

/** ROUTES 기반으로 routes 생성 */
const routes = Object.values(ROUTES)
  .flatMap((group) => Object.values(group))
  .reduce((acc, { url, component }) => {
    acc[url] = component;
    return acc;
  }, {});

/** URL에 맞춘 웹페이지 로딩 */
router(window.location.pathname);

export function navigateTo(requestedUrl) {
  history.pushState(null, "", requestedUrl);
  router(requestedUrl);
}

/** 라우팅 함수 (SPA-실제 라우팅X) */
function router(requestedUrl) {
  const $header = document.querySelector("#app-header");
  const $app = document.querySelector("#app");

  new Header($header); // 헤더 컴포넌트 생성
  console.log("✅ header component 표시");

  const Component = routes[requestedUrl];

  if (Component) {
    console.log("👍 찾은 컴포넌트 표시");
    new Component($app); // 알맞은 컴포넌트 생성
  } else {
    /** 정의되지 않은 컴포넌트(페이지) */
    $app.innerHTML = "<h1>404 - Page Not Found</h1>";
  }
}

window.addEventListener("popstate", () => {
  navigateTo(window.location.pathname);
});

/** TODO 삭제하기 */
document.addEventListener("click", (e) => {
  console.log(e.target);
});
