import Header from './components/common/Header/Header.js'

import { RouteComponent } from './public/data/routes.js'

/** URL에 맞춘 웹페이지 로딩 */
router(window.location.pathname + window.location.search)

export function navigateTo(requestedUrl) {
  // 기존 스타일 제거
  document.querySelectorAll('link[data-dynamic-style]').forEach(style => {
    style.remove()
  })

  history.pushState(null, '', requestedUrl)
  router(requestedUrl)
}

/** 라우팅 함수 (SPA) */
function router(requestedUrl) {
  const $header = document.querySelector('#app-header')
  const $app = document.querySelector('#app')

  // 1. 쿼리 스트링 분리
  const [path, queryString] = requestedUrl.split('?')
  console.log(path, queryString)

  const Component = RouteComponent[path]

  if (Component) {
    // #1. 헤더 컴포넌트 생성
    new Header($header, {
      route: requestedUrl,
    })
    console.log(1)
    // #2. 페이지 컴포넌트 생성
    if (queryString) {
      const params = parseQueryParams(queryString)
      new Component($app, { params })
    } else {
      new Component($app, {})
    }
    console.log(2)
  } else {
    /** 정의되지 않은 컴포넌트(페이지) */
    $app.innerHTML = '<h1>404 - Page Not Found</h1>'
  }
}

window.addEventListener('popstate', event => {
  event.preventDefault()
  navigateTo(window.location.pathname)
})

function parseQueryParams(queryString = '') {
  return queryString ? Object.fromEntries(new URLSearchParams(queryString)) : {}
}
