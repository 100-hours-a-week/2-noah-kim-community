import { getAuthData, removeAuthData } from '../../../lib/utils/auth.js'
import { ROUTES } from '../../../public/data/routes.js'
import { navigateTo } from '../../../router.js'
import { getUser } from '../../../service/userService.js'
import Component from '../Component.js'
import Toast from '../Toast/Toast.js'

// 뒤로 갈 경로
const BACK_ROUTE_MAP = {
  REGISTER: 'LOGIN',
  DETAIL: 'MAIN',
  MODIFY: 'DETAIL',
  WRITE: 'MAIN',
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
    this.backRoute = BACK_ROUTE[this.$props.route]

    this.useState('userData', {
      userId: null,
      imageUrl: null,
      email: null,
      nickname: null,
    })

    const authData = getAuthData()
    this.useState('isLogin', authData ? true : false)
    if (authData) this.fetchUserData()

    this.loadStyles()
  }
  loadStyles() {
    super.loadStyles('/components/common/Header/Header.css')
  }

  template() {
    const backButton = this.backRoute ? `<div id="back-button">&lt;</div>` : ''

    return `
      ${backButton}
      <span id="title-text">아무 말 대잔치</span>
      ${
        this.isLogin
          ? `
        <div id="image-container">
          <img src="${this.userData.imageUrl ?? ''}" alt="user-card-image" id="header-image"/>
          <div id="dropdown-menu">
            <ul>
              <li id="mypage-link">회원정보수정</li>
              <li id="password-change-link">비밀번호수정</li>
              <li id="auth-link">로그아웃</li>
            </ul>
          </div>
        </div>
      `
          : ''
      }
    `
  }

  mounted() {
    // DOM 요소 저장
    this.$elements = {
      titleText: this.$target.querySelector('#title-text'),
    }

    if (this.isLogin) {
      this.$elements = {
        ...this.$elements,
        image: this.$target.querySelector('#header-image'),
        dropdownMenu: this.$target.querySelector('#dropdown-menu'),
        mypageLink: this.$target.querySelector('#mypage-link'),
        passwordChangeLink: this.$target.querySelector('#password-change-link'),

        authLink: this.$target.querySelector('#auth-link'),
      }
    }

    if (this.backRoute) {
      this.$elements = {
        ...this.$elements,
        backButton: this.$target.querySelector('#back-button'),
      }
    }
  }

  setEvent() {
    /** 글자 클릭시 메인으로 이동 */
    this.addEvent(this.$elements.titleText, 'click', event => {
      navigateTo(ROUTES.POST.MAIN.url)
    })
    /** 프로필 이미지 클릭 이벤트  */
    if (this.isLogin) {
      this.addEvent(this.$elements.image, 'click', this.toggleDropdownMenu.bind(this))

      this.addEvent(this.$elements.mypageLink, 'click', event => {
        navigateTo(ROUTES.AUTH.MYPAGE.url)
      })
      this.addEvent(this.$elements.passwordChangeLink, 'click', event => {
        navigateTo(ROUTES.AUTH.PASSWORD_CHANGE.url)
      })

      this.addEvent(this.$elements.authLink, 'click', event => {
        const authData = getAuthData()
        // 로그아웃
        if (authData) {
          removeAuthData()
          navigateTo(ROUTES.AUTH.LOGIN.url)
        }
        // 로그인
        else {
          navigateTo(ROUTES.AUTH.LOGIN.url)
        }
      })
    }

    // TODO: 외부 클릭 시 메뉴 닫기
    // DropdownMenu.addEventListener("click", outsideClick);
    // this.addEvent( "#dropdown-menu", "click",outsideClick);

    if (this.backRoute) {
      this.addEvent(this.$elements.backButton, 'click', event => {
        navigateTo(this.backRoute)
      })
    }
  }

  toggleDropdownMenu(event) {
    const DropdownMenu = this.$elements.dropdownMenu
    // event.stopPropagation(); // 클릭 이벤트 전파 방지
    DropdownMenu.style.display = DropdownMenu.style.display !== 'block' ? 'block' : 'none'
  }

  outsideClick(event) {
    const DropdownMenu = this.$elements.dropdownMenu
    if (!DropdownMenu.contains(event.target) && !event.target.closest('#header-image')) {
      DropdownMenu.style.display = 'none'
    }
  }

  /** 유저 정보 가져오기 */
  async fetchUserData() {
    const response = await getUser()
    if (response.success) {
      const { message, data } = response.data
      const { userId, email, nickname, imageUrl } = data

      this.setUserData({
        userId,
        imageUrl,
        email,
        nickname,
      })
      this.setIsLogin(true)
    } else {
      new Toast({ message: '유저 정보 가져오기에 실패하였습니다.' })
    }
  }
}

export default Header
