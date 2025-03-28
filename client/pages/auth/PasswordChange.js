import Button from '../../components/common/Button/Button.js'
import Component from '../../components/common/Component.js'
import TextInput from '../../components/common/TextInput/TextInput.js'
import Toast from '../../components/common/Toast/Toast.js'
import { validatePasswordConfirmInput, validatePasswordInput } from '../../lib/validation/inputValidations.js'
import { modifyPasswordUser } from '../../service/userService.js'
class PasswordChange extends Component {
  setup() {
    this.useState('password', '')
    this.useState('passwordConfirm', '')

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
            <input id="password-val" />
            <div class="error-message" id="password-error">* helper text</div>
          </div>

          <!-- 비밀번호 확인 -->
          <div class="form-field" id="password-confirm">
            <label for="password-confirm">비밀번호 확인</label>
            <input id="password-confirm-val" />
            <div class="error-message" id="password-confirm-error">
              * helper text
            </div>
          </div>
          

          <button id="submit-button"></button>
        </form>
      </main>
    `
  }

  mounted() {
    this.useEffect(() => {
      this.validatePassword()
    }, [this.password])

    this.useEffect(() => {
      this.validatePasswordConfirm()
    }, [this.passwordConfirm])

    this.useEffect(() => {
      this.validateForm()
    }, [this.password, this.passwordConfirm])

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

    // 자식 요소 정의
    new Button(this.$elements.submitButton, {
      text: '수정하기',
      onClick: this.modifyHandler.bind(this),
      idName: 'submit-button',
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
  }

  /** 비밀번호 유효성 검사 */
  validatePassword() {
    return validatePasswordInput(this.password, this.$elements.passwordErrorText)
  }

  /** 비밀번호 확인 유효성 검사 */
  validatePasswordConfirm() {
    return validatePasswordConfirmInput(this.password, this.passwordConfirm, this.$elements.passwordConfirmErrorText)
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

  modifyHandler(event) {
    event.preventDefault()
    this.modifyPassword()
  }

  /** 회원탈퇴 */
  async modifyPassword() {
    const response = await modifyPasswordUser({ password: this.password })
    if (response.success) {
      new Toast({ message: '수정 완료' })
      this.setPassword('')
      this.setPasswordConfirm('')
    } else {
      new Toast({ message: '비밀번호 변경 실패' })
    }
  }
}

export default PasswordChange
