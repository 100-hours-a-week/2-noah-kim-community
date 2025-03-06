import { navigateTo, ROUTES } from "../../../router.js";
import Component from "../Component.js";

class Header extends Component {
  setup() {
    this.loadStyles();
  }
  loadStyles() {
    super.loadStyles("/components/common/Header/Header.css");
  }

  template() {
    return `
      <header>
        <span>아무 말 대잔치</span>
        <div id="image-container">
          <img src="/public/images/header_image.jpeg" alt="user-card-image" />
          <div id="dropdown-menu">
            <ul>
              <li id="mypage-link">회원정보수정</li>
              <li id="password-change-link">비밀번호수정</li>
              <li id="logout-link">로그아웃</li>
            </ul>
          </div>
        </div>
      </header>
    `;
  }

  setEvent() {
    const ImageContainer = this.$target.querySelector("#image-container");

    const DropdownMenu = this.$target.querySelector("#dropdown-menu");

    const mypageLink = this.$target.querySelector("#mypage-link");

    const passwordChangeLink = this.$target.querySelector(
      "#password-change-link"
    );
    const logoutLink = this.$target.querySelector("#logout-link");

    function toggleDropdownMenu(event) {
      // event.stopPropagation(); // 클릭 이벤트 전파 방지
      DropdownMenu.style.display =
        DropdownMenu.style.display !== "block" ? "block" : "none";
    }

    function outsideClick(event) {
      if (
        !DropdownMenu.contains(event.target) &&
        !event.target.closest("#header-image")
      ) {
        DropdownMenu.style.display = "none";
      }
    }

    /** 프로필 이미지 클릭 이벤트  */
    this.addEvent("click", "#header-image", toggleDropdownMenu);

    // 외부 클릭 시 메뉴 닫기
    // DropdownMenu.addEventListener("click", outsideClick);

    // this.addEvent("click", "#dropdown-menu", outsideClick);

    this.addEvent("click", "#mypage-link", () => {
      navigateTo(ROUTES.AUTH.MYPAGE.url);
    });

    this.addEvent("click", "#password-change-link", () => {
      navigateTo(ROUTES.AUTH.PASSWORD_CHANGE.url);
    });

    // TODO: 로그아웃 이벤트 등록하기
    this.addEvent("click", "#logout-link", () => {
      alert("로그아웃 성공");

      // navigateTo(ROUTES.AUTH.PASSWORD_CHANGE.url);
    });
  }
}

export default Header;
