import { DUMMY_POSTS } from "/public/data/posts.js";

// utils
import { parseDateToFullString } from "../../../lib/date.js";
import { formatNumber } from "../../../lib/number.js";

const writePostBtn = document.getElementById("write-post");
const postList = document.getElementById("posts");

// 더미 포스트를 <li>로 추가하는 함수
DUMMY_POSTS.forEach((post) => {
  // <li> 요소 생성
  const li = document.createElement("li");
  li.className = "post";
  li.innerHTML = `
    <div id="post-header"> 
      <strong>${post.title}</strong> 
      <div id="post-header-details">
        <ul>  
          <li> 좋아요 ${formatNumber(post.likeCnt)}</li>
          <li> 댓글 ${formatNumber(post.comments.length)} </li>
          </li> 조회수 ${formatNumber(post.hitCnt)} </li>
        </ul>
        <span> ${parseDateToFullString(post.date)} </span>
      </div>
    </div> 
    <div id="post-footer"> 
      <div id="user-image"></div>
       ${post.userName}
    </div>
  `;

  // 게시글 클릭 시 상세 페이지 이동
  li.addEventListener("click", () => {
    window.location.href = `/pages/post/detail/index.html`;
  });

  postList.appendChild(li); // <ul>에 <li> 추가
});

writePostBtn?.addEventListener("click", () => {
  window.location.href = `/pages/post/write/index.html`;
});

document.addEventListener("DOMContentLoaded", function () {
  const postTitles = document.querySelectorAll("#post-header strong");

  postTitles.forEach((strong) => {
    const trimText = strong.textContent?.trim();
    if (trimText.length > 26) {
      const overflowText = `${trimText.substring(0, 26)}...`;
      strong.textContent = overflowText; // 26자까지만 표시
    }
  });
});
