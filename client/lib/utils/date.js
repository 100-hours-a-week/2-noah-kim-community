// ISO String -> "yyyy-mm-dd hh:mm:ss" 형태로 표기
export const parseISOToFullString = ISOString => {
  if (ISOString) return ISOString.replace('T', ' ').substring(0, 19)
  else return ''
}
// Date 객체 -> ISO String -> "yyyy-mm-dd hh:mm:ss" 형태로 표기
export const parseDateToFullString = date => {
  return date.toISOString().parseISOToFullString()
}
