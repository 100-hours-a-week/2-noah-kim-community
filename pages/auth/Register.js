import Button from '../../components/common/Button/Button.js'
import Component from '../../components/common/Component.js'
import {
  validateEmailInput,
  validateNicknameInput,
  validatePasswordConfirmInput,
  validatePasswordInput,
} from '../../lib/validation/inputValidations.js'
import { ROUTES } from '../../public/data/routes.js'
import { navigateTo } from '../../router.js'
class Register extends Component {
  setup() {
    this.loadStyles()
  }
  loadStyles() {
    super.loadStyles('/styles/auth/register.css')
  }

  template() {
    return `
      <main id="main-content">
        <div id="title">회원가입</div>

        <form id="register-form">
          <!-- 프로필 사진 업로드 -->
          <div class="form-field" id="profile">
            <label>프로필 사진</label>
            <div class="error-message" id="profile-error">* helper text</div>

            <input type="file" id="profile-val" accept="image/*" hidden />
            <div id="profile-preview">
              <img id="profile-image" src="" alt="프로필 이미지" />
              <span id="profile-placeholder">+</span>
            </div>
          </div>

          <!-- 이메일 -->
          <div class="form-field" id="email">
            <label for="email">이메일*</label>
            <input
              type="email"
              id="email-val"
              placeholder="이메일을 입력하세요"
            />
            <div class="error-message" id="email-error">* helper text</div>
          </div>

          <!-- 비밀번호 -->
          <div class="form-field" id="password">
            <label for="password">비밀번호*</label>
            <input
              type="password"
              id="password-val"
              placeholder="비밀번호를 입력하세요"
            />
            <div class="error-message" id="password-error">* helper text</div>
          </div>

          <!-- 비밀번호 확인 -->
          <div class="form-field" id="password-confirm">
            <label for="password-confirm">비밀번호 확인*</label>
            <input
              type="password"
              id="password-confirm-val"
              placeholder="비밀번호를 한번 더 입력하세요"
            />
            <div class="error-message" id="password-confirm-error">
              * helper text
            </div>
          </div>

          <!-- 닉네임 -->
          <div class="form-field" id="nickname">
            <label for="nickname">닉네임*</label>
            <input
              type="text"
              id="nickname-val"
              placeholder="닉네임을 입력하세요"
            />
            <div class="error-message" id="nickname-error">* helper text</div>
          </div>

          <button id="register-button"></button>
        </form>

        <button id="login-button"></button>
      </main>
    `
  }

  mounted() {
    // DOM 요소 저장
    this.$elements = {
      // 인풋 요소
      // 이미지 입력 관련 요소
      profileInput: this.$target.querySelector('#profile-val'),
      profilePreview: this.$target.querySelector('#profile-preview'),
      profileImage: this.$target.querySelector('#profile-image'),
      profilePlaceholder: this.$target.querySelector('#profile-placeholder'),

      emailInput: this.$target.querySelector('#email-val'),
      passwordInput: this.$target.querySelector('#password-val'),
      passwordConfirmInput: this.$target.querySelector('#password-confirm-val'),
      nicknameInput: this.$target.querySelector('#nickname-val'),

      // 에러 메세지 요소
      profileErrorText: this.$target.querySelector('#profile-error'),
      emailErrorText: this.$target.querySelector('#email-error'),
      passwordErrorText: this.$target.querySelector('#password-error'),
      passwordConfirmErrorText: this.$target.querySelector('#password-confirm-error'),
      nicknameErrorText: this.$target.querySelector('#nickname-error'),

      // 버튼 요소
      registerButton: this.$target.querySelector('#register-button'),
      loginButton: this.$target.querySelector('#login-button'),
    }

    // 자식 요소 정의
    new Button(this.$elements.registerButton, {
      text: '회원가입',
      onClick: this.registerHandler.bind(this),
      idName: 'register-button',
    })
    new Button(this.$elements.loginButton, {
      text: '로그인하러 가기',
      onClick: this.navigateToLoginRoute.bind(this),
      idName: 'login-button',
    })
  }

