import Component from "../../components/common/Component.js";
import { navigateTo, ROUTES } from "../../router.js";
class Mypage extends Component {
  setup() {
    this.loadStyles();
  }
  loadStyles() {
    super.loadStyles("/styles/auth/mypage.css");
  }

  template() {
    const ImageSrc = `../../public/images/header_image.jpeg`;
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
    </main>`;
  }

  mounted() {
    // DOM 요소 저장
    this.$elements = {
      nicknameInput: this.$target.querySelector("#nickname-val"),
      nicknameErrorText: this.$target.querySelector("#nickname-error"),
      modifyButton: this.$target.querySelector("#modify-button"),
      unregisterButton: this.$target.querySelector("#unregister-button"),
      unConfirmButton: this.$target.querySelector("#cancel-button"),
    };
  }

  setEvent() {
    this.addEvent("click", "#modify-button", this.openToast.bind(this));
    this.addEvent("click", "#nickname-val", this.validateNickname.bind(this));
    this.addEvent(
      "click",
      "#unregister-button",
      this.openUnregisterModal.bind(this)
    );
  }

  validateNickname() {
    const nickname = this.$elements.nicknameInput;
    const nicknameErrorText = this.$elements.nicknameErrorText;

    const nicknameValue = nickname.value;

    // 유효성 검사
    let isValid = true;
    let errorText = "";
    if (!nicknameValue) {
      errorText = "* 닉네임을 입력해주세요.";
      isValid = false;
    }
    // 중복된 닉네임 확인 로직
    // else if (nicknameValue.includes(" ")) {
    //   errorText = "* 띄어쓰기를 없애주세요.";
    //   isValid = false;
    // }
    else if (nicknameValue.length > 10) {
      errorText = "* 닉네임은 최대 10자까지 작성 가능합니다.";
      isValid = false;
    }

    // UI 업데이트
    if (!isValid) {
      nicknameErrorText.style.visibility = "visible";
      nicknameErrorText.textContent = errorText;
    } else {
      nicknameErrorText.style.visibility = "hidden";
    }
    return isValid;
  }

  openToast(event) {
    event.preventDefault(); // 폼 제출 방지

    // 토스트 메시지 생성
    const toast = document.createElement("div");
    toast.innerText = "수정완료";
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.backgroundColor = "#bca0ff";
    toast.style.color = "#fff";
    toast.style.padding = "10px 20px";
    toast.style.borderRadius = "10px";
    toast.style.fontSize = "16px";
    toast.style.fontWeight = "bold";
    toast.style.boxShadow = "0px 4px 6px rgba(0,0,0,0.1)";
    document.body.appendChild(toast);

    // 2초 후 토스트 메시지 제거
    setTimeout(() => {
      toast.remove();
    }, 2000);
  }

  openUnregisterModal() {
    // 모달 요소 생성
    const modal = document.createElement("div");

    modal.style.position = "fixed";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -50%)";
    modal.style.backgroundColor = "#fff";
    modal.style.padding = "30px 45px";
    modal.style.borderRadius = "10px";
    modal.style.boxShadow = "0px 4px 10px rgba(0,0,0,0.2)";
    modal.style.zIndex = "1000";

    modal.innerHTML = `
    <p style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">
      회원탈퇴 하시겠습니까?
    </p>
    <p style="font-size: 12px; margin-bottom: 20px;">
      작성된 게시글과 댓글은 삭제됩니다.
    </p>
    <div style="width: 100%; display: flex; justify-content:flex-end;">
    <button id="cancel-button" style="width:50%; background: black; color: white; padding: 10px 15px; border-radius: 8px; border: none; cursor: pointer; margin-right: 10px;">
      취소
    </button>
    <button id="confirm-button" style="width:50%; background: #bca0ff; color: white; padding: 10px 15px; border-radius: 8px; border: none; cursor: pointer;">
      확인
    </button>
    </div>
  `;

    document.body.appendChild(modal);

    // 확인 버튼 클릭 시 로그인 페이지로 이동
    document
      .getElementById("cancel-button")
      .addEventListener("click", function () {
        modal.remove();
      });
    document
      .getElementById("confirm-button")
      .addEventListener("click", function () {
        modal.remove();
        navigateTo(ROUTES.AUTH.LOGIN.url);
      });
  }
}

export default Mypage;
