import Button from '../../components/common/Button/Button.js'
import Component from '../../components/common/Component.js'
import Toast from '../../components/common/Toast/Toast.js'
import { parseISOToFullString } from '../../lib/utils/date.js'
import { formatNumber } from '../../lib/utils/number.js'
import { ROUTES } from '../../public/data/routes.js'
import { navigateTo } from '../../router.js'
import { getPostList } from '../../service/postService.js'

const PAGE_SIZE = 6

class PostList extends Component {
  setup() {
    this.$state = {
      posts: [],

      currentPage: 0,
      totalPages: 0,
    }

    this.loadStyles()
    this.fetchPostListData()
  }
  loadStyles() {
    super.loadStyles('/styles/post/list.css')
  }

  template() {
    const { posts } = this.$state

    const postList = posts
      .map(post => {
        // TODO: 게시글 클릭 시 상세 페이지 이동
        const { postData, userData } = post

        const { postId, title, content, likeCount, viewCount, commentCount, createdAt } = postData
        const { userId, nickname, imageUrl } = userData

        return `<li class='post'>
        <div id="post-header">
          <strong>${title}</strong>
          <div id="post-header-details">
            <ul>
              <li> 좋아요 ${formatNumber(likeCount)}</li>
              <li> 댓글 ${formatNumber(commentCount)} </li>
              </li> 조회수 ${formatNumber(viewCount)} </li>
            </ul>
            <span> ${parseISOToFullString(createdAt)} </span>
          </div>
        </div>
        <div id="post-footer">
          <img src=${imageUrl} id="user-image" />
           ${nickname}
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

  setEvent() {
    window.addEventListener('scroll', this.handleScroll.bind(this))
  }

  navigateToWritePostRoute() {
    navigateTo(ROUTES.POST.WRITE.url)
  }

  /** 게시글 정보 가져오기 API */
  async fetchPostListData() {
    const { posts, currentPage } = this.$state
    try {
      const response = await getPostList({ currentPage: currentPage, pageSize: PAGE_SIZE })
      if (response.success) {
        const { message, data } = response.data
        const { page, content } = data
        const { totalPages, totalElements } = page

        this.setState({
          posts: [...posts, ...content],
          currentPage: currentPage + 1,
          totalPages: totalPages,
        })
      } else {
        new Toast({ message: '게시글 목록 가져오기 실패' })
      }
    } catch (error) {
      new Toast({ message: '서버 오류 발생. 잠시 후 다시 시도해주세요.' })
    }
  }

  handleScroll() {
    const scrollBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
    if (scrollBottom && this.$state.totalPages !== this.$state.currentPage) {
      this.fetchPostListData()
    }
  }
}

export default PostList
