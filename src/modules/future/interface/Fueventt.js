/** @flow */

/** 未来-日程信息表 */
export interface Fueventt {

  /** 流水号 */
  fetseqcod?: string

  /** 用户流水号 */
  fetusrseq?: string

  /** 标题 */
  fetevttit?: string

  /** 备注 */
  fetevtnot?: string

  /** 日期 */
  fetoccdat?: string

  /** 全天 */
  fetallday?: string

  /** 开始时间 */
  fetstrdat?: string

  /** 结束时间 */
  fetenddat?: string

  /** 重复周期 */
  fetreccyc?: string

  /** 重复结束日期 */
  fetrecend?: string

  /** 版本 */
  fetverson?: string

  /** 本地字段-颜色 */
  color?: string

}