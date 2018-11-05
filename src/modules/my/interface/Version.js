/** @flow */

export interface Version {

  /** 服务器返回的应用名称 */
  appName?: string

  /** 服务器返回的最新版本 */
  newVersion?: string

  /** 服务器返回的最低版本 */
  minVersion?: string

  /** 服务器返回的更新地址 */
  url?: string

  /** 服务器返回的更新文案 */
  updateDescription?: string

}