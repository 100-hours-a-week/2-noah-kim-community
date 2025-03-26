import { parseISOToFullString } from '../../../lib/utils/date.js'
import { formatNumber } from '../../../lib/utils/number.js'
import { ROUTES } from '../../../public/data/routes.js'
import { navigateTo } from '../../../router.js'
import InlineComponent from '../../common/InlineComponent.js'

class PostCard extends InlineComponent {
  setup() {
    this.$state = {
      postData: this.$props.postData,
      userData: this.$props.userData,
    }

    this.loadStyles()
  }
  loadStyles() {
    super.loadStyles('/components/pages/post/PostCard.css')
  }

  template() {
    const { postId, title, content, likeCount, viewCount, commentCount, createdAt } = this.$state.postData
    const { userId, nickname, imageUrl } = this.$state.userData

    return `
      <li class='post'>
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
      </li>
    `
  }

  mounted() {}

  setEvent() {
    this.addEvent(this.$target, 'click', this.navigateToDetails.bind(this))
  }

  navigateToDetails() {
    navigateTo(ROUTES.POST.DETAIL.url(this.$state.postData.postId))
  }
}

export default PostCard
