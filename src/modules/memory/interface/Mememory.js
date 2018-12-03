/** @flow */

/** 回忆-回忆信息表 */
export interface Mememory {

  /** 流水号 */
  mmrseqcod?: string

  /** 用户流水号 */
  mmrusrseq?: string

  /** 标题 */
  mmrmtitle?: string

  /** 内容 */
  mmrcontnt?: string

  /** 归档日期 */
  mmroccdat?: string

  /** 创建时间 */
  mmrnewtim?: string

  /** 版本 */
  mmrverson?: string

  /** 归档日期 - 区间结束 */
  mmroccdatEnd?: string

  /** 分页索引 */
  pageIndex?: number

  /** 每页数量 */
  pageSize?: number

}