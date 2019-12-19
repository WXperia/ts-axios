// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
//import 定义config类型
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { xhr } from './xhr'
import { buildURL } from '../helpers/url'
// import { transFormRequest, transFormResponse } from '../helpers/data'
import { faltterHeaders } from '../helpers/header'
import transform from './transfrom'
function requestDispatch(config: AxiosRequestConfig): AxiosPromise {
    //TODO
    processConfig(config)
    throwIfCancellationRequested(config)
    return xhr(config).then(res => {
        return transFormResponseData(res)

    })
}
function processConfig(config: AxiosRequestConfig): void {
    //header设置需要在data之前进行，否则data会被修改为 JSON字符串
    // config.headers = transfromHeaders(config)
    config.url = transformURL(config)
    config.data = transform(config.data, config.headers, config.transformRequest)
    config.headers = faltterHeaders(config.headers, config.method!)
}
function transformURL(config: AxiosRequestConfig): string {
    const { url, params } = config
    return buildURL(url!, params)
}
function transFormResponseData(res: AxiosResponse): AxiosResponse {
    res.data = transform(res.data, res.headers, res.config.transformResponse)
    return res
}
function throwIfCancellationRequested(config:AxiosRequestConfig):void{
    if(config.cancelToken){
        config.cancelToken.throwIfRequested()
    }
}
export default requestDispatch