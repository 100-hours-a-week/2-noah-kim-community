import Button from '../../components/common/Button/Button.js'
import Component from '../../components/common/Component.js'
import Toast from '../../components/common/Toast/Toast.js'
import { validateEmailInput, validatePasswordInput } from '../../lib/validation/inputValidations.js'
import { ROUTES } from '../../public/data/routes.js'
import { navigateTo } from '../../router.js'
import { loginUser } from '../../service/userService.js'
class Login extends Component {
  setup() {
    /** 상태 정의 */
    this.$state = {
      email: '',
      password: '',
    }

    this.loadStyles()
  }
  loadStyles() {
    super.loadStyles('/styles/auth/login.css')
  }

  template() {
    return `
      <main id="main-content">
        <div id="title">로그인</div>
        <form>
          <div class="form-field">
            <label>이메일</label>
            <input
              id="email-input"
              type="email"
              value="${this.$state.email}"
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div class="error-message" id="email-error-message"></div>

          <div class="form-field">
            <label>비밀번호</label>
            <input
              id="password-input"
              type="password"
              value="${this.$state.password}"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <div class="error-message" id="password-error-message"></div>
        </form>

        <button id="login-button"></button>
        <button id="register-button"></button>
      </main>
      `
  }

  mounted() {
    // DOM 요소 저장
    this.$elements = {
      emailInput: this.$target.querySelector('#email-input'),
      emailErrorText: this.$target.querySelector('#email-error-message'),
      passwordInput: this.$target.querySelector('#password-input'),
      passwordErrorText: this.$target.querySelector('#password-error-message'),
      loginButton: this.$target.querySelector('#login-button'),
      registerButton: this.$target.querySelector('#register-button'),
    }

    // 자식 요소 정의
    new Button(this.$elements.loginButton, {
      text: '로그인',
      onClick: this.loginHandler.bind(this),
      idName: 'login-button',
    })

    new Button(this.$elements.registerButton, {
      text: '회원가입',
      onClick: this.navigateToRegister.bind(this),
      idName: 'register-button',
    })
  }

  setEvent() {
    this.addEvent(this.$elements.emailInput, 'input', event => {
      this.setState({ email: event.target.value })
      this.validateEmail()
      this.validateForm()
    })
    this.addEvent(this.$elements.passwordInput, 'input', event => {
      this.setState({ password: event.target.value })
      this.validatePassword()
      this.validateForm()
    })
    this.addEvent(this.$elements.loginButton, 'click', this.loginHandler.bind(this))
    this.addEvent(this.$elements.registerButton, 'click', this.navigateToRegister.bind(this))
  }

  /** 이메일 유효성 검사 */
  validateEmail() {
    return validateEmailInput(this.$elements.emailInput, this.$elements.emailErrorText)
  }

  /** 비밀번호 유효성 검사 */
  validatePassword() {
    return validatePasswordInput(this.$elements.passwordInput, this.$elements.passwordErrorText)
  }

  /** 폼 전체 유효성 검사 */
  validateForm() {
    const loginButton = this.$elements.loginButton

    const isFormValid = this.validateEmail() && this.validatePassword()

    if (!isFormValid) {
      loginButton.style.backgroundColor = '#ACA0EB' // 비활성화 색상 (기본)
      loginButton.disabled = true // 버튼 비활성화
    } else {
      loginButton.style.backgroundColor = '#7F6AEE' // 활성화 색상
      loginButton.disabled = false // 버튼 활성화
    }
  }

  async loginHandler(event) {
    event.preventDefault()

    const body = {
      email: this.$state.email,
      password: this.$state.password,
      nickname: this.$state.nickname,
      imageUrl: this.$state.profileImage,
    }

    const response = await loginUser(body)
    if (response.success) {
      const { message, data } = response.data
      const { userId, accessToken } = data

      localStorage.setItem(
        'auth',
        JSON.stringify({
          userId,
          accessToken,
        }),
      )

      navigateTo(ROUTES.POST.MAIN.url)
    } else {
      new Toast({ message: '회원가입 실패. 다시 시도해주세요.' })
    }
  }

  navigateToRegister() {
    navigateTo(ROUTES.AUTH.REGISTER.url)
  }
}

export default Login
