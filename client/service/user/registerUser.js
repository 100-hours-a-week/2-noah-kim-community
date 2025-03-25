import { APIEndpoints } from '../endpoints.js'
import { Fetch } from '../Fetch.js'

const register = async ({ email, password, nickname, imageUrl }) => {
  const body = { email, password, nickname, imageUrl }

  const response = await Fetch(APIEndpoints.AUTH.REGISTER, { body })
  return response
}

export default register
