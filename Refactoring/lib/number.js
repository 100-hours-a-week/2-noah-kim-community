// 숫자 포맷 함수 (1K, 10K, 100K)
export const formatNumber = num => {
  if (num >= 100000) return `${Math.floor(num / 1000)}K`
  if (num >= 10000) return `${(num / 1000).toFixed(0)}K`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num
}
