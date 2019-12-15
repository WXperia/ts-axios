// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
//import 定义config类型
import { AxiosRequestConfig } from './types/index'
import { xhr } from './xhr'
import { buildURL } from './helpers/url'
import { transFormRequest } from './helpers/data'
import { processHeaders } from './helpers/header'
function axios(config: AxiosRequestConfig): void {
  //TODO
  processConfig(config)
  xhr(config)
}
function processConfig(config: AxiosRequestConfig): void {
  //header设置需要在data之前进行，否则data会被修改为 JSON字符串
  config.headers = transfromHeaders(config)
  config.url = transformURL(config)
  config.data = transfromData(config)
  
}
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}
function transfromData(config: AxiosRequestConfig): any {
  return transFormRequest(config.data)
}
function transfromHeaders(config: AxiosRequestConfig): any {
  const {headers = {},data} = config
  return processHeaders(headers,data)
}
export default axios