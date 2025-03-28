import Button from '../../components/common/Button/Button.js'
import Component from '../../components/common/Component.js'
import Textarea from '../../components/common/Textarea/Textarea.js'
import TextInput from '../../components/common/TextInput/TextInput.js'
import Toast from '../../components/common/Toast/Toast.js'
import { ROUTES } from '../../public/data/routes.js'
import { navigateTo } from '../../router.js'
import { getPost, modifyPost } from '../../service/postService.js'
class PostModify extends Component {
  setup() {
    /** 상태 정의 */
    this.postId = this.$props.params.postId

    this.useState('formData', {
      title: '',
      content: '',
      imageUrl: '',
    })

    this.loadStyles()
    this.fetchPostData()
  }
  loadStyles() {
    super.loadStyles('/styles/post/modify.css')
  }

  template() {
    return `
       <main id="main-content">
        <div id="title">게시글 수정</div>

        <form>
          <div id="post-title">
            <label>제목*</label>
            <input id="title-input" />
          </div>

          <div id="post-content">
            <label>내용*</label>
            <textarea id="content-input"></textarea>
          </div>

          <div id="post-image">
            <label>이미지</label>
            <input type="file" id="image-input" accept="image/*" />
          </div>
        </form>
        <button id="modify-button"></button>
      </main>
    `
  }

  mounted() {
    this.useEffect(() => {
      this.sliceTitle()
    }, [this.formData.title])

    // DOM 요소 저장
    this.$elements = {
      // 인풋 요소
      titleInput: this.$target.querySelector('#title-input'),
      contentInput: this.$target.querySelector('#content-input'),
      imageInput: this.$target.querySelector('#image-input'),

      // 버튼 요소
      modifyButton: this.$target.querySelector('#modify-button'),
    }

    // 자식 요소 정의
    new Button(this.$elements.modifyButton, {
      text: '수정하기',
      onClick: this.modifyPostHandler.bind(this),
      idName: 'modify-button',
    })

    new TextInput(this.$elements.titleInput, {
      id: 'title-input',
      type: 'text',
      value: this.formData.title ?? '',
      placeholder: '제목을 입력하세요',
      changeHandler: value => this.setFormData({ ...this.formData, title: value }),
    })

    new Textarea(this.$elements.contentInput, {
      id: 'content-input',
      type: 'text',
      value: this.formData.content ?? '',
      placeholder: '내용을 입력하세요',
      changeHandler: value => this.setFormData({ ...this.formData, content: value }),
    })
  }

  setEvent() {
    this.addEvent(this.$elements.titleInput, 'input', event => {
      this.setFormData({ ...this.formData, title: event.target.value })
    })
    this.addEvent(this.$elements.contentInput, 'input', event => {
      this.setFormData({ ...this.formData, content: event.target.value })
    })
    this.addEvent(this.$elements.imageInput, 'input', event => {
      // TODO: 이미지 업로드 처리 로직 구현
      this.setFormData({ ...this.formData, imageUrl: `https://babpat-thumbnails.s3.ap-northeast-2.amazonaws.com/thumbnails/p150.jpg` })
    })
  }

  /** 제목은 최대 26자 */

  sliceTitle() {
    const title = this.formData.title || ''

    // 자르기
    if (this.formData.title.length > 26) {
      this.setFormData({ ...this.formData, title: title.slice(0, 26) })
      new Toast({ message: '제목이 최대 26자로 설정됩니다.' })
    }
  }

  /** 게시글 정보 가져오기 API */
  async fetchPostData() {
    const response = await getPost({ postId: this.postId })
    if (response.success) {
      const { message, data } = response.data
      const { postData, userData } = data

      this.setFormData({
        title: postData.title,
        content: postData.content,
        imageUrl: postData.imageUrl,
      })
    } else {
      new Toast({ message: '게시글 정보 가져오기 실패' })
    }
  }

  /** 게시글 정보 가져오기 API */
  async modifyPostHandler() {
    const postId = this.postId
    const { title, content, imageUrl } = this.formData
    const response = await modifyPost({
      postId,
      title,
      content,
      imageUrl,
    })
    if (response.success) {
      navigateTo(ROUTES.POST.DETAIL.url(postId))
      new Toast({ message: '게시글 수정 완료' })
    } else {
      new Toast({ message: '게시글 수정 실패' })
    }
  }
}

export default PostModify
