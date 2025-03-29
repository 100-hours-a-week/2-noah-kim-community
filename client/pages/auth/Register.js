import Button from '../../components/common/Button/Button.js'
import Component from '../../components/common/Component.js'
import TextInput from '../../components/common/TextInput/TextInput.js'
import Toast from '../../components/common/Toast/Toast.js'
import {
  validateEmailInput,
  validateNicknameInput,
  validatePasswordConfirmInput,
  validatePasswordInput,
} from '../../lib/validation/inputValidations.js'
import { ROUTES } from '../../public/data/routes.js'
import { navigateTo } from '../../router.js'
import { registerUser } from '../../service/userService.js'
import { deleteS3Image, uploadS3Image } from '../../service/utilService.js'

class Register extends Component {
  setup() {
    /** 상태 정의 */
    this.useState('email', '')
    this.useState('password', '')
    this.useState('passwordConfirm', '')
    this.useState('nickname', '')
    this.useState('imageUrl', '')

    /** 스타일 로드 */
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
            <label for="profile-val">프로필 사진</label>
            <div class="error-message" id="profile-error">* helper text</div>

            <input
              type="file"
              id="profile-val"
              accept="image/*"
              hidden 
            />
            <div id="profile-preview">
              <img id="profile-image" src="${this.imageUrl}" alt="프로필 이미지" />
              <span id="profile-placeholder">+</span>
            </div>
          </div>

          <!-- 이메일 -->
          <div class="form-field" id="email">
            <label for="email-val">이메일*</label>
            <input id="email-val" />
            <div class="error-message" id="email-error">* helper text</div>
          </div>

          <!-- 비밀번호 -->
          <div class="form-field" id="password">
            <label for="password-val">비밀번호*</label>
            <input id="password-val" />
            <div class="error-message" id="password-error">* helper text</div>
          </div>

          <!-- 비밀번호 확인 -->
          <div class="form-field" id="password-confirm">
            <label for="password-confirm-val">비밀번호 확인*</label>
            <input id="password-confirm-val" />
            <div class="error-message" id="password-confirm-error">
              * helper text
            </div>
          </div>

          <!-- 닉네임 -->
          <div class="form-field" id="nickname">
            <label for="nickname-val">닉네임*</label>
            <input id="nickname-val" />
            <div class="error-message" id="nickname-error">* helper text</div>
          </div>

          <button id="register-button"></button>
        </form>

        <button id="login-button"></button>
      </main>
    `
  }

  mounted() {
    this.useEffect(() => {
      this.validateEmail()
    }, [this.email])

    this.useEffect(() => {
      this.validatePassword()
    }, [this.password])

    this.useEffect(() => {
      this.validatePasswordConfirm()
    }, [this.passwordConfirm])

    this.useEffect(() => {
      this.validateNickname()
    }, [this.nickname])

    this.useEffect(() => {
      this.validateForm()
    }, [this.imageUrl, this.email, this.password, this.passwordConfirm, this.nickname])

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
    new TextInput(this.$elements.emailInput, {
      id: 'email-val',
      type: 'text',
      value: this.email,
      placeholder: '이메일을 입력하세요',
      changeHandler: this.setEmail,
    })

    new TextInput(this.$elements.passwordInput, {
      id: 'password-val',
      type: 'password',
      value: this.password,
      placeholder: '비밀번호를 입력하세요',
      changeHandler: this.setPassword,
    })
    new TextInput(this.$elements.passwordConfirmInput, {
      id: 'password-confirm-val',
      type: 'password',
      value: this.passwordConfirm,
      placeholder: '비밀번호를 한번 더 입력하세요',
      changeHandler: this.setPasswordConfirm,
    })

    new TextInput(this.$elements.nicknameInput, {
      id: 'nickname-val',
      type: 'text',
      value: this.nickname,
      placeholder: '닉네임을 입력하세요',
      changeHandler: this.setNickname,
    })

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

    const profileInput = this.$elements.profileInput
    const profileImage = this.$elements.profileImage
    const profilePlaceholder = this.$elements.profilePlaceholder

    this.useEffect(() => {
      this.validateProfile()
      // 있는 경우
      if (this.imageUrl) {
        profileImage.src = this.imageUrl
        profileImage.style.display = 'block'
        profilePlaceholder.style.display = 'none'
      }
      // 없는 경우
      else {
      }
    }, [this.imageUrl])
  }

  setEvent() {
    // this.addEvent(this.$elements.profileInput, 'input', event => {
    //   this.setImageUrl(event.target.files[0])
    // })
    this.addEvent(this.$elements.profileInput, 'change', this.profileChangeHandler.bind(this))

    this.addEvent(this.$elements.profilePreview, 'click', this.getProfileImage.bind(this))
  }

  // 이미지가 입력받아지면 수행할 일
  profileChangeHandler(event) {
    const profileInput = this.$elements.profileInput
    const profileImage = this.$elements.profileImage
    const profilePlaceholder = this.$elements.profilePlaceholder

    const fileInput = event.target.files[0]
    // 0. 기존 이미지 삭제 및 새로운 이미지 업로드
    if (this.imageUrl) {
      this.deleteImageHandler(this.imageUrl)
    }
    this.uploadImageHandler(fileInput)

    // 1. 새로운 이미지 표시
    if (fileInput) {
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
    if (!this.imageUrl) {
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
    return validateEmailInput(this.email, this.$elements.emailErrorText)
  }

  /** 비밀번호 유효성 검사 */
  validatePassword() {
    return validatePasswordInput(this.password, this.$elements.passwordErrorText)
  }

  /** 비밀번호 확인 유효성 검사 */
  validatePasswordConfirm() {
    return validatePasswordConfirmInput(this.password, this.passwordConfirm, this.$elements.passwordConfirmErrorText)
  }

  /** 닉네임 유효성 검사 */
  validateNickname() {
    return validateNicknameInput(this.nickname, this.$elements.nicknameErrorText)
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

  async registerHandler(event) {
    event.preventDefault()
    const isFormValid =
      this.validateEmail() && this.validatePassword() && this.validatePasswordConfirm() && this.validateNickname() && this.validateProfile()

    if (!isFormValid) {
      new Toast({ message: '정보를 알맞게 모두 입력해주세요' })
      return
    }

    const body = {
      email: this.email,
      password: this.password,
      nickname: this.nickname,
      imageUrl: this.imageUrl,
    }

    const response = await registerUser(body)

    if (response.success) {
      navigateTo(ROUTES.AUTH.LOGIN.url)
      new Toast({ message: '회원가입 성공!' })
    } else {
      new Toast({ message: '회원가입 실패. 다시 시도해주세요.' })
    }
  }

  /** 이미지 삭제하기 */
  async deleteImageHandler(imageUrl) {
    const response = await deleteS3Image(imageUrl)
    if (!response.success) {
      new Toast({ message: '기존 이미지 삭제 실패' })
    }
  }

  /** 이미지 업로드하기 */
  async uploadImageHandler(imageFile) {
    const formData = new FormData()
    formData.append('image', imageFile)

    const response = await uploadS3Image(formData)
    if (response.success) {
      const { message, data } = response.data
      const { imageUrl } = data
      this.setImageUrl(imageUrl)

      new Toast({ message: '이미지 업로드 성공' })
    } else {
      new Toast({ message: '회원가입 실패. 다시 시도해주세요.' })
    }
  }
}

export default Register
