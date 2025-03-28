import { APIEndpoints } from './endpoints.js'
import { Fetch } from './Fetch.js'

export const registerUser = async ({ email, password, nickname, imageUrl }) => {
  const ENDPOINT = APIEndpoints.AUTH.REGISTER
  const body = { email, password, nickname, imageUrl }

  const response = await Fetch(ENDPOINT, { body })
  return response
}

export const loginUser = async ({ email, password }) => {
  const ENDPOINT = APIEndpoints.AUTH.LOGIN
  const body = { email, password }

  const response = await Fetch(ENDPOINT, { body })
  return response
}

export const getUser = async () => {
  const ENDPOINT = APIEndpoints.AUTH.GET_USER

  const response = await Fetch(ENDPOINT, { auth: true })
  return response
}

export const modifyUser = async ({ nickname, imageUrl }) => {
  const ENDPOINT = APIEndpoints.AUTH.MODIFY

  const body = { nickname, imageUrl }

  const response = await Fetch(ENDPOINT, { body, auth: true })
  return response
}

export const unregisterUser = async () => {
  const ENDPOINT = APIEndpoints.AUTH.UNREGISTER

  const response = await Fetch(ENDPOINT, { auth: true })
  return response
}

export const modifyPasswordUser = async ({ password }) => {
  const ENDPOINT = APIEndpoints.AUTH.MODIFY_PASSWORD

  const body = { password }

  const response = await Fetch(ENDPOINT, { body, auth: true })
  return response
}
