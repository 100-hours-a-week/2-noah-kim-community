export const API_BASE_URL = 'http://localhost:8080' // 백엔드 기본 URL

// 공통 경로 정의
const AUTH_BASE = '/auth'
const POST_BASE = '/post'
const COMMENT_BASE = '/post/comment'
const LIKE_BASE = '/post/like'

const HTTPMethods = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  PUT: 'PUT',
  DELETE: 'DELETE',
}

// 엔드포인트 정의 (HTTP Method 포함)
const AuthEndpoints = {
  REGISTER: { method: HTTPMethods.POST, url: `${AUTH_BASE}/register` },
  LOGIN: { method: HTTPMethods.POST, url: `${AUTH_BASE}/login` },
  MODIFY: { method: HTTPMethods.PATCH, url: `${AUTH_BASE}/modify` },
  UNREGISTER: { method: HTTPMethods.DELETE, url: `${AUTH_BASE}/unregister` },
  UPLOAD_PROFILE_IMAGE: { method: HTTPMethods.POST, url: `${AUTH_BASE}/profile/image` },
}

const PostEndpoints = {
  DETAILS: postID => ({ method: HTTPMethods.GET, url: `${POST_BASE}/${postID}` }),
  LIST: { method: HTTPMethods.GET, url: `${POST_BASE}/list` },
  CREATE: { method: HTTPMethods.POST, url: `${POST_BASE}` },
  UPDATE: { method: HTTPMethods.PUT, url: `${POST_BASE}` },
  DELETE: { method: HTTPMethods.DELETE, url: `${POST_BASE}/delete` },
}

const CommentEndpoints = {
  ADD: { method: HTTPMethods.POST, url: `${COMMENT_BASE}` },
  UPDATE: commentId => ({ method: HTTPMethods.PATCH, url: `${COMMENT_BASE}/${commentId}` }),
}

const LikeEndpoints = {
  TOGGLE: { method: HTTPMethods.POST, url: `${LIKE_BASE}` },
}

// 최종 API 객체
export const APIEndpoints = {
  AUTH: AuthEndpoints,
  POST: PostEndpoints,
  COMMENT: CommentEndpoints,
  LIKE: LikeEndpoints,
}
