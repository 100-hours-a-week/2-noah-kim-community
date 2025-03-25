import Button from '../../components/common/Button/Button.js'
import Component from '../../components/common/Component.js'
import Modal from '../../components/common/Modal/Modal.js'
import Toast from '../../components/common/Toast/Toast.js'
import { validateNicknameInput } from '../../lib/validation/inputValidations.js'
import { ROUTES } from '../../public/data/routes.js'
import { navigateTo } from '../../router.js'
import { getUser } from '../../service/userService.js'
class Mypage extends Component {
  setup() {
    /** 상태 정의 */
    this.$state = {
      /** TODO: 실제 프로필 이미지 저장하기 */
      profileImage: '',
      email: '',
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
    console.log(this.$state.nicknameInput)

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
      this.setState({ nicknameInput: event.target.value })
      this.validateNickname
    })
  }

  /** 닉네임 유효성 검사 */
  validateNickname() {
    return validateNicknameInput(this.$elements.nicknameInput, this.$elements.nicknameErrorText)
  }

  /** 수정하기 로직 */
  modifyHandler(event) {
    event.preventDefault() // 기본 동작 방지

    new Toast({
      message: '수정완료',
    })
  }

  /** 회원탈퇴 로직 */
  unregisterHandler() {
    new Modal({
      title: '회원탈퇴 하시겠습니까?',
      message: '작성된 게시글과 댓글은 삭제됩니다.',
      confirmText: '확인',
      cancelText: '취소',
      onConfirm: () => {
        // TODO: 회원 탈퇴 API 로직
        navigateTo(ROUTES.AUTH.LOGIN.url)
      },
    })
  }

  /** 유저 정보 가져오기 */
  async fetchUserData() {
    try {
      const response = await getUser()
      if (response.success) {
        const { message, data } = response.data
        const { userId, email, nickname, imageUrl } = data

        this.setState({
          profileImage: imageUrl,
          email: email,
        })
      } else {
        new Toast({ message: '유저 정보 가져오기에 실패하였습니다.' })
      }
    } catch (error) {
      new Toast({ message: '서버 오류 발생. 잠시 후 다시 시도해주세요.' })
    }
  }
}

export default Mypage
