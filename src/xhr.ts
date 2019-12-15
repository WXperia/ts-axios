import {AxiosRequestConfig} from './types'

export function xhr(config:AxiosRequestConfig):void{
    const {url,method='get',data=null,params=null,isasync=true} = config
    const XHR = new XMLHttpRequest();
    XHR.open(method.toUpperCase(),url,isasync)
    XHR.send(data)
}