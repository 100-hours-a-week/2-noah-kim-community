import Component from '../../components/common/Component.js'
import Toast from '../../components/common/Toast/Toast.js'
import { validatePasswordConfirmInput, validatePasswordInput } from '../../lib/validation/inputValidations.js'
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
      this.validateForm()
    })
    this.addEvent('input', this.$elements.passwordConfirmInput, event => {
      this.validatePasswordConfirm()
      this.validateForm()
    })
    this.addEvent('click', this.$elements.submitButton, this.modifyHandler.bind(this))
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

  validateForm() {
    const submitButton = this.$elements.submitButton

    const isFormValid = this.validatePassword() && this.validatePasswordConfirm()

    if (!isFormValid) {
      submitButton.style.backgroundColor = '#ACA0EB' // 비활성화 색상 (기본)
      submitButton.disabled = true // 버튼 비활성화
    } else {
      submitButton.style.backgroundColor = '#7F6AEE' // 활성화 색상
      submitButton.disabled = false // 버튼 활성화
    }
  }

  // TODO: 수정하기 API
  modifyHandler(event) {
    event.preventDefault()
    new Toast({
      message: '수정 완료',
      clearTimeout: 2000,
    })
  }
}

export default PasswordChange
