import Header from './components/common/Header/Header.js'

import { RouteComponent } from './public/data/routes.js'

/** URL에 맞춘 웹페이지 로딩 */
router(window.location.pathname)

export function navigateTo(requestedUrl) {
  // 기존 스타일 제거
  document.querySelectorAll('link[data-dynamic-style]').forEach(style => {
    style.remove()
  })

  history.pushState(null, '', requestedUrl)
  router(requestedUrl)
}

/** 라우팅 함수 (SPA-실제 라우팅X) */
function router(requestedUrl) {
  const $header = document.querySelector('#app-header')
  const $app = document.querySelector('#app')

  const Component = RouteComponent[requestedUrl]

  if (Component) {
    new Header($header, {
      route: requestedUrl,
    }) // 헤더 컴포넌트 생성
    console.log('👍 찾은 컴포넌트 표시')
    new Component($app) // 알맞은 컴포넌트 생성
  } else {
    /** 정의되지 않은 컴포넌트(페이지) */
    $app.innerHTML = '<h1>404 - Page Not Found</h1>'
  }
}

window.addEventListener('popstate', () => {
  navigateTo(window.location.pathname)
})

/** TODO 삭제하기 */
document.addEventListener('click', e => {
  console.log(e.target)
})
