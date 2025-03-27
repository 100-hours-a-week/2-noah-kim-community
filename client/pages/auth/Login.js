import Button from '../../components/common/Button/Button.js'
import Component from '../../components/common/Component.js'
import TextInput from '../../components/common/TextInput/TextInput.js'
import Toast from '../../components/common/Toast/Toast.js'
import { validateEmailInputTwo, validatePasswordInputTwo } from '../../lib/validation/inputValidations.js'
import { ROUTES } from '../../public/data/routes.js'
import { navigateTo } from '../../router.js'
import { loginUser } from '../../service/userService.js'
class Login extends Component {
  setup() {
    /** 상태 정의 */
    this.useState('email', '')
    this.useState('password', '')

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
            <input id="email-input" />
          </div>
          <div class="error-message" id="email-error-message"></div>

          <div class="form-field">
            <label>비밀번호</label>
            <input id="password-input" />
          </div>
          <div class="error-message" id="password-error-message"></div>
        </form>

        <button id="login-button"></button>
        <button id="register-button"></button>
      </main>
      `
  }

  mounted() {
    this.useEffect(() => {
      this.validateEmail()
      this.validateForm()
    }, [this.email])

    this.useEffect(() => {
      this.validatePassword()
      this.validateForm()
    }, [this.password])

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
    new TextInput(this.$elements.emailInput, {
      id: 'email-input',
      type: 'text',
      value: this.email,
      placeholder: '이메일을 입력하세요',
      changeHandler: this.setEmail,
      // callback: () => this.validateEmail(),
    })

    new TextInput(this.$elements.passwordInput, {
      id: 'password-input',
      type: 'password',
      value: this.password,
      placeholder: '비밀번호를 입력하세요',
      changeHandler: this.setPassword,
      // callback: () => this.validatePassword(),
    })

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

  /** 이메일 유효성 검사 */
  validateEmail() {
    return validateEmailInputTwo(this.email, this.$elements.emailErrorText)
  }

  /** 비밀번호 유효성 검사 */
  validatePassword() {
    return validatePasswordInputTwo(this.password, this.$elements.passwordErrorText)
  }

  /** 폼 전체 유효성 검사 */
  validateForm() {
    const loginButton = this.$elements.loginButton

    const isFormValid = this.validateEmail() && this.validatePassword()

    loginButton.style.backgroundColor = isFormValid ? '#7F6AEE' : '#ACA0EB'
    loginButton.disabled = !isFormValid
  }

  async loginHandler(event) {
    event.preventDefault()

    const body = {
      email: this.email,
      password: this.password,
      nickname: this.nickname,
      imageUrl: this.profileImage,
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
