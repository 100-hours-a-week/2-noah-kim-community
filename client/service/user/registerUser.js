import { APIEndpoints } from '../endpoints.js'
import { Fetch } from '../Fetch.js'

const register = async ({ email, password, nickname, image_url }) => {
  const body = { email, password, nickname, image_url }

  try {
    const response = await Fetch(APIEndpoints.AUTH.REGISTER, { body })
    return response
  } catch (error) {
    console.error(error)
    return { success: false, error } // 실패 응답 반환
  }
}

export default register
