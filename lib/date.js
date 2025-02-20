export const parseDateToFullString = (date) => {
  return date.toISOString().replace("T", " ").substring(0, 19);
};
