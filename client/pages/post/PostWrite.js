import Button from '../../components/common/Button/Button.js'
import Component from '../../components/common/Component.js'
import { ROUTES } from '../../public/data/routes.js'
import { navigateTo } from '../../router.js'
class PostWrite extends Component {
  setup() {
    this.loadStyles()
  }
  loadStyles() {
    super.loadStyles('/styles/post/write.css')
  }

  template() {
    return `
     <main id="main-content">
        <div id="title">게시글 작성</div>

        <form>
          <div id="post-title">
            <label>제목*</label>
            <input
              id="title-input"
              type="title"
              placeholder="제목을 입력하세요. (최대 26글자)"
            />
          </div>

          <div id="post-content">
            <label>내용*</label>
            <textarea
              id="content-input"
              type="content"
              placeholder="내용을 입력하세요"
            ></textarea>
          </div>

          <span class="error-message"></span>
          <div id="post-image">
            <label>이미지</label>
            <input type="file" id="image-input" accept="image/*" />
          </div>
        </form>
        <button id="submit-button"></button>
      </main>
    `
  }

  mounted() {
    // DOM 요소 저장
    this.$elements = {
      // 인풋 요소
      titleInput: this.$target.querySelector('#title-input'),
      textareaInput: this.$target.querySelector('#content-input'),

      // 에러 요소
      errorText: this.$target.querySelector('.error-message'),

      // 버튼 요소
      submitButton: this.$target.querySelector('#submit-button'),
    }

    // 자식 요소 정의
    new Button(this.$elements.submitButton, {
      text: '완료',
      onClick: this.submitPostHandler.bind(this),
      idName: 'submit-button',
    })
  }

  setEvent() {
    this.addEvent(this.$elements.titleInput, 'input', event => {
      this.validateTitle()
      this.validateForm()
    })

    this.addEvent(this.$elements.textareaInput, 'input', event => {
      this.validateForm()
    })
  }

  /** 제목은 최대 26자 */
  validateTitle() {
    const titleInput = this.$elements.titleInput

    // UI 업데이트
    if (titleInput.value.length > 26) {
      titleInput.value = titleInput.value.slice(0, 26)
    }
  }

  /** 폼 전체 유효성 검사 */
  validateForm() {
    const modifyButton = this.$elements.modifyButton
    const errorTextElement = this.$elements.errorText

    const isFormValid = this.$elements.titleInput.value && this.$elements.textareaInput.value

    if (!isFormValid) {
      errorTextElement.style.visibility = 'visible'
      errorTextElement.textContent = `* 제목, 내용을 모두 작성해주세요.`

      modifyButton.style.backgroundColor = '#ACA0EB' // 비활성화 색상 (기본)
      modifyButton.disabled = true // 버튼 비활성화
    } else {
      errorTextElement.style.visibility = 'hidden'

      modifyButton.style.backgroundColor = '#7F6AEE' // 활성화 색상
      modifyButton.disabled = false // 버튼 활성화
    }
  }

  /** 수정하러 가기 */
  submitPostHandler() {
    navigateTo(ROUTES.POST.DETAIL.url)
  }
}

export default PostWrite
