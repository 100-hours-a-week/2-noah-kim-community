import { parseISOToFullString } from '../../../lib/utils/date.js'
import Button from '../../common/Button/Button.js'
import InlineComponent from '../../common/InlineComponent.js'
import Modal from '../../common/Modal/Modal.js'

class Comment extends InlineComponent {
  setup() {
    /** 상태 정의 */
    this.$state = {}
    this.loadStyles()
  }
  loadStyles() {
    super.loadStyles('/components/pages/post/Comment.css')
  }

  template() {
    const { nickname, imageUrl, content, createdAt } = this.$props

    return `<div class="comment">
              <div id="meta">
                <img id="image" src=${imageUrl}></img>
                <div id="data">
                  <div id="data-title">
                    <span id="username">${nickname}</span>
                    <span id="time">${parseISOToFullString(createdAt)}</span>
                  </div>
                  <span class="data-context">${content}</span>
                </div>
              </div>
              
              <div class="buttons" id="comment-buttons">
                <button class="comment-modify"></button>
                <button class="comment-delete"></button>
              </div>
            </div>`
  }

  mounted() {
    // DOM 요소 저장
    this.$elements = {
      commentModifyButton: this.$target.querySelector('.comment-modify'),
      commentDeleteButton: this.$target.querySelector('.comment-delete'),
    }

    // 자식 요소 정의

    // TODO: 댓글 수정 로직 구현
    // 모든 댓글 수정 버튼에 대해 Button 컴포넌트 생성
    new Button(this.$elements.commentModifyButton, {
      text: '수정',
      onClick: this.modifyCommentHandler.bind(this),
      className: 'comment-modify',
    })

    new Button(this.$elements.commentDeleteButton, {
      text: '삭제',
      onClick: this.deleteCommentHandler.bind(this),
      className: 'comment-delete',
    })
  }

  setEvent() {
    const { onClick } = this.$props

    this.addEvent(this.$target, 'click', onClick)
  }

  modifyCommentHandler() {
    alert('Modify Comment')
  }

  deleteCommentHandler() {
    new Modal({
      title: '댓글을 삭제하시겠습니까?',
      message: '삭제한 내용은 복구 할 수 없습니다.',
      confirmText: '확인',
      cancelText: '취소',
      onConfirm: () => {
        // TODO: 댓글 삭제 로직 구현
        // navigateTo(ROUTES.AUTH.LOGIN.url)
      },
    })
  }
}

export default Comment
