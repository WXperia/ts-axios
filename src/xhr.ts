import { AxiosRequestConfig } from './types'

export function xhr(config: AxiosRequestConfig): void {
    const { url, method = 'get', data = null, params = null, isasync = true, headers} = config
    const XHR = new XMLHttpRequest();
    XHR.open(method.toUpperCase(), url, isasync)
    //header 当 data为空时删除 header
    Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
            delete headers[name]
        }else {
            XHR.setRequestHeader(name, headers[name])
        }
        
    })
    XHR.send(data)
}