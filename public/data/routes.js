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
    DETAIL: { url: '/post/detail', component: PostDetail },
    MODIFY: { url: '/post/modify', component: PostModify },
    WRITE: { url: '/post/write', component: PostWrite },
  },
}

/** ROUTES 기반으로 routes 생성 */
export const RouteComponent = Object.values(ROUTES)
  .flatMap(group => Object.values(group))
  .reduce((acc, { url, component }) => {
    acc[url] = component
    return acc
  }, {})
