import Button from '../../components/common/Button/Button.js'
import Component from '../../components/common/Component.js'
import Modal from '../../components/common/Modal/Modal.js'
import Toast from '../../components/common/Toast/Toast.js'
import Comment from '../../components/pages/post/Comment.js'
import { parseISOToFullString } from '../../lib/utils/date.js'
import { formatNumber } from '../../lib/utils/number.js'
import { ROUTES } from '../../public/data/routes.js'
import { navigateTo } from '../../router.js'
import { getPost } from '../../service/postService.js'

const defaultPost = {
  postId: null,
  title: null,
  content: null,
  imageUrl: null,
  likeCount: null,
  viewCount: null,
  comments: [],
  createdAt: null,
  liked: null,
}

const defaultUser = {
  userId: null,
  name: null,
  imageUrl: null,
}

class PostDetail extends Component {
  setup() {
    /** 상태 정의 */
    this.$state = {
      postData: null,
      userData: null,

      postId: this.$props.params.postId,
    }
    /** 특정 게시물을 타겟하지 않은 경우 */
    if (!this.$state.postId) {
      navigateTo(ROUTES.POST.MAIN.url)
    }

    this.loadStyles()
    this.fetchPostData()
  }
  loadStyles() {
    super.loadStyles('/styles/post/detail.css')
  }

  template() {
    const {
      postId,
      title,
      content,
      imageUrl: postImageUrl,
      likeCount,
      viewCount,
      comments,
      createdAt,
      liked,
    } = this.$state.postData ?? defaultPost
    const { userId, name, imageUrl: userImageUrl } = this.$state.userData ?? defaultUser

    return `
    <main id="main-content">
      <section id="post-header">
        <div class="title">${title}</div>
        <div id="meta">
          <img src=${userImageUrl} class="user-image"></img>
          <span class="user-name">${name}</span>
          <span class="time">${parseISOToFullString(createdAt)}</span>

          <div class="buttons" id="header-buttons">
            <button id="modify-post"></button>
            <button id="delete-post"></button>
          </div>
        </div>
      </section>

      <section id="post-content">
        <div id="image"></div>
        <span>
          ${content}
        </span>

        <div id="post-stats">
          <div class="stats">
            <span class="number">${formatNumber(likeCount)}</span> 
            <span class="text">좋아요수</span>
          </div>
          <div class="stats">
            <span class="number">${formatNumber(viewCount)}</span> 
            <span class="text">조회수</span>
          </div>
          <div class="stats">
            <span class="number">${comments.length}</span> 
            <span class="text">댓글</span>
          </div>
        </div>
      </section>  

      <section id="comment-box">
        <textarea placeholder="댓글을 남겨주세요!" id="comment-input"></textarea>
        <button id="comment-button"></button>
      </section>

      <section id="comment-list"></section>
    </main>`
  }

  mounted() {
    // DOM 요소 저장
    this.$elements = {
      modifyPostButton: this.$target.querySelector('#modify-post'),
      deletePostButton: this.$target.querySelector('#delete-post'),

      commentInput: this.$target.querySelector('#comment-input'),
      commentAddButton: this.$target.querySelector('#comment-button'),

      commentList: this.$target.querySelector('#comment-list'),
    }

    // 자식 요소 정의
    new Button(this.$elements.modifyPostButton, {
      text: '수정',
      onClick: this.navigateToModifyPost.bind(this),
      idName: 'modify-post',
    })
    new Button(this.$elements.deletePostButton, {
      text: '삭제',
      onClick: this.deletePostHandler.bind(this),
      idName: 'delete-post',
    })

    new Button(this.$elements.commentAddButton, {
      text: '댓글 등록',
      onClick: this.postCommentHandler.bind(this),
      idName: 'comment-button',
    })

    const comments = this.$state.postData?.comments ?? []

    comments.forEach(comment => {
      const commentWrapper = document.createElement('div')
      this.$elements.commentList.appendChild(commentWrapper)

      new Comment(commentWrapper, {
        ...comment,
      })
    })
  }

  setEvent() {
    this.addEvent(this.$elements.commentInput, 'input', this.inputCommentHandler.bind(this))
  }

  // TODO: 게시글 수정 라우팅 구현 (데이터도 같이 전송)
  navigateToModifyPost() {
    navigateTo(ROUTES.POST.MODIFY.url)
  }

  deletePostHandler() {
    new Modal({
      title: '게시글을 삭제하시겠습니까?',
      message: '삭제한 내용은 복구 할 수 없습니다.',
      confirmText: '확인',
      cancelText: '취소',
      onConfirm: () => {
        // TODO: 게시글 삭제 로직 구현
        // navigateTo(ROUTES.AUTH.LOGIN.url)
      },
    })
  }

  inputCommentHandler() {
    const comment = this.$elements.commentInput
    const commentAddButton = this.$elements.commentAddButton

    const commentValue = comment.value

    // 유효성 검사
    let isValid = true
    if (!commentValue) {
      isValid = false
    }

    // UI 업데이트
    if (!isValid) {
      commentAddButton.style.backgroundColor = '#ACA0EB' // 비활성화 색상
      commentAddButton.disabled = false
    } else {
      commentAddButton.style.backgroundColor = '#7F6AEE' // 활성화 색상

      commentAddButton.disabled = true
    }
  }

  postCommentHandler() {
    alert('Post Comment')
  }

  /** 게시글 정보 가져오기 */
  async fetchPostData() {
    try {
      const response = await getPost({ postId: this.$state.postId })
      if (response.success) {
        const { message, data } = response.data
        const { postData, userData } = data

        this.setState({
          postData,
          userData,
        })
      } else {
        new Toast({ message: '게시글 정보 가져오기 실패' })
      }
    } catch (error) {
      new Toast({ message: '서버 오류 발생. 잠시 후 다시 시도해주세요.' })
    }
  }
}

export default PostDetail
