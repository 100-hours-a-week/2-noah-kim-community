import Button from '../../components/common/Button/Button.js'
import Component from '../../components/common/Component.js'
import Modal from '../../components/common/Modal/Modal.js'
import Textarea from '../../components/common/Textarea/Textarea.js'
import Toast from '../../components/common/Toast/Toast.js'
import Comment from '../../components/pages/post/Comment.js'
import { parseISOToFullString } from '../../lib/utils/date.js'
import { formatNumber } from '../../lib/utils/number.js'
import { ROUTES } from '../../public/data/routes.js'
import { navigateTo } from '../../router.js'
import { createComment, createLikes, deleteComment, deleteLikes, deletePost, getPost, modifyComment } from '../../service/postService.js'

export const defaultPost = {
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

export const defaultUser = {
  userId: null,
  name: null,
  imageUrl: null,
}

class PostDetail extends Component {
  setup() {
    this.postId = this.$props.params.postId
    /** 상태 정의 */
    this.useState('postData', {
      data: null,
      userData: null,
    })
    this.useState('commentInput', null)
    this.useState('editingCommentId', null)

    /** 특정 게시물을 타겟하지 않은 경우 */
    if (!this.postId) {
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
    } = this.postData.data ?? defaultPost
    const { userId, name, imageUrl: userImageUrl } = this.postData.userData ?? defaultUser

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
        <img src=${postImageUrl} id="post-image"></img>
        <span>
          ${content}
        </span>

        <div id="post-stats">
          <div class="stats ${liked ? 'liked' : ''}" id="like-button">
            <span class="number">${formatNumber(likeCount)}</span> 
            <span class="text">좋아요수</span>
          </div>
          <div class="stats">
            <span class="number">${formatNumber(viewCount)}</span> 
            <span class="text">조회수</span>
          </div>
          <div class="stats">
            <span class="number">${formatNumber(comments.length)}</span> 
            <span class="text">댓글</span>
          </div>
        </div>
      </section>  

      <section id="comment-box">
        <textarea id="comment-input"></textarea>
        <button id="comment-button"></button>
      </section>

      <section id="comment-list"></section>
    </main>`
  }

  mounted() {
    this.useEffect(() => {
      this.validateComment()
    }, [this.commentInput])

    // DOM 요소 저장
    this.$elements = {
      modifyPostButton: this.$target.querySelector('#modify-post'),
      deletePostButton: this.$target.querySelector('#delete-post'),

      likeButton: this.$target.querySelector('#like-button'),

      commentInput: this.$target.querySelector('#comment-input'),
      commentAddButton: this.$target.querySelector('#comment-button'),

      commentList: this.$target.querySelector('#comment-list'),
    }

    // 게시글 수정 버튼
    new Button(this.$elements.modifyPostButton, {
      text: '수정',
      onClick: this.navigateToModifyPost.bind(this),
      idName: 'modify-post',
    })
    // 게시글 삭제 버튼
    new Button(this.$elements.deletePostButton, {
      text: '삭제',
      onClick: this.openDeleteModal.bind(this),
      idName: 'delete-post',
    })

    new Textarea(this.$elements.commentInput, {
      id: 'comment-input',
      type: 'text',
      value: this.commentInput ?? '',
      placeholder: '댓글을 남겨주세요!',
      changeHandler: this.setCommentInput,
    })

    // 댓글 추가 버튼
    const createCommentProps = {
      text: '댓글 등록',
      onClick: this.createCommentHandler.bind(this),
      idName: 'comment-button',
    }
    const modifyCommentProps = {
      text: '댓글 수정',
      onClick: () => this.modifyCommentHandler(this.editingCommentId),
      idName: 'comment-button',
    }
    new Button(this.$elements.commentAddButton, !this.editingCommentId ? createCommentProps : modifyCommentProps)

    // 댓글들
    const comments = this.postData.data?.comments ?? []
    comments.forEach(comment => {
      const commentWrapper = document.createElement('div')
      this.$elements.commentList.appendChild(commentWrapper)

      new Comment(commentWrapper, {
        ...comment,
        modifyClickHandler: this.modifyClickHandler.bind(this),
        deleteClickHandler: this.deleteCommentHandler.bind(this),
      })
    })
  }

  setEvent() {
    this.addEvent(this.$elements.likeButton, 'click', event => {
      this.likeClickHandler(this.postId)
    })
  }

  // TODO: 게시글 수정 라우팅 구현 (데이터도 같이 전송)
  navigateToModifyPost() {
    navigateTo(ROUTES.POST.MODIFY.url(this.postData.data.postId))
  }

  openDeleteModal() {
    new Modal({
      title: '게시글을 삭제하시겠습니까?',
      message: '삭제한 내용은 복구 할 수 없습니다.',
      confirmText: '확인',
      cancelText: '취소',
      onConfirm: () => {
        this.deletePostHandler()
      },
    })
  }

  validateComment() {
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

  // 댓글 수정 클릭
  modifyClickHandler(commentId, content) {
    this.setEditingCommentId(commentId)
    this.setCommentInput(content)
  }

  /** 게시글 정보 가져오기 API */
  async fetchPostData() {
    const response = await getPost({ postId: this.postId })
    if (response.success) {
      const { message, data } = response.data
      const { postData, userData } = data

      this.setPostData({
        data: postData,
        userData: userData,
      })
    } else {
      new Toast({ message: response.error || '게시글 정보 가져오기 실패' })
    }
  }

  /** 게시글 정보 가져오기 API */
  async deletePostHandler() {
    const response = await deletePost({ postId: this.postId })
    if (response.success) {
      navigateTo(ROUTES.POST.MAIN.url)
      new Toast({ message: '게시글 삭제 완료' })
    } else {
      new Toast({ message: response.error || '게시글 정보 가져오기 실패' })
    }
  }

  /** 댓글 생성 API */
  async createCommentHandler() {
    const response = await createComment({ content: this.commentInput, postId: this.postId })
    if (response.success) {
      const { message, data } = response.data
      const newComment = data

      const currentComment = this.postData.data.comments
      currentComment.push(newComment)

      this.setPostData({
        ...this.postData,
        data: {
          ...this.postData.data,
          comments: currentComment,
        },
      })
      this.setCommentInput(null)
    } else {
      new Toast({ message: response.error || '댓글 추가 실패' })
    }
  }

  /** 댓글 수정 API */
  async modifyCommentHandler(commentId) {
    const response = await modifyComment({
      postId: this.postId,
      commentId: commentId,
      content: this.commentInput,
    })
    if (response.success) {
      const { message, data } = response.data
      const { commentId, content, updatedAt } = data

      const modifiedComment = this.postData.data.comments.map(comment => {
        if (comment.commentId === commentId) {
          return {
            ...comment,
            content: content,
          }
        } else {
          return comment
        }
      })

      this.setPostData({
        ...this.postData,
        data: {
          ...this.postData.data,
          comments: modifiedComment,
        },
      })

      this.setCommentInput(null)
      this.setEditingCommentId(null)
    } else {
      new Toast({ message: response.error || '댓글 추가 실패' })
    }
  }
  /** 댓글 수정 API */
  async deleteCommentHandler(commentId) {
    const response = await deleteComment({
      postId: this.postId,
      commentId: commentId,
    })
    if (response.success) {
      const modifiedComments = this.postData.data.comments.filter(comment => {
        if (comment.commentId === commentId) {
          return false
        }
        return true
      })
      this.setPostData({
        ...this.postData,
        data: {
          ...this.postData.data,
          comments: modifiedComments,
        },
      })
      new Toast({ message: '댓글이 삭제되었습니다' })
    } else {
      new Toast({ message: response.error || '댓글 삭제 실패' })
    }
  }

  likeClickHandler(postId) {
    if (this.postData.data.liked) {
      this.deleteLikeHandler(postId)
    } else {
      this.createLikeHandler(postId)
    }
  }
  /** 좋아요 추가 API */
  async createLikeHandler(postId) {
    const response = await createLikes({
      postId,
    })
    if (response.success) {
      this.setPostData({
        ...this.postData,
        data: {
          ...this.postData.data,
          liked: true,
          likeCount: this.postData.data.likeCount + 1,
        },
      })
    } else {
      console.log(response)

      new Toast({ message: response.error || '좋아요 추가 실패' })
    }
  }

  /** 좋아요 삭제 API */
  async deleteLikeHandler(postId) {
    const response = await deleteLikes({
      postId,
    })
    if (response.success) {
      this.setPostData({
        ...this.postData,
        data: {
          ...this.postData.data,
          liked: false,
          likeCount: this.postData.data.likeCount - 1,
        },
      })
    } else {
      new Toast({ message: response.error || '좋아요 삭제 실패' })
    }
  }
}

export default PostDetail
