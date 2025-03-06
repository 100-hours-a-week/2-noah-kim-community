import Component from '../../components/common/Component.js'
import { navigateTo, ROUTES } from '../../router.js'
class Login extends Component {
  setup() {
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
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div class="error-message" id="email-error-message"></div>

          <div class="form-field">
            <label>비밀번호</label>
            <input
              id="password-input"
              type="password"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <div class="error-message" id="password-error-message"></div>
        </form>

        <button id="login-button">로그인</button>
        <button id="register-button">회원가입</button>
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
      unregisterButton: this.$target.querySelector('#register-button'),
    }
  }

  setEvent() {
    this.addEvent('input', this.$elements.emailInput, this.validateEmail.bind(this))
    this.addEvent('input', this.$elements.passwordInput, this.validatePassword.bind(this))
    this.addEvent('click', this.$elements.loginButton, this.loginRoute.bind(this))
    this.addEvent('click', this.$elements.unregisterButton, this.registerRoute.bind(this))
  }

  validateEmail() {
    const email = this.$elements.emailInput.value.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    let isValid = true
    if (!email || !emailRegex.test(email)) {
      this.$elements.emailErrorText.textContent = '* 올바른 이메일 주소 형식을 입력해주세요.'
      isValid = false
    }

    // 유효성 검사에 따른 에러 메세지 여부 결정표시
    if (!isValid) {
      this.$elements.emailErrorText.style.display = 'block'
    } else {
      this.$elements.emailErrorText.style.display = 'none'
    }

    return isValid
  }

  validatePassword() {
    const password = this.$elements.passwordInput.value
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/

    let isValid = true
    let errorText = ''
    if (!password) {
      errorText = '* 비밀번호를 입력해주세요.'
      isValid = false
    } else if (!passwordRegex.test(password)) {
      errorText = '* 8자 이상, 20자 이하, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.'
      isValid = false
    }

    if (!isValid) {
      this.$elements.passwordErrorText.style.display = 'block'
      this.$elements.passwordErrorText.textContent = errorText
    } else {
      this.$elements.passwordErrorText.style.display = 'none'
    }

    return isValid
  }

  // TODO: 로그인 로직 추가 필요 (현재는 무조건 로그인됨)
  loginRoute() {
    if (this.validateEmail() && this.validatePassword()) {
      this.$elements.loginButton.style.backgroundColor = '#7F6AEE'

      navigateTo(ROUTES.POST.MAIN.url)
    }
  }

  registerRoute() {
    navigateTo(ROUTES.AUTH.REGISTER.url)
  }
}

export default Login
