import Button from '../../components/common/Button/Button.js'
import Component from '../../components/common/Component.js'
import Toast from '../../components/common/Toast/Toast.js'
import { createPost } from '../../service/postService.js'
class PostWrite extends Component {
  setup() {
    /** 상태 정의 */
    this.$state = {
      title: '',
      content: '',
      imageUrl: '',
    }

    /** 스타일 로드 */
    this.loadStyles()
  }
  loadStyles() {
    super.loadStyles('/styles/post/write.css')
  }

  /** TODO: 버튼 disabled 처리 고민 필요 (DOM 구현 이후) */
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
              value="${this.$state.title}"
              placeholder="제목을 입력하세요. (최대 26글자)"
            />
          </div>

          <div id="post-content">
            <label>내용*</label>
            <textarea
              id="content-input"
              type="content"
              placeholder="내용을 입력하세요"
            >${this.$state.content}</textarea>
          </div>

          <span class="error-message"></span>
          <div id="post-image">
            <label>이미지</label>
            <input type="file" id="image-input" accept="image/*" />
          </div>
        </form>
        <button type="button" id="submit-button" ${this.isFormValid ? '' : 'disabled'}></button>
      </main>
    `
  }

  mounted() {
    // DOM 요소 저장
    this.$elements = {
      // 인풋 요소
      titleInput: this.$target.querySelector('#title-input'),
      textareaInput: this.$target.querySelector('#content-input'),
      imageInput: this.$target.querySelector('#image-input'),

      // 에러 요소
      errorText: this.$target.querySelector('.error-message'),

      // 버튼 요소
      submitButton: this.$target.querySelector('#submit-button'),
    }

    // 자식 요소 정의
    new Button(this.$elements.submitButton, {
      text: '완료',
      onClick: this.createPostHandler.bind(this),
      idName: 'submit-button',
    })
  }

  setEvent() {
    this.addEvent(this.$elements.titleInput, 'input', event => {
      this.setState({ title: event.target.value })
      this.validateTitle()
    })

    this.addEvent(this.$elements.textareaInput, 'input', event => {
      this.setState({ content: event.target.value })
    })

    this.addEvent(this.$elements.imageInput, 'input', event => {
      const file = event.target.files[0]
      // TODO: 이미지 업로드 및 경로로 저장
      this.setState({ imageUrl: `https://babpat-thumbnails.s3.ap-northeast-2.amazonaws.com/thumbnails/p150.jpg` })
    })
  }

  get isFormValid() {
    const { title, content, imageUrl } = this.$state
    return title !== '' && content !== '' && imageUrl !== ''
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
    const submitButton = this.$elements.submitButton
    const errorTextElement = this.$elements.errorText
    const formValidation = this.isFormValid
    if (!formValidation) {
      errorTextElement.style.visibility = 'visible'
      errorTextElement.textContent = `* 제목, 내용, 이미지를 입력해주세요`
      submitButton.style.backgroundColor = '#ACA0EB' // 비활성화 색상 (기본)
    } else {
      errorTextElement.style.visibility = 'hidden'
      submitButton.style.setProperty('background-color', '#7F6AEE', 'important')
    }
  }

  /** 수정하러 가기 */
  async createPostHandler() {
    try {
      const body = {
        title: this.$state.title,
        content: this.$state.content,
        imageUrl: this.$state.imageUrl,
      }

      const response = await createPost(body)
      if (response.success) {
        new Toast({ message: '게시글 생성 성공!' })

        // navigateTo(ROUTES.POST.MAIN.url)
      } else {
        new Toast({ message: '회원가입 실패. 다시 시도해주세요.' })
      }
    } catch (error) {
      new Toast({ message: '서버 오류 발생. 잠시 후 다시 시도해주세요.' })
    }
    // navigateTo(ROUTES.POST.DETAIL.url)
  }

  setState(newState) {
    super.setState(newState)
    this.validateForm()
  }
}

export default PostWrite
