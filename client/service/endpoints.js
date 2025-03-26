export const API_BASE_URL = 'http://localhost:8080' // 백엔드 기본 URL

// 공통 경로 정의
const AUTH_BASE = '/auth'
const POST_BASE = '/post'
const COMMENT_BASE = '/comment'
const LIKE_BASE = '/like'

const HTTPMethods = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  PUT: 'PUT',
  DELETE: 'DELETE',
}

// 엔드포인트 정의 (HTTP Method 포함)
const AuthEndpoints = {
  GET_USER: { method: HTTPMethods.GET, url: `${AUTH_BASE}` },
  REGISTER: { method: HTTPMethods.POST, url: `${AUTH_BASE}/register` },
  LOGIN: { method: HTTPMethods.POST, url: `${AUTH_BASE}/login` },
  MODIFY: { method: HTTPMethods.PATCH, url: `${AUTH_BASE}/modify` },
  UNREGISTER: { method: HTTPMethods.DELETE, url: `${AUTH_BASE}/unregister` },
  UPLOAD_PROFILE_IMAGE: { method: HTTPMethods.POST, url: `${AUTH_BASE}/profile/image` },
}

const PostEndpoints = {
  DETAILS: postId => ({ method: HTTPMethods.GET, url: `${POST_BASE}/${postId}` }),
  LIST: { method: HTTPMethods.GET, url: `${POST_BASE}/list` },
  CREATE: { method: HTTPMethods.POST, url: `${POST_BASE}` },
  MODIFY: { method: HTTPMethods.PUT, url: `${POST_BASE}` },
  DELETE: { method: HTTPMethods.DELETE, url: `${POST_BASE}/delete` },
}

const CommentEndpoints = {
  CREATE: postId => ({ method: HTTPMethods.POST, url: `${POST_BASE}/${postId}${COMMENT_BASE}` }),
  MODIFY: (postId, commentId) => ({ method: HTTPMethods.PATCH, url: `${POST_BASE}/${postId}${COMMENT_BASE}/${commentId}` }),
  DELETE: (postId, commentId) => ({ method: HTTPMethods.DELETE, url: `${POST_BASE}/${postId}${COMMENT_BASE}/${commentId}` }),
}

const LikeEndpoints = {
  CREATE: postId => ({ method: HTTPMethods.POST, url: `${POST_BASE}/${postId}${LIKE_BASE}` }),
  DELETE: postId => ({ method: HTTPMethods.DELETE, url: `${POST_BASE}/${postId}${LIKE_BASE}` }),
}

// 최종 API 객체
export const APIEndpoints = {
  AUTH: AuthEndpoints,
  POST: PostEndpoints,
  COMMENT: CommentEndpoints,
  LIKE: LikeEndpoints,
}
