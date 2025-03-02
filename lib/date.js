// ISO String 형식에서 "yyyy-mm-dd hh:mm:ss" 형태로 표기
export const parseDateToFullString = (date) => {
  return date.toISOString().replace("T", " ").substring(0, 19);
};
