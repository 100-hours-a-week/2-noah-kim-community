import Header from "./components/common/Header/Header.js";
import Login from "./pages/auth/Login.js";
import Mypage from "./pages/auth/Mypage.js";
import PasswordChange from "./pages/auth/PasswordChange.js";
import Register from "./pages/auth/Register.js";
import PostDetail from "./pages/post/PostDetail.js";
import PostList from "./pages/post/PostList.js";
import PostWrite from "./pages/post/PostWrite.js";

const $app = document.querySelector("#app");
const header = new Header($app);
$app.innerHTML = `
  ${header.template()}  <!-- 헤더는 고정 -->
  <main id="main-content"></main>  <!-- 동적으로 변경되는 컨텐츠 -->
`;

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

/** ✅ ROUTES 기반으로 routes 자동 생성 */
const routes = Object.values(ROUTES)
  .flatMap((group) => Object.values(group))
  .reduce((acc, { url, component }) => {
    acc[url] = component;
    return acc;
  }, {});

/** 초기 웹페이지 로딩 */
navigateTo(ROUTES.POST.MAIN.url);

export function navigateTo(requestedUrl) {
  history.pushState(null, "", requestedUrl);
  router(requestedUrl);
}

/** 라우팅 함수 (SPA-실제 라우팅X) */
function router(requestedUrl) {
  const main = document.querySelector("#main-content");

  const Component = routes[requestedUrl];

  if (Component) {
    const pageInstance = new Component(main);
    main.innerHTML = pageInstance.template();
  } else {
    /** 정의되지 않은 컴포넌트(페이지) */
    /** TODO: 404 페이지 제작하기 */
    main.innerHTML = "<h1>404 - Page Not Found</h1>";
  }
}

window.addEventListener("popstate", () => {
  navigateTo(window.location.pathname);
});
