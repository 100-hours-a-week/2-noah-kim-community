import Button from '../../components/common/Button/Button.js'
import Component from '../../components/common/Component.js'
import Toast from '../../components/common/Toast/Toast.js'
import { ROUTES } from '../../public/data/routes.js'
import { navigateTo } from '../../router.js'
import { getPost, modifyPost } from '../../service/postService.js'
class PostModify extends Component {
  setup() {
    /** 상태 정의 */
    this.$state = {
      postId: this.$props.params.postId,

      titleInput: null,
      contentInput: null,
      imageInput: null,
    }
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
            <input
              id="title-input"
              type="title"
              value="${this.$state.titleInput ? this.$state.titleInput : ''}"
              placeholder="제목을 입력하세요"
            />
          </div>

          <div id="post-content">
            <label>내용*</label>
            <textarea
              id="content-input"
              type="content"
              placeholder="내용을 입력하세요"
            >${this.$state.contentInput ? this.$state.contentInput : ''}</textarea>
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
  }

  setEvent() {
    this.addEvent(this.$elements.titleInput, 'input', event => {
      this.sliceTitle.bind(this)
      this.setState({ titleInput: event.target.value })
    })
    this.addEvent(this.$elements.contentInput, 'input', event => {
      this.setState({ contentInput: event.target.value })
    })
    this.addEvent(this.$elements.imageInput, 'input', event => {
      // TODO: 이미지 업로드 처리 로직 구현
      // this.setState({ imageInput: event.target.files[0] })
      this.setState({ imageInput: `https://babpat-thumbnails.s3.ap-northeast-2.amazonaws.com/thumbnails/p150.jpg` })
    })
  }

  /** 제목은 최대 26자 */
  sliceTitle() {
    const titleInput = this.$elements.titleInput

    // 자르기
    if (titleInput.value.length > 26) {
      titleInput.value = titleInput.value.slice(0, 26)
    }
  }

  /** 게시글 정보 가져오기 API */
  async fetchPostData() {
    const response = await getPost({ postId: this.$state.postId })
    if (response.success) {
      const { message, data } = response.data
      const { postData, userData } = data

      this.setState({
        titleInput: postData.title,
        contentInput: postData.content,
        imageInput: postData.imageUrl,
      })
    } else {
      new Toast({ message: '게시글 정보 가져오기 실패' })
    }
  }

  /** 게시글 정보 가져오기 API */
  async modifyPostHandler() {
    const { postId, titleInput, contentInput, imageInput } = this.$state
    const response = await modifyPost({
      postId: postId,
      title: titleInput,
      content: contentInput,
      imageUrl: imageInput,
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
