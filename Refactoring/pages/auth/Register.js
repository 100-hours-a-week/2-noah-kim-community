import Component from '../../components/common/Component.js'
import { navigateTo, ROUTES } from '../../router.js'
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

          <button id="register-button">회원가입</button>
        </form>

        <button id="login-button">로그인하러 가기</button>
      </main>
    `
  }

  mounted() {
    // DOM 요소 저장
    this.$elements = {
      registerForm: this.$target.querySelector('#register-form'),

      // 인풋 요소
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

      // 이미지 입력 관련 요소
      profileInput: this.$target.querySelector('#profile-val'),
      profilePreview: this.$target.querySelector('#profile-preview'),
      profileImage: this.$target.querySelector('#profile-image'),
      profilePlaceholder: this.$target.querySelector('#profile-placeholder'),

      // 버튼 요소
      backButton: this.$target.querySelector('#back-button'),
      registerButton: this.$target.querySelector('#register-button'),
      loginButton: this.$target.querySelector('#login-button'),
    }
  }

  setEvent() {
    // 입력 이벤트
    this.addEvent('input', this.$elements.emailInput, event => {
      this.validateEmail()
      this.updateButtonState()
    })
    this.addEvent('input', this.$elements.passwordInput, event => {
      this.validatePassword()
      this.updateButtonState()
    })
    this.addEvent('input', this.$elements.passwordConfirmInput, event => {
      this.validatePasswordConfirm()
      this.updateButtonState()
    })
    this.addEvent('input', this.$elements.nicknameInput, event => {
      this.validateNickname()
      this.updateButtonState()
    })
    this.addEvent('change', this.$elements.profileInput, event => {
      this.validateProfile()
      this.updateButtonState()
    })
    this.addEvent('change', this.$elements.profileInput, this.onProfileChangeHandler.bind(this))

    this.addEvent('click', this.$elements.profilePreview, this.getProfileImage.bind(this))

    // 클릭 이벤트
    this.addEvent('click', this.$elements.backButton, this.backRouteHandler.bind(this))
    this.addEvent('click', this.$elements.registerButton, this.registerRouteHandler.bind(this))
    this.addEvent('click', this.$elements.loginButton, this.loginRouteHandler.bind(this))
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

  validateEmail() {
    const emailInput = this.$elements.emailInput
    const emailErrorText = this.$elements.emailErrorText

    const email = emailInput.value.trim()
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    // 유효성 검사
    let isValid = true
    let errorText = ''
    if (!email) {
      errorText = '* 이메일을 입력해주세요.'
      isValid = false
    } else if (!emailRegex.test(email)) {
      errorText = '* 올바른 이메일 주소 형식을 입력해주세요.'
      isValid = false
    }
    // // 중복 이메일 검사
    // else if (existingEmails.includes(email)) {
    //   errorText = "* 중복된 이메일입니다.";
    // }

    // UI 업데이트
    if (!isValid) {
      emailErrorText.style.visibility = 'visible'
      emailErrorText.textContent = errorText
    } else {
      emailErrorText.style.visibility = 'hidden'
    }
    return isValid
  }

  validatePassword() {
    const password = this.$elements.passwordInput
    const passwordErrorText = this.$elements.passwordErrorText

    // 유효성 검사
    let isValid = true
    let errorText = ''
    if (!password.value) {
      errorText = '* 비밀번호를 입력해주세요.'
      isValid = false
    }

    // UI 업데이트
    if (!isValid) {
      passwordErrorText.style.visibility = 'visible'
      passwordErrorText.textContent = errorText
    } else {
      passwordErrorText.style.visibility = 'hidden'
    }
    return isValid
  }

  validatePasswordConfirm() {
    const password = this.$elements.passwordInput
    const passwordConfirm = this.$elements.passwordConfirmInput
    const passwordConfirmErrorText = this.$elements.passwordConfirmErrorText

    // 유효성 검사
    let isValid = true
    let errorText = ''
    if (!passwordConfirm.value) {
      errorText = '* 비밀번호를 한번더 입력해주세요.'
      isValid = false
    } else if (passwordConfirm.value !== password.value) {
      errorText = '* 비밀번호가 다릅니다.'
    }

    // UI 업데이트
    if (!isValid) {
      passwordConfirmErrorText.style.visibility = 'visible'
      passwordConfirmErrorText.textContent = errorText
    } else {
      passwordConfirmErrorText.style.visibility = 'hidden'
    }
    return isValid
  }

  validateNickname() {
    const nickname = this.$elements.nicknameInput
    const nicknameErrorText = this.$elements.nicknameErrorText

    // 유효성 검사
    let isValid = true
    let errorText = ''
    if (!nickname.value) {
      errorText = '* 닉네임을 입력해주세요.'
      isValid = false
    } else if (nickname.value.includes(' ')) {
      errorText = '* 띄어쓰기를 없애주세요.'
      isValid = false
    } else if (nickname.value.length > 10) {
      errorText = '* 닉네임은 최대 10자까지 작성 가능합니다.'
      isValid = false
    }

    // UI 업데이트
    if (!isValid) {
      nicknameErrorText.style.visibility = 'visible'
      nicknameErrorText.textContent = errorText
    } else {
      nicknameErrorText.style.visibility = 'hidden'
    }
    return isValid
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

  // 이미지가 입력받아지면 수행할 일
  onProfileChangeHandler() {
    const profileInput = this.$elements.profileInput
    const profileImage = this.$elements.profileImage
    const profilePlaceholder = this.$elements.profilePlaceholder

    // 2. 새로운 이미지 받기
    if (profileInput.files && profileInput.files[0]) {
      const reader = new FileReader()
      reader.onload = function (e) {
        profileImage.src = e.target.result
        profileImage.style.display = 'block'
        profilePlaceholder.style.display = 'none'
      }
      reader.readAsDataURL(profileInput.files[0])
    }
  }

  updateButtonState() {
    const registerBtn = this.$elements.registerBtn

    const isFormValid =
      this.validateEmail() && this.validatePassword() && this.validatePasswordConfirm() && this.validateNickname() && this.validateProfile()

    if (isFormValid) {
      registerBtn.style.backgroundColor = '#7F6AEE' // 활성화 색상
      registerBtn.disabled = false // 버튼 활성화
    } else {
      registerBtn.style.backgroundColor = '#ccc' // 비활성화 색상 (기본)
      registerBtn.disabled = true // 버튼 비활성화
    }
  }

  /** TODO: 히스토리 뒤로가기 */
  backRouteHandler() {
    // window.location.href = URL.POST.MAIN.url; // 메인 페이지로 이동
    // navigateTo(ROUTES)
  }

  loginRouteHandler() {
    navigateTo(ROUTES.AUTH.LOGIN.url)
  }

  /** TODO: 회원가입 로직 구현 필요 */
  registerRouteHandler() {
    navigateTo(ROUTES.POST.MAIN.url)
    // setTimeout(() => {
    //   navigateTo(ROUTES.POST.MAIN.url);
    // }, 3000);

    // if (registerBtn.disabled === false) {
    //   setTimeout(() => {
    //     window.location.href = `/pages/auth/login/index.html`; // 메인 페이지로 이동
    //   }, 3000);
    // } else {
    //   console.log("error");
    // }
  }
}

export default Register
