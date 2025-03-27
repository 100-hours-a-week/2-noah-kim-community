import Button from '../../components/common/Button/Button.js'
import Component from '../../components/common/Component.js'
import Toast from '../../components/common/Toast/Toast.js'
import PostCard from '../../components/pages/post/PostCard.js'
import { ROUTES } from '../../public/data/routes.js'
import { navigateTo } from '../../router.js'
import { getPostList } from '../../service/postService.js'

const PAGE_SIZE = 6

class PostList extends Component {
  setup() {
    /** 상태 정의 */
    this.useState('postData', {
      posts: [],
      currentPage: 0,
      totalPages: 0,
    })

    this.loadStyles()
    this.fetchPostListData()
  }
  loadStyles() {
    super.loadStyles('/styles/post/list.css')
  }

  template() {
    return `
      <main id="main-content">
        <section id="title">
          <span>안녕하세요,</span>
          <span>아무 말 대잔치 <strong>게시판</strong>입니다.</span>
        </section>
        <button id="write-button"></button>
        <ul id="posts"></ul>
      </main>
    `
  }

  mounted() {
    // DOM 요소 저장
    this.$elements = {
      writePostButton: this.$target.querySelector('#write-button'),

      postList: this.$target.querySelector('#posts'),
    }

    // 자식 요소 정의
    new Button(this.$elements.writePostButton, {
      text: '게시글 작성',
      onClick: this.navigateToWritePostRoute.bind(this),
      idName: 'write-button',
    })

    // 게시글들
    const posts = this.postData.posts
    posts.forEach(post => {
      const postWrapper = document.createElement('div')
      this.$elements.postList.appendChild(postWrapper)

      new PostCard(postWrapper, {
        ...post,
      })
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
    const { posts, currentPage } = this.postData
    const response = await getPostList({ currentPage: currentPage, pageSize: PAGE_SIZE })
    if (response.success) {
      const { message, data } = response.data
      const { page, content } = data
      const { totalPages, totalElements } = page

      this.setPostData({
        posts: [...posts, ...content],
        currentPage: currentPage + 1,
        totalPages: totalPages,
      })
    } else {
      new Toast({ message: '게시글 목록 가져오기 실패' })
    }
  }

  handleScroll() {
    const scrollBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
    if (scrollBottom && this.postData.totalPages !== this.postData.currentPage) {
      this.fetchPostListData()
    }
  }
}

export default PostList
