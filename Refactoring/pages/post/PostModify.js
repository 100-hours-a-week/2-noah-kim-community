import Component from '../../components/common/Component.js'
import { ROUTES } from '../../public/data/routes.js'
import { navigateTo } from '../../router.js'
class PostModify extends Component {
  setup() {
    this.loadStyles()
  }
  loadStyles() {
    super.loadStyles('/styles/post/postmodify.css')
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
              placeholder="제목을 입력하세요"
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

          <div id="post-image">
            <label>이미지</label>
            <input type="file" id="image-input" accept="image/*" />
          </div>
        </form>
        <button id="modify-button">수정하기</button>
      </main>
    `
  }

  mounted() {
    // DOM 요소 저장
    this.$elements = {
      // 인풋 요소
      titleInput: this.$target.querySelector('#passwordtitle-input'),
      textareaInput: this.$target.querySelector('#content-input'),

      // 버튼 요소
      modifyButton: this.$target.querySelector('#modify-button'),
    }
  }

  setEvent() {
    this.addEvent('input', this.$elements.titleInput, this.validateTitle.bind(this))

    this.addEvent('click', this.$elements.modifyButton, this.modifyPost.bind(this))
  }

  validateTitle() {
    const titleInput = this.$elements.titleInput

    // UI 업데이트
    if (titleInput.value.length > 26) {
      titleInput.value = titleInput.value.slice(0, 26)
    }
  }

  modifyPost() {
    navigateTo(ROUTES.POST.DETAIL.url)
  }
}

export default PostModify
