import { APIEndpoints } from './endpoints.js'
import { Fetch } from './Fetch.js'

export const uploadS3Image = async formData => {
  const ENDPOINT = APIEndpoints.COMMON.UPLOAD_IMAGE

  const body = formData

  const response = await Fetch(ENDPOINT, { body })
  return response
}

export const deleteS3Image = async imageUrl => {
  const ENDPOINT = APIEndpoints.COMMON.DELETE_IMAGE

  const params = { imageUrl }

  const response = await Fetch(ENDPOINT, { params })
  return response
}
