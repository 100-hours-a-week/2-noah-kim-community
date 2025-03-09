import Component from '../../components/common/Component.js'
class PostDetail extends Component {
  setup() {
    this.loadStyles()
  }
  loadStyles() {
    super.loadStyles('/styles/post/postdetail.css')
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
            <button id="modify-post">수정</button>
            <button id="delete-post">삭제</button>
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
            <span class="number">123</span> 
            <span class="text">좋아요수</span>
          </div>
          <div class="stats">
            <span class="number">123</span> 
            <span class="text">조회수</span>
          </div>
          <div class="stats">
            <span class="number">123</span> 
            <span class="text">댓글</span>
          </div>
        </div>
      </section>  

   

      <section id="comment-box">
        <textarea placeholder="댓글을 남겨주세요!"></textarea>
        <button id="comment-button">댓글 등록</button>
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
            <button id="comment-modify">수정</button>
            <button id="comment-delete">삭제</button>
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
            <button id="comment-modify">수정</button>
            <button id="comment-delete">삭제</button>
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
            <button id="comment-modify">수정</button>
            <button id="comment-delete">삭제</button>
          </div>
        </div>
      </section>
    </main>`
  }

  setEvent() {}
}

export default PostDetail