  setEvent() {
    this.addEvent(this.$elements.profileInput, 'input', event => {
      this.validateProfile()
      this.validateForm()
    })
    this.addEvent(this.$elements.profileInput, 'change', this.profileChangeHandler.bind(this))

    this.addEvent(this.$elements.profilePreview, 'click', this.getProfileImage.bind(this))
    // 입력 이벤트
    this.addEvent(this.$elements.emailInput, 'input', event => {
      this.validateEmail()
      this.validateForm()
    })
    this.addEvent(this.$elements.passwordInput, 'input', event => {
      this.validatePassword()
      this.validateForm()
    })
    this.addEvent(this.$elements.passwordConfirmInput, 'input', event => {
      this.validatePasswordConfirm()
      this.validateForm()
    })
    this.addEvent(this.$elements.nicknameInput, 'input', event => {
      this.validateNickname()
      this.validateForm()
    })
  }

  // 이미지가 입력받아지면 수행할 일
  profileChangeHandler() {
    const profileInput = this.$elements.profileInput
    const profileImage = this.$elements.profileImage
    const profilePlaceholder = this.$elements.profilePlaceholder

    // 2. 새로운 이미지 받기
    if (profileInput.files && profileInput.files[0]) {
      const reader = new FileReader()
      reader.onload = function (e) {
        profileImage.src = e.target?.result
        profileImage.style.display = 'block'
        profilePlaceholder.style.display = 'none'
      }
      reader.readAsDataURL(profileInput.files[0])
    }
  }

  getProfileImage() {
    const profileInput = this.$elements.profileInput
    const profileImage = this.$elements.profileImage
    const profilePlaceholder = this.$elements.profilePlaceholder
    // 1. 새로운 이미지 입력 받기
    profileInput?.click()

    // 2. 기존 이미지 있다면 삭제
    if (profileImage.style.display === 'block') {
      profileInput.value = ''
      profileImage.style.display = 'none'
      profilePlaceholder.style.display = 'block'
    }
    this.validateProfile()
  }

  validateProfile() {
    const profileInput = this.$elements.profileInput
    const profileErrorText = this.$elements.profileErrorText

    // 유효성 검사
    let isValid = true
    let errorText = ''
    if (!profileInput.files || profileInput.files.length === 0) {
      errorText = '* 프로필 사진을 추가해주세요.'
      isValid = false
    }

    // UI 업데이트
    if (!isValid) {
      profileErrorText.style.visibility = 'visible'
      profileErrorText.textContent = errorText
    } else {
      profileErrorText.style.visibility = 'hidden'
    }

    return isValid
  }

  // TODO: 중복 이메일 검사 (회원가입)
  /** 이메일 유효성 검사 + 중복 이메일 검사 */
  validateEmail() {
    return validateEmailInput(this.$elements.emailInput, this.$elements.emailErrorText)
  }

  /** 비밀번호 유효성 검사 */
  validatePassword() {
    return validatePasswordInput(this.$elements.passwordInput, this.$elements.passwordErrorText)
  }

  /** 비밀번호 확인 유효성 검사 */
  validatePasswordConfirm() {
    return validatePasswordConfirmInput(
      this.$elements.passwordInput,
      this.$elements.passwordConfirmInput,
      this.$elements.passwordConfirmErrorText,
    )
  }

  /** 닉네임 유효성 검사 */
  validateNickname() {
    return validateNicknameInput(this.$elements.nicknameInput, this.$elements.nicknameErrorText)
  }

  /** 폼 전체 유효성 검사 */
  validateForm() {
    const registerButton = this.$elements.registerButton

    const isFormValid =
      this.validateEmail() && this.validatePassword() && this.validatePasswordConfirm() && this.validateNickname() && this.validateProfile()

    if (!isFormValid) {
      registerButton.style.backgroundColor = '#ACA0EB' // 비활성화 색상 (기본)
      registerButton.disabled = true // 버튼 비활성화
    } else {
      registerButton.style.backgroundColor = '#7F6AEE' // 활성화 색상
      registerButton.disabled = false // 버튼 활성화
    }
  }

  navigateToLoginRoute() {
    navigateTo(ROUTES.AUTH.LOGIN.url)
  }

  /** TODO: 회원가입 로직 구현 필요 */
  registerHandler() {
    navigateTo(ROUTES.AUTH.LOGIN.url)
  }
}

export default Register
