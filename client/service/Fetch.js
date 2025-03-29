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

  const { params = {}, body, headers = {}, auth = {} } = options

  const { token = false, required = true } = auth

  // 쿼리 파라미터 처리
  const queryString = new URLSearchParams(params).toString()
  const fullEndpoint = `${API_BASE_URL}${url}${queryString ? `?${queryString}` : ''}`

  const fetchOptions = {
    method,
    headers: {
      ...headers,
    },
  }

  // AT가 있다면 Authorization 헤더 추가
  if (token) {
    const accessToken = getAccessToken()
    if (required || (!required && accessToken)) {
      fetchOptions.headers['Authorization'] = `Bearer ${accessToken}`
    } else {
      return { success: false, error: '로그인이 필요합니다' }
    }
  }

  if (body) {
    const isFormData = body instanceof FormData

    /** FormData 핸들링 */
    if (isFormData) {
      fetchOptions.body = body

      // Content-Type은 설정하지 않음 → 브라우저가 자동으로 boundary 포함하여 설정
    } else {
      fetchOptions.headers['Content-Type'] = 'application/json'
      fetchOptions.body = JSON.stringify(body)
    }
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
