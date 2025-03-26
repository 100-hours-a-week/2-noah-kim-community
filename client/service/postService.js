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
