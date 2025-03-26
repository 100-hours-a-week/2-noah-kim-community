import Login from '../../pages/auth/Login.js'
import Mypage from '../../pages/auth/Mypage.js'
import PasswordChange from '../../pages/auth/PasswordChange.js'
import Register from '../../pages/auth/Register.js'
import PostDetail from '../../pages/post/PostDetail.js'
import PostList from '../../pages/post/PostList.js'
import PostModify from '../../pages/post/PostModify.js'
import PostWrite from '../../pages/post/PostWrite.js'

export const ROUTES = {
  AUTH: {
    LOGIN: { url: '/auth/login', component: Login },
    REGISTER: { url: '/auth/register', component: Register },
    MYPAGE: { url: '/auth/mypage', component: Mypage },
    PASSWORD_CHANGE: {
      url: '/auth/password_change',
      component: PasswordChange,
    },
  },
  POST: {
    MAIN: { url: '/post/main', component: PostList },
    DETAIL: { url: postId => `/post/detail?postId=${postId}`, component: PostDetail },
    MODIFY: { url: '/post/modify', component: PostModify },
    WRITE: { url: '/post/write', component: PostWrite },
  },
}

/**
 * ROUTES 기반으로 routes 생성
 * pathname 기준으로 구성 (query string 제거)
 */
export const RouteComponent = Object.values(ROUTES)
  .flatMap(group => Object.values(group))
  .reduce((acc, route) => {
    const url = typeof route.url === 'function' ? route.url() : route.url

    const pathOnly = typeof route.url === 'function' ? route.url().split('?')[0] : route.url
    acc[pathOnly] = route.component
    return acc
  }, {})
