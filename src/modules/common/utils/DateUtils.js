/** @flow */

export const WEEK = (day: number): string => {
  if (day === 0) return '星期日'
  if (day === 1) return '星期一'
  if (day === 2) return '星期二'
  if (day === 3) return '星期三'
  if (day === 4) return '星期四'
  if (day === 5) return '星期五'
  if (day === 6) return '星期六'
  return '星期'
}