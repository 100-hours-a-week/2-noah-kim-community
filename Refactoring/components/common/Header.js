export default function Header() {
  return `
     <header>
  <span>아무 말 대잔치</span>
  <div id="header-image">
    <img src="/images/header_image.jpeg" alt="user-card-image" />
    <div id="header-dropdown-menu">
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
