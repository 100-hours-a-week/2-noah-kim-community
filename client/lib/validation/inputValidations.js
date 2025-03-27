/**
 * 인풋 요소들의 유효성 검사 함수 모듈
 */

/**
 * 이메일 유효성 검사
 * (False) 이메일 형식이 아닌 경우, 입력값이 없는 경우
 * @param {*} targetElement 인풋 요소
 * @param {*} errorTextElement 에러 텍스트
 * @returns 유효성 검사 여부 (Boolean)
 */
const validateEmailInput = (targetElement, errorTextElement) => {
  const email = targetElement.value.trim()
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  // 유효성 검사
  let isValid = true
  let errorText = ''

  if (!email) {
    errorText = '* 이메일을 입력해주세요.'
    isValid = false
  } else if (!emailRegex.test(email)) {
    errorText = '* 올바른 이메일 주소 형식을 입력해주세요.'
    isValid = false
  }

  // UI 업데이트
  if (!isValid) {
    errorTextElement.style.visibility = 'visible'
    errorTextElement.textContent = errorText
  } else {
    errorTextElement.style.visibility = 'hidden'
  }
  return isValid
}

/**
 * 이메일 유효성 검사
 * (False) 이메일 형식이 아닌 경우, 입력값이 없는 경우
 * @param {*} targetValue 인풋 요소값
 * @param {*} errorTextElement 에러 텍스트
 * @returns 유효성 검사 여부 (Boolean)
 */
const validateEmailInputTwo = (targetValue, errorTextElement) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  // 유효성 검사
  let isValid = true
  let errorText = ''

  if (!targetValue) {
    errorText = '* 이메일을 입력해주세요.'
    isValid = false
  } else if (!emailRegex.test(targetValue)) {
    errorText = '* 올바른 이메일 주소 형식을 입력해주세요.'
    isValid = false
  }

  // UI 업데이트
  if (!isValid) {
    errorTextElement.style.visibility = 'visible'
    errorTextElement.textContent = errorText
  } else {
    errorTextElement.style.visibility = 'hidden'
  }
  return isValid
}

/**
 * 비밀번호 유효성 검사
 * (조건) 8자 이상, 20자 이하, 대문자 소문자 숫자 특수문자를 각 1개 이상 포함
 * (False) 입력값이 없는 경우
 * @param {*} targetElement 인풋 요소
 * @param {*} errorTextElement 에러 텍스트
 * @returns 유효성 검사 여부 (Boolean)
 */
const validatePasswordInput = (targetElement, errorTextElement) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/

  // 유효성 검사
  let isValid = true
  let errorText = ''

  if (!targetElement.value) {
    errorText = '* 비밀번호를 입력해주세요.'
    isValid = false
  }
  // (2) 유효성 검증
  else if (!passwordRegex.test(targetElement.value)) {
    errorText = '* 비밀번호 형식이 올바르지 않습니다. (8~20자, 대문자, 소문자, 숫자, 특수문자 최소 1개 이상)'
    isValid = false
  }

  // UI 업데이트
  if (!isValid) {
    errorTextElement.style.visibility = 'visible'
    errorTextElement.textContent = errorText
  } else {
    errorTextElement.style.visibility = 'hidden'
  }
  return isValid
}

/**
 * 비밀번호 유효성 검사
 * (조건) 8자 이상, 20자 이하, 대문자 소문자 숫자 특수문자를 각 1개 이상 포함
 * (False) 입력값이 없는 경우
 * @param {*} passwordValue 인풋 요소
 * @param {*} errorTextElement 에러 텍스트
 * @returns 유효성 검사 여부 (Boolean)
 */
const validatePasswordInputTwo = (passwordValue, errorTextElement) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/

  // 유효성 검사
  let isValid = true
  let errorText = ''

  if (!passwordValue) {
    errorText = '* 비밀번호를 입력해주세요.'
    isValid = false
  }
  // (2) 유효성 검증
  else if (!passwordRegex.test(passwordValue)) {
    errorText = '* 비밀번호 형식이 올바르지 않습니다. (8~20자, 대문자, 소문자, 숫자, 특수문자 최소 1개 이상)'
    isValid = false
  }

  // UI 업데이트
  if (!isValid) {
    errorTextElement.style.visibility = 'visible'
    errorTextElement.textContent = errorText
  } else {
    errorTextElement.style.visibility = 'hidden'
  }
  return isValid
}

/**
 * 비밀번호 재확인 유효성 검사
 * (False) 입력값 없을 때, 비밀번호와 다를 때
 * @param {*} targetElement 인풋 요소
 * @param {*} confirmElement 인풀 검사 요소
 * @param {*} errorTextElement 에러 텍스트
 * @returns 유효성 검사 여부 (Boolean)
 */
const validatePasswordConfirmInput = (targetElement, confirmElement, errorTextElement) => {
  // 유효성 검사
  let isValid = true
  let errorText = ''
  if (!confirmElement.value) {
    errorText = '* 비밀번호를 한번더 입력해주세요.'
    isValid = false
  } else if (confirmElement.value !== targetElement.value) {
    errorText = '* 비밀번호가 다릅니다.'
    isValid = false
  }

  // UI 업데이트
  if (!isValid) {
    errorTextElement.style.visibility = 'visible'
    errorTextElement.textContent = errorText
  } else {
    errorTextElement.style.visibility = 'hidden'
  }
  return isValid
}

/**
 * 닉네임 유효성 검사
 * (조건) 띄어쓰기 불가, 10글자 이내
 * (False) 입력값 없을 때, 띄어쓰기 존재, 길이 11자 이상
 * @param {*} targetElement 인풋 요소
 * @param {*} errorTextElement 에러 텍스트
 * @returns 유효성 검사 여부 (Boolean)
 */
const validateNicknameInput = (targetElement, errorTextElement) => {
  // 유효성 검사
  let isValid = true
  let errorText = ''
  if (!targetElement.value) {
    errorText = '* 닉네임을 입력해주세요.'
    isValid = false
  } else if (targetElement.value.includes(' ')) {
    errorText = '* 띄어쓰기를 없애주세요.'
    isValid = false
  } else if (targetElement.value.length > 10) {
    errorText = '* 닉네임은 최대 10자까지 작성 가능합니다.'
    isValid = false
  }
  // TODO: 닉네임 중복 검사 API (회원가입)

  // UI 업데이트
  if (!isValid) {
    errorTextElement.style.visibility = 'visible'
    errorTextElement.textContent = errorText
  } else {
    errorTextElement.style.visibility = 'hidden'
  }
  return isValid
}

export {
  validateEmailInput,
  validateEmailInputTwo,
  validateNicknameInput,
  validatePasswordConfirmInput,
  validatePasswordInput,
  validatePasswordInputTwo,
}
