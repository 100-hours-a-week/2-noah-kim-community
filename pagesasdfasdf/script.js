import { URL } from "../public/routes.js";

document.addEventListener("DOMContentLoaded", function () {
  const profileImage = document.getElementById("header-image");
  const headerDropdownMenu = document.getElementById("header-dropdown-menu");

  const mypageLink = document.getElementById("mypage-link");
  const passwordChangeLink = document.getElementById("password-change-link");
  const logoutLink = document.getElementById("logout-link");

  function toggleHeaderDropdownMenu(event) {
    event.stopPropagation(); // 클릭 이벤트 전파 방지

    headerDropdownMenu.style.display =
      headerDropdownMenu.style.display !== "block" ? "block" : "none";
  }

  function outsideClick(event) {
    if (
      !headerDropdownMenu.contains(event.target) &&
      event.target !== profileImage
    ) {
      headerDropdownMenu.style.display = "none";
    }
  }

  // 프로필 이미지 클릭 이벤트
  profileImage.addEventListener("click", toggleHeaderDropdownMenu);

  // 외부 클릭 시 메뉴 닫기
  document.addEventListener("click", outsideClick);

  // 라우팅
  mypageLink.addEventListener("click", () => {
    window.location.href = URL.AUTH.PROFILE_CHANGE.url;
  });
  passwordChangeLink.addEventListener("click", () => {
    window.location.href = URL.AUTH.PASSWORD_CHANGE.url;
  });
  // TODO: 로그아웃 이벤트 등록하기
  // logoutLink.addEventListener(
  //   "click",
  //   (window.location.href = URL.AUTH.LOGIN.url)
  // );
});
