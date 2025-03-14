import Button from '../../components/common/Button/Button.js'
import Component from '../../components/common/Component.js'
import Modal from '../../components/common/Modal/Modal.js'
import Toast from '../../components/common/Toast/Toast.js'
import { validateNicknameInput } from '../../lib/validation/inputValidations.js'
import { ROUTES } from '../../public/data/routes.js'
import { navigateTo } from '../../router.js'
class Mypage extends Component {
  setup() {
    this.loadStyles()
  }
  loadStyles() {
    super.loadStyles('/styles/auth/mypage.css')
  }

  template() {
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
          <span id="data-email">startupcode@gmail.com</span>
        </div>

        <!-- 닉네임 -->
        <div class="data" id="nickname">
          <span class="data-title" for="nickname">닉네임</span>
          <input
            type="text"
            id="nickname-val"
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
    this.addEvent(this.$elements.nicknameInput, 'input', this.validateNickname.bind(this))
  }

  /** 닉네임 유효성 검사 */
  validateNickname() {
    return validateNicknameInput(this.$elements.nicknameInput, this.$elements.nicknameErrorText)
  }

  /** 수정하기 로직 */
  modifyHandler(event) {
    // TODO: 중복 닉네임 확인 API 로직
    event.preventDefault() // 기본 동작 방지
    new Toast({
      message: '수정완료',
      clearTimeout: 2000,
    })
  }

  /** 회원탈퇴 로직 */
  unregisterHandler() {
    console.log('enetered')

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
}

export default Mypage
