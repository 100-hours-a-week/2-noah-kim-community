import { getAccessToken } from '../lib/utils/auth.js'
import { API_BASE_URL } from './endpoints.js'

/**
 * API 요청을 처리하는 커스텀 fetch 함수
 * @param {object} endpoint API_ENDPOINTS 객체 중 하나
 * @param {object} options 요청 옵션 (body, params 등)
 * @returns {Promise<object>} API 응답 결과
 */
export const Fetch = async (endpoint, options = {}) => {
  const { method, url } = endpoint

  const { params = {}, body, headers = {}, auth = false } = options

  // 쿼리 파라미터 처리
  const queryString = new URLSearchParams(params).toString()
  const fullEndpoint = `${API_BASE_URL}${url}${queryString ? `?${queryString}` : ''}`

  const fetchOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  }

  // AT가 있다면 Authorization 헤더 추가
  if (auth) {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: '유저 인증 실패' }
    }
    fetchOptions.headers['Authorization'] = `Bearer ${accessToken}`
  }

  if (body) {
    fetchOptions.body = JSON.stringify(body)
  }

  try {
    const response = await fetch(fullEndpoint, fetchOptions)

    /** 204는 본문이 없다. */
    if (response.status === 204) {
      return { success: true, data: null }
    }

    const data = await response.json()
    if (!response.ok) {
      return { success: false, error: data.message || 'API 요청 실패', status: response.status }
    }

    return { success: true, data }
  } catch (error) {
    return { success: false, error: error.message || '네트워크 오류' }
  }
}
