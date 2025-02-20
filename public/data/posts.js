/**
  댓글에 포함된 정보
  - 작성자
  - 작성자 이미지 (스켈레톤으로 대체)
  - 작성시간
  - 댓글내용
 */

export const DUMMY_COMMENT = {
  userName: "더미 댓글 작성자",
  // userImage: "",
  date: new Date(),
  content: "더미 댓글",
};

// 더미 댓글 3개
export const DUMMY_COMMENTS = Array.from({ length: 3 }, (_, index) => ({
  userName: `${DUMMY_COMMENT.userName}${index + 1}`,
  date: new Date(Date.now() - Math.floor(Math.random() * 1000000000)), // 과거 랜덤 날짜
  content: `${DUMMY_COMMENT.content}${
    index + 1
  }입니다. 댓글 내용은 뭐 차차 넣기로 하죠`,
}));

/**
  게시글에 포함된 정보
  - 제목
  - 작성자
  - 작성자 이미지 (스켈레톤으로 대체)
  - 작성 시간
  
  - 썸네일 이미지 (스켈레톤으로 대체)
  - 내용
  - 댓글들

  - 좋아요 수
  - 조회수
  - (댓글 수) : 댓글의 개수로 판단 가능
 */
const DUMMY_POST = {
  title: "제목",
  userName: "더미 작성자",
  userImage: "",
  date: new Date(),

  content: "더미 콘텐츠",
  comments: DUMMY_COMMENTS,

  likeCnt: 200000,
  hitCnt: 3120,
};

// 더미 포스트 5개
export const DUMMY_POSTS = Array.from({ length: 5 }, (_, index) => ({
  ...DUMMY_POST,
  title: `더미 게시글${index + 1}`,
  userName: `작성자 ${index + 1}`, // A, B, C, D, E
  likeCnt: DUMMY_POST.likeCnt + Math.floor(Math.random() * 50), // 10 ~ 59 랜덤 좋아요 수
  hitCnt: DUMMY_POST.hitCnt + Math.floor(Math.random() * 100), // 20 ~ 119 랜덤 조회 수
  date: new Date(Date.now() - Math.floor(Math.random() * 1000000000)), // 과거 랜덤 날짜
  content: `${DUMMY_POST.content}${
    index + 1
  } 입니다. 내용이 얼마나 긴지 상상이 안가시죠? 잘 읽어봅시다 화이팅입니다`,
}));
