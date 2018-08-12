/** @flow */

/** 用户基本信息表 */
export interface Syusrinf {

  /** 客户端语言 */
  language?: string

  /** 流水号 */
  suiseqcod?: string

  /** 用户名 */
  suiusrnam?: string

  /** MD5密码 */
  suipaswrd?: string

  /** 手机号码 */
  suimobile?: string

  /** 版本 */
  suiverson?: string

  /** MD5新密码 */
  newpaswrd?: string

}