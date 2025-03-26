import { APIEndpoints } from './endpoints.js'
import { Fetch } from './Fetch.js'
/**
 * 게시글 관련 API
 */
// 게시글 생성
export const createPost = async ({ title, content, imageUrl }) => {
  const ENDPOINT = APIEndpoints.POST.CREATE

  const body = { title, content, imageUrl }

  const response = await Fetch(ENDPOINT, { body, auth: true })
  return response
}

// 게시글 수정
export const modifyPost = async ({ postId, title, content, imageUrl }) => {
  const ENDPOINT = APIEndpoints.POST.MODIFY(postId)

  const body = { title, content, imageUrl }

  const response = await Fetch(ENDPOINT, { body, auth: true })
  return response
}

// 게시글 삭제
export const deletePost = async ({ postId }) => {
  const ENDPOINT = APIEndpoints.POST.DELETE(postId)

  const response = await Fetch(ENDPOINT, { auth: true })
  return response
}

// 게시글 가져오기
export const getPost = async ({ postId }) => {
  const ENDPOINT = APIEndpoints.POST.DETAILS(postId)

  const response = await Fetch(ENDPOINT, { auth: true })
  return response
}

// 게시글 가져오기
export const getPostList = async ({ currentPage, pageSize }) => {
  const ENDPOINT = APIEndpoints.POST.LIST

  const params = {
    currentPage,
    pageSize,
  }

  const response = await Fetch(ENDPOINT, { params, auth: true })
  return response
}

/**
 * 댓글 관련 API
 */
// 댓글 생성
export const createComment = async ({ postId, content }) => {
  const ENDPOINT = APIEndpoints.COMMENT.CREATE(postId)

  const body = { content }

  const response = await Fetch(ENDPOINT, { body, auth: true })
  return response
}

// 댓글 수정
export const modifyComment = async ({ postId, commentId, content }) => {
  const ENDPOINT = APIEndpoints.COMMENT.MODIFY(postId, commentId)

  const body = { content }

  const response = await Fetch(ENDPOINT, { body, auth: true })
  return response
}

// 댓글 삭제
export const deleteComment = async ({ postId, commentId }) => {
  const ENDPOINT = APIEndpoints.COMMENT.DELETE(postId, commentId)

  const response = await Fetch(ENDPOINT, { auth: true })
  return response
}

/**
 * 좋아요 관련 API
 */
// 좋아요 생성
export const createLikes = async ({ postId }) => {
  const ENDPOINT = APIEndpoints.LIKE.CREATE(postId)

  const response = await Fetch(ENDPOINT, { auth: true })
  return response
}

// 좋아요 삭제
export const deleteLikes = async ({ postId }) => {
  const ENDPOINT = APIEndpoints.LIKE.DELETE(postId)

  const response = await Fetch(ENDPOINT, { auth: true })
  return response
}
