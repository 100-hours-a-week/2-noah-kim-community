import Component from '../../components/common/Component.js'
import Modal from '../../components/common/Modal/Modal.js'
import Toast from '../../components/common/Toast/Toast.js'
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
          <button id="modify-button">수정하기</button>
        </div>
      </form>

      <button id="unregister-button">회원 탈퇴</button>
    </main>`
  }

  mounted() {
    // DOM 요소 저장
    this.$elements = {
      nicknameInput: this.$target.querySelector('#nickname-val'),
      nicknameErrorText: this.$target.querySelector('#nickname-error'),
      modifyButton: this.$target.querySelector('#modify-button'),
      unregisterButton: this.$target.querySelector('#unregister-button'),
      unConfirmButton: this.$target.querySelector('#cancel-button'),
    }
  }

  setEvent() {
    this.addEvent('click', this.$elements.modifyButton, this.openToast.bind(this))
    this.addEvent('input', this.$elements.nicknameInput, this.validateNickname.bind(this))
    this.addEvent('click', this.$elements.unregisterButton, this.openUnregisterModal.bind(this))
  }

  validateNickname() {
    const nickname = this.$elements.nicknameInput
    const nicknameErrorText = this.$elements.nicknameErrorText

    const nicknameValue = nickname.value

    // 유효성 검사
    let isValid = true
    let errorText = ''
    if (!nicknameValue) {
      errorText = '* 닉네임을 입력해주세요.'
      isValid = false
    }
    // 중복된 닉네임 확인 로직
    // else if (nicknameValue.includes(" ")) {
    //   errorText = "* 띄어쓰기를 없애주세요.";
    //   isValid = false;
    // }
    else if (nicknameValue.length > 10) {
      errorText = '* 닉네임은 최대 10자까지 작성 가능합니다.'
      isValid = false
    }

    // UI 업데이트
    if (!isValid) {
      nicknameErrorText.style.visibility = 'visible'
      nicknameErrorText.textContent = errorText
    } else {
      nicknameErrorText.style.visibility = 'hidden'
    }
    return isValid
  }

  openToast(event) {
    event.preventDefault() // 기본 동작 방지
    new Toast({
      message: '수정완료',
      clearTimeout: 2000,
    })
  }

  openUnregisterModal() {
    new Modal({
      title: '회원탈퇴 하시겠습니까?',
      message: '작성된 게시글과 댓글은 삭제됩니다.',
      confirmText: '확인',
      cancelText: '취소',
      onConfirm: () => {
        navigateTo(ROUTES.AUTH.LOGIN.url)
      },
    })
  }
}

export default Mypage
