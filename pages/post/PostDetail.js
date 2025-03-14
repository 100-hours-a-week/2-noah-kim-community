import Button from '../../components/common/Button/Button.js'
import Component from '../../components/common/Component.js'
import Modal from '../../components/common/Modal/Modal.js'
import { formatNumber } from '../../lib/utils/number.js'
import { ROUTES } from '../../public/data/routes.js'
import { navigateTo } from '../../router.js'
class PostDetail extends Component {
  setup() {
    this.loadStyles()
  }
  loadStyles() {
    super.loadStyles('/styles/post/detail.css')
  }

  template() {
    return `
    <main id="main-content">
      <section id="post-header">
        <div class="title">제목 1</div>
        <div id="meta">
          <div class="user-image"></div>
          <span class="user-name">데미 작성자 1</span>
          <span class="time">2021-01-01 00:00:00</span>

          <div class="buttons" id="header-buttons">
            <button id="modify-post"></button>
            <button id="delete-post"></button>
          </div>
        </div>
      </section>

      <section id="post-content">
        <div id="image"></div>
        <span>
          무엇을 얘기할까요? 아무말이라면, 삶은 항상 놀라운 모험이라고 생각합니다. 우리는 매일 새로운 경험을 하고 배우며 성장합니다. 때로는 어려움과 도전이 있지만, 그것들이 우리를 더 강하고 지혜롭게 만듭니다. 또한 우리는 주변의 사람들과 연결되며 사랑과 지지를 받습니다. 그래서 우리의 삶은 소중하고 의미가 있습니다. </br>
          자연도 아름다운 이야기입니다. 우리 주변의 자연은 끝없는 아름다움과 신비로움을 담고 있습니다. 산, 바다, 숲, 하늘 등 모든 것이 우리를 놀라게 만들고 감동시킵니다. 자연은 우리의 생명과 안정을 지키며 우리에게 힘을 주는 곳입니다. </br>
          마지막으로, 지식을 향한 탐구는 항상 흥미로운 여정입니다. 우리는 끝없는 지식의 바다에서 배우고 발견할 수 있으며, 이것이 우리를 더 깊이 이해하고 세상을 더 넓게 보게 해줍니다.</br>
          그런 의미에서, 삶은 놀라움과 경이로움으로 가득 차 있습니다. 새로운 경험을 즐기고 항상 앞으로 나아가는 것이 중요하다고 생각합니다.
        </span>

        <div id="post-stats">
          <div class="stats">
            <span class="number">${formatNumber(123)}</span> 
            <span class="text">좋아요수</span>
          </div>
          <div class="stats">
            <span class="number">${formatNumber(123)}</span> 
            <span class="text">조회수</span>
          </div>
          <div class="stats">
            <span class="number">${formatNumber(123)}</span> 
            <span class="text">댓글</span>
          </div>
        </div>
      </section>  

      <section id="comment-box">
        <textarea placeholder="댓글을 남겨주세요!" id="comment-input"></textarea>
        <button id="comment-button"></button>
      </section>

      <section id="comment-list">
        <div class="comment">
          <div id="meta">
            <div id="image"></div>
            <div id="data">
              <div id="data-title">
                <span id="username">데미 작성자1</span>
                <span id="time">2021-01-01 00:00:00</span>
              </div>
              <span class="data-context">댓글 내용</span>
            </div>
          </div>
          
          <div class="buttons" id="comment-buttons">
            <button class="comment-modify"></button>
            <button class="comment-delete"></button>
          </div>
        </div>

         <div class="comment">
          <div id="meta">
            <div id="image"></div>
            <div id="data">
              <div id="data-title">
                <span id="username">데미 작성자1</span>
                <span id="time">2021-01-01 00:00:00</span>
              </div>
              <span class="data-context">댓글 내용</span>
            </div>
          </div>
          
          <div class="buttons" id="comment-buttons">
            <button class="comment-modify"></button>
            <button class="comment-delete"></button>
          </div>
        </div>

         <div class="comment">
          <div id="meta">
            <div id="image"></div>
            <div id="data">
              <div id="data-title">
                <span id="username">데미 작성자1</span>
                <span id="time">2021-01-01 00:00:00</span>
              </div>
              <span class="data-context">댓글 내용</span>
            </div>
          </div>
          
          <div class="buttons" id="comment-buttons">
            <button class="comment-modify"></button>
            <button class="comment-delete"></button>
          </div>
        </div>
      </section>
    </main>`
  }

  mounted() {
    // DOM 요소 저장
    this.$elements = {
      modifyPostButton: this.$target.querySelector('#modify-post'),
      deletePostButton: this.$target.querySelector('#delete-post'),

      commentInput: this.$target.querySelector('#comment-input'),

      commentAddButton: this.$target.querySelector('#comment-button'),
      commentModifyButtons: [...this.$target.querySelectorAll('.comment-modify')],
      commentDeleteButtons: [...this.$target.querySelectorAll('.comment-delete')],
    }

    console.log([...this.$target.querySelectorAll('.comment-modify')])
    console.log(this.$elements.commentModifyButtons)

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
    console.log(this.$elements.commentAddButton)

    new Button(this.$elements.commentAddButton, {
      text: '댓글 등록',
      onClick: this.postCommentHandler.bind(this),
      idName: 'comment-button',
    })

    // TODO: 댓글 수정 로직 구현
    // 모든 댓글 수정 버튼에 대해 Button 컴포넌트 생성
    this.$elements.commentModifyButtons.forEach((button, index) => {
      new Button(button, {
        text: '수정',
        onClick: this.modifyCommentHandler.bind(this),
        className: 'comment-modify',
      })
    })

    // 모든 댓글 삭제 버튼에 대해 Button 컴포넌트 생성
    this.$elements.commentDeleteButtons.forEach((button, index) => {
      console.log('요소: ', button)

      new Button(button, {
        text: '삭제',
        onClick: this.deleteCommentHandler.bind(this),
        className: 'comment-delete',
      })
    })
  }

  setEvent() {
    this.addEvent('input', this.$elements.commentInput, this.inputCommentHandler.bind(this))
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

export default PostDetail
