import Button from '../../components/common/Button/Button.js'
import Component from '../../components/common/Component.js'
import { parseDateToFullString } from '../../lib/utils/date.js'
import { formatNumber } from '../../lib/utils/number.js'
import { DUMMY_POSTS } from '../../public/data/dummy_posts.js'
import { ROUTES } from '../../public/data/routes.js'
import { navigateTo } from '../../router.js'

class PostList extends Component {
  setup() {
    this.state = {
      posts: DUMMY_POSTS,
    }

    this.loadStyles()
  }
  loadStyles() {
    super.loadStyles('/styles/post/list.css')
  }

  template() {
    const { posts } = this.state

    const postList = posts
      .map(post => {
        // TODO: 게시글 클릭 시 상세 페이지 이동
        // li.addEventListener("click", () => {
        //   window.location.href = URL.POST.DETAIL.url;
        // });
        return `<li class='post'>
        <div id="post-header"> 
          <strong>${post.title}</strong> 
          <div id="post-header-details">
            <ul>  
              <li> 좋아요 ${formatNumber(post.likeCnt)}</li>
              <li> 댓글 ${formatNumber(post.comments.length)} </li>
              </li> 조회수 ${formatNumber(post.hitCnt)} </li>
            </ul>
            <span> ${parseDateToFullString(post.date)} </span>
          </div>
        </div> 
        <div id="post-footer"> 
          <div id="user-image"></div>
           ${post.userName}
        </div>
      </li>`
      })
      .join('')

    return `
      <main id="main-content">
        <section id="title">
          <span>안녕하세요,</span>
          <span>아무 말 대잔치 <strong>게시판</strong>입니다.</span>
        </section>
        <button id="write-button"></button>
        <ul id="posts">
          ${postList}
        </ul>
      </main>
    `
  }

  mounted() {
    // DOM 요소 저장
    this.$elements = {
      writePostButton: this.$target.querySelector('#write-button'),
    }

    // 자식 요소 정의
    new Button(this.$elements.writePostButton, {
      text: '게시글 작성',
      onClick: this.navigateToWritePostRoute.bind(this),
      idName: 'write-button',
    })
  }

  navigateToWritePostRoute() {
    navigateTo(ROUTES.POST.WRITE.url)
  }
}

export default PostList
