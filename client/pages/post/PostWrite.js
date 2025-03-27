import Button from '../../components/common/Button/Button.js'
import Component from '../../components/common/Component.js'
import TextInput from '../../components/common/TextInput/TextInput.js'
import Textarea from '../../components/common/Textarea/Textarea.js'
import Toast from '../../components/common/Toast/Toast.js'
import { ROUTES } from '../../public/data/routes.js'
import { navigateTo } from '../../router.js'
import { createPost } from '../../service/postService.js'
class PostWrite extends Component {
  isComposing = false

  setup() {
    /** 상태 정의 */
    this.useState('title', '')
    this.useState('content', '')
    this.useState('imageUrl', '')

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
            <label>제목</label>
            <input id="title-input"/>
          </div>

          <div id="post-content">
            <label>내용*</label>
            <textarea id="content-input"></textarea>
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
    this.useEffect(() => {
      this.validateTitle()
    }, [this.title])

    this.useEffect(() => {
      this.validateForm()
    }, [this.title, this.content, this.imageUrl])

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

    new TextInput(this.$elements.titleInput, {
      id: 'title-input',
      type: 'text',
      value: this.title,
      placeholder: '제목을 입력하세요. (최대 26글자)',
      changeHandler: this.setTitle,
    })

    new Textarea(this.$elements.textareaInput, {
      id: 'content-input',
      type: 'text',
      value: this.content,
      placeholder: '내용을 입력하세요',
      changeHandler: this.setContent,
    })
  }

  setEvent() {
    this.addEvent(this.$elements.imageInput, 'input', event => {
      const file = event.target.files[0]
      // TODO: 이미지 업로드 및 경로로 저장
      this.setImageUrl(`https://babpat-thumbnails.s3.ap-northeast-2.amazonaws.com/thumbnails/p150.jpg`)
    })
  }

  get isFormValid() {
    return this.title !== '' && this.content !== '' && this.imageUrl !== ''
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
    const body = {
      title: this.title,
      content: this.content,
      imageUrl: this.imageUrl,
    }
    const response = await createPost(body)
    if (response.success) {
      const { message, data } = response.data
      const { postId } = data
      navigateTo(ROUTES.POST.DETAIL.url(postId))
      new Toast({ message: '게시글 생성 성공!' })
    } else {
      new Toast({ message: '회원가입 실패. 다시 시도해주세요.' })
    }
  }

  setState(newState) {
    super.setState(newState)
    this.validateForm()
  }
}

export default PostWrite
