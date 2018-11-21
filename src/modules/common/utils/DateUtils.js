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

export const localDateString = (ISODateString: string = new Date().toJSON()): string => {
  let date = new Date(ISODateString)
  date.setHours(date.getHours() + 8)
  return date.toJSON().substr(0, 10)
}

export const transDateString = (date: string): string => {
  const year = date.substr(0, 4)
  const month = date.substr(5, 2)
  const day = date.substr(8, 2)
  return year + '年' + month + '月' + day + '日'
}