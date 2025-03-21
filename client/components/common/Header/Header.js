import { ROUTES } from '../../../public/data/routes.js'
import { navigateTo } from '../../../router.js'
import Component from '../Component.js'

// 기본적으로 뒤로 갈 경로를 정의하는 규칙
const BACK_ROUTE_MAP = {
  REGISTER: 'LOGIN', // 회원가입 → 로그인
  DETAIL: 'MAIN', // 게시글 상세 → 게시글 목록
  MODIFY: 'DETAIL', // 게시글 수정 → 게시글 상세,
  WRITE: 'MAIN', // 게시글 작성 → 게시글 상세,
}

// BACK_ROUTE 자동 생성 함수
const generateBackRoutes = routes => {
  const backRoutes = {}

  Object.keys(routes).forEach(category => {
    Object.keys(routes[category]).forEach(key => {
      if (BACK_ROUTE_MAP[key]) {
        backRoutes[routes[category][key].url] = routes[category][BACK_ROUTE_MAP[key]].url
      }
    })
  })

  return backRoutes
}

export const BACK_ROUTE = generateBackRoutes(ROUTES)

class Header extends Component {
  setup() {
    this.$state = {
      backRoute: BACK_ROUTE[this.$props.route],
    }

    this.loadStyles()
  }
  loadStyles() {
    super.loadStyles('/components/common/Header/Header.css')
  }

  template() {
    const backButton = this.$state.backRoute ? `<div id="back-button">&lt;</div>` : ''

    return `
      ${backButton}
      <span>아무 말 대잔치</span>
      <div id="image-container">
        <img src="/public/images/header_image.jpeg" alt="user-card-image" id="header-image"/>
        <div id="dropdown-menu">
          <ul>
            <li id="mypage-link">회원정보수정</li>
            <li id="password-change-link">비밀번호수정</li>
            <li id="logout-link">로그아웃</li>
          </ul>
        </div>
      </div>
    `
  }

  mounted() {
    // DOM 요소 저장
    this.$elements = {
      ImageContainer: this.$target.querySelector('#image-container'),
      Image: this.$target.querySelector('#header-image'),
      DropdownMenu: this.$target.querySelector('#dropdown-menu'),
      mypageLink: this.$target.querySelector('#mypage-link'),
      passwordChangeLink: this.$target.querySelector('#password-change-link'),
      logoutLink: this.$target.querySelector('#logout-link'),
    }
    if (this.$state.backRoute) {
      this.$elements = {
        ...this.$elements,
        backButton: this.$target.querySelector('#back-button'),
      }
    }
  }

  setEvent() {
    /** 프로필 이미지 클릭 이벤트  */
    this.addEvent(this.$elements.Image, 'click', this.toggleDropdownMenu.bind(this))

    // TODO: 외부 클릭 시 메뉴 닫기
    // DropdownMenu.addEventListener("click", outsideClick);
    // this.addEvent( "#dropdown-menu", "click",outsideClick);

    this.addEvent(this.$elements.mypageLink, 'click', event => {
      navigateTo(ROUTES.AUTH.MYPAGE.url)
    })
    this.addEvent(this.$elements.passwordChangeLink, 'click', event => {
      navigateTo(ROUTES.AUTH.PASSWORD_CHANGE.url)
    })

    // TODO: 로그아웃 로직 이벤트 구현
    this.addEvent(this.$elements.logoutLink, 'click', event => {
      alert('로그아웃 성공')

      // navigateTo(ROUTES.AUTH.PASSWORD_CHANGE.url);
    })

    if (this.$state.backRoute) {
      this.addEvent(this.$elements.backButton, 'click', event => {
        navigateTo(this.$state.backRoute)
      })
    }
  }

  toggleDropdownMenu(event) {
    const DropdownMenu = this.$elements.DropdownMenu
    // event.stopPropagation(); // 클릭 이벤트 전파 방지
    DropdownMenu.style.display = DropdownMenu.style.display !== 'block' ? 'block' : 'none'
  }

  outsideClick(event) {
    const DropdownMenu = this.$elements.DropdownMenu
    if (!DropdownMenu.contains(event.target) && !event.target.closest('#header-image')) {
      DropdownMenu.style.display = 'none'
    }
  }
}

export default Header
