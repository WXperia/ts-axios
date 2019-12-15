// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
  // import "core-js/fn/array.find"
  // ...
  //import 定义config类型
import {AxiosRequestConfig} from './types/index'
import {xhr} from './xhr'
import {buildURL} from './helpers/url'
function axios (config:AxiosRequestConfig):void{
    //TODO
    processConfig(config)
    xhr(config)
}
function processConfig(config:AxiosRequestConfig):void{
    config.url = transformURL(config)
}
function transformURL(config:AxiosRequestConfig){
    const {url,params} = config
    return buildURL(url,params)
}
export default axios