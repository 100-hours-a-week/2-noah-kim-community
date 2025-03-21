const API_BASE_URL = 'localhost:8080'

/**
 * API 요청을 처리하는 커스텀 fetch 함수
 * @param {object} endpoint API_ENDPOINTS 객체 중 하나
 * @param {object} options 요청 옵션 (body, params 등)
 * @returns {Promise<object>} API 응답 결과
 */
export const Fetch = async (endpoint, options = {}) => {
  const { method, url } = endpoint
  const requestUrl = typeof url === 'function' ? url(options.params) : url

  const config = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  }

  if (options.body) {
    config.body = JSON.stringify(options.body)
  }

  try {
    const response = await fetch(`${API_BASE_URL}${requestUrl}`, config)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data?.message || 'API 요청 실패')
    }

    return data
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error)
    return { success: false, message: error.message }
  }
}
