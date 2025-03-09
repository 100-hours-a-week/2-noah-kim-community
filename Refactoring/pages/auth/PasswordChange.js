import Component from '../../components/common/Component.js'
class PasswordChange extends Component {
  setup() {
    this.loadStyles()
  }
  loadStyles() {
    super.loadStyles('/styles/auth/password_change.css')
  }

  template() {
    return `
      <main id="main-content">
        <div id="title">비밀번호 수정</div>

        <form id="password-change-form">
          <!-- 비밀번호 -->
          <div class="form-field" id="password">
            <label for="password">비밀번호</label>
            <input
              type="password"
              id="password-val"
              placeholder="비밀번호를 입력하세요"
            />
            <div class="error-message" id="password-error">* helper text</div>
          </div>

          <!-- 비밀번호 확인 -->
          <div class="form-field" id="password-confirm">
            <label for="password-confirm">비밀번호 확인</label>
            <input
              type="password"
              id="password-confirm-val"
              placeholder="비밀번호를 한번 더 입력하세요"
            />
            <div class="error-message" id="password-confirm-error">
              * helper text
            </div>
          </div>
          

          <button id="submit-button">수정하기</button>
        </form>
      </main>
    `
  }

  mounted() {
    // DOM 요소 저장
    this.$elements = {
      registerForm: this.$target.querySelector('#password-change-form'),

      // 인풋 요소
      passwordInput: this.$target.querySelector('#password-val'),
      passwordConfirmInput: this.$target.querySelector('#password-confirm-val'),

      // 에러 메세지 요소
      passwordErrorText: this.$target.querySelector('#password-error'),
      passwordConfirmErrorText: this.$target.querySelector('#password-confirm-error'),

      // 버튼 요소
      submitButton: this.$target.querySelector('#submit-button'),
    }
  }

  setEvent() {
    this.addEvent('input', this.$elements.passwordInput, event => {
      this.validatePassword()
      this.updateButtonState()
    })
    this.addEvent('input', this.$elements.passwordConfirmInput, event => {
      this.validatePasswordConfirm()
      this.updateButtonState()
    })
  }

  validatePassword() {
    const password = this.$elements.passwordInput
    const passwordErrorText = this.$elements.passwordErrorText

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/

    // 유효성 검사
    let isValid = true
    let errorText = ''

    // (1) 빈 값 체크
    if (!password.value) {
      errorText = '* 비밀번호를 입력해주세요.'
      isValid = false
    }
    // (2) 유효성 검증
    else if (!passwordRegex.test(password.value)) {
      errorText = '* 비밀번호 형식이 올바르지 않습니다. (8~20자, 대문자, 소문자, 숫자, 특수문자 최소 1개 이상)'
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
      isValid = false
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

  updateButtonState() {
    const submitButton = this.$elements.submitButton

    const isFormValid = this.validatePassword() && this.validatePasswordConfirm()

    if (isFormValid) {
      submitButton.style.backgroundColor = '#7F6AEE' // 활성화 색상
      submitButton.disabled = false // 버튼 활성화
    } else {
      submitButton.style.backgroundColor = '#ACA0EB' // 비활성화 색상 (기본)
      submitButton.disabled = true // 버튼 비활성화
    }
  }
}

export default PasswordChange
