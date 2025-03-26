import { getAccessToken } from '../lib/utils/auth.js'
import { APIEndpoints } from './endpoints.js'
import { Fetch } from './Fetch.js'

export const createPost = async ({ title, content, imageUrl }) => {
  const ENDPOINT = APIEndpoints.POST.CREATE

  const token = getAccessToken()
  const body = { title, content, imageUrl }

  const response = await Fetch(ENDPOINT, { body, token })
  return response
}

export const getPost = async ({ postId }) => {
  const ENDPOINT = APIEndpoints.POST.DETAILS(postId)

  const token = getAccessToken()

  const response = await Fetch(ENDPOINT, { token })
  return response
}

/**
 * 댓글 관련 API
 */
export const createComment = async ({ postId, content }) => {
  const ENDPOINT = APIEndpoints.COMMENT.CREATE(postId)

  const token = getAccessToken()
  const body = { content }

  const response = await Fetch(ENDPOINT, { body, token })
  return response
}
