import Button from '../../components/common/Button/Button.js'
import Component from '../../components/common/Component.js'
import Modal from '../../components/common/Modal/Modal.js'
import Toast from '../../components/common/Toast/Toast.js'
import { validateNicknameInput } from '../../lib/validation/inputValidations.js'
import { ROUTES } from '../../public/data/routes.js'
import { navigateTo } from '../../router.js'
import { getUser, modifyUser, unregisterUser } from '../../service/userService.js'
class Mypage extends Component {
  setup() {
    /** 상태 정의 */
    this.$state = {
      /** TODO: 실제 프로필 이미지 저장하기 */
      profileImage: '',
      email: '',
      nickname: '',
      nicknameInput: '',
    }

    this.loadStyles()
    this.fetchUserData()
  }
  loadStyles() {
    super.loadStyles('/styles/auth/mypage.css')
  }

  template() {
    // TODO: 실제 페칭해온 데이터로 바꾸기
    const ImageSrc = `../../public/images/header_image.jpeg`
    return `
    <main id="main-content">
      <div id="title">회원정보수정</div>

      <form id="mypage-form">
        <!-- 프로필 사진 업로드 -->
        <div class="data" id="profile">
          <span class="data-title">프로필 사진*</span>
          <img
            id="profile-image"
            src=${ImageSrc}
            alt="프로필 이미지"
          />
        </div>

        <!-- 이메일 -->
        <div class="data" id="email">
          <span class="data-title">이메일</span>
          <span id="data-email">${this.$state.email}</span>
        </div>

        <!-- 닉네임 -->
        <div class="data" id="nickname">
          <span class="data-title" for="nickname">닉네임</span>
          <input
            type="text"
            id="nickname-val"
            value="${this.$state.nicknameInput}"
            placeholder="닉네임을 입력하세요"
          />
          <div class="error-message" id="nickname-error">* helper text</div>
          <button id="modify-button"></button>
        </div>
      </form>

      <button id="unregister-button"></button>
    </main>`
  }

  mounted() {
    // DOM 요소 저장
    this.$elements = {
      nicknameInput: this.$target.querySelector('#nickname-val'),
      nicknameErrorText: this.$target.querySelector('#nickname-error'),
      modifyButton: this.$target.querySelector('#modify-button'),
      unregisterButton: this.$target.querySelector('#unregister-button'),
      unconfirmButton: this.$target.querySelector('#cancel-button'),
    }

    // 자식 요소 정의
    new Button(this.$elements.modifyButton, {
      text: '수정하기',
      onClick: this.modifyHandler.bind(this),
      idName: 'modify-button',
    })

    new Button(this.$elements.unregisterButton, {
      text: '회원 탈퇴',
      onClick: this.unregisterHandler.bind(this),
      idName: 'unregister-button',
    })
  }

  setEvent() {
    this.addEvent(this.$elements.nicknameInput, 'input', event => {
      event.preventDefault()
      event.stopPropagation()
      this.setState({ nicknameInput: event.target.value })
      this.validateNickname
    })
  }

  /** 닉네임 유효성 검사 */
  validateNickname() {
    return validateNicknameInput(this.$elements.nicknameInput, this.$elements.nicknameErrorText)
  }

  /** 수정하기 로직 */
  async modifyHandler(event) {
    const nickname = this.$state.nickname
    const nicknameInput = this.$state.nicknameInput
    event.preventDefault() // 기본 동작 방지

    /** 닉네임이 기존과 바뀐게 없는 경우 */
    if (!nicknameInput || nickname === nicknameInput) {
      new Toast({ message: '닉네임 변경사항이 없습니다' })
      return
    }

    const body = {
      nickname: nicknameInput,
      imageUrl: `../../public/images/header_image`,
    }
    const response = await modifyUser(body)

    if (response.success) {
      // 바뀐 닉네임 최신화
      this.setState({
        nickname,
      })

      new Toast({ message: '수정 완료' })
    } else {
      new Toast({ message: '유저 정보 가져오기에 실패하였습니다' })
    }
  }

  /** 회원탈퇴 로직 */
  unregisterHandler() {
    new Modal({
      title: '회원탈퇴 하시겠습니까?',
      message: '작성된 게시글과 댓글은 삭제됩니다.',
      confirmText: '확인',
      cancelText: '취소',
      onConfirm: this.unregister.bind(this),
    })
  }

  /** 유저 정보 가져오기 */
  async fetchUserData() {
    const response = await getUser()
    if (response.success) {
      const { message, data } = response.data
      const { userId, email, nickname, imageUrl } = data

      this.setState({
        profileImage: imageUrl,
        email: email,
        nickname: nickname,
      })
    } else {
      new Toast({ message: '유저 정보 가져오기에 실패하였습니다.' })
    }
  }

  /** 회원탈퇴 */
  async unregister() {
    const response = await unregisterUser()
    if (response.success) {
      navigateTo(ROUTES.AUTH.LOGIN.url)
      new Toast({ message: '회원탈퇴 성공!' })
    } else {
      new Toast({ message: '유저 정보 가져오기에 실패하였습니다.' })
    }
  }
}

export default Mypage
