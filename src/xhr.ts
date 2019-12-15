import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from './types'
import { parseResponseHeaders } from './helpers/header';
import {ErrorFactory} from './helpers/error'
import { request } from 'http';
export function xhr(config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve, reject) => {
        const { url, method = 'get', data = null, params = null, isasync = true, headers, responseType = 'json', isJSON = false, timeout } = config
        const XHR = new XMLHttpRequest();
        if (responseType) {
            XHR.responseType = responseType
        }
        if (timeout) {
            XHR.timeout = timeout
        }
        XHR.open(method.toUpperCase(), url, isasync)
        //header 当 data为空时删除 header
        
        XHR.onreadystatechange = function handleLoad() {
            /* 
                0	UNSENT	代理被创建，但尚未调用 open() 方法。
                1	OPENED	open() 方法已经被调用。
                2	HEADERS_RECEIVED	send() 方法已经被调用，并且头部和状态已经可获得。
                3	LOADING	下载中； responseText 属性已经包含部分数据。
                4	DONE	下载操作已完成。
            */
            if (XHR.readyState !== 4) {
                return 
            }
            if (XHR.status === 0) {
                return 
            }
            
            const responseHeader = parseResponseHeaders(XHR.getAllResponseHeaders())
            const responseData = responseType === 'text' ? XHR.responseText : XHR.response
            const response: AxiosResponse = {
                data: responseData,
                status: XHR.status,
                statusText: XHR.statusText,
                headers: responseHeader,
                config,
                request: XHR
            }
            handleResponse(response)
        }
        /* 
            error
        */
        XHR.onerror = function handleError() {
            return reject(ErrorFactory('NetWork Error',config,null,request))
        }
        XHR.ontimeout = function handleTimeOut(){
            return reject(ErrorFactory(`TimeOut of ${timeout}`,config,'ECONNABORTED',request))
        }
        function handleResponse(response: AxiosResponse){
            if(response.status>=200 && response.status<=300){
                resolve(response)
            }else {
                
                reject(ErrorFactory(`Request faild width status ${response.status}`,config,null,request,response))
            }
        }
        Object.keys(headers).forEach(name => {
            if (data === null && name.toLowerCase() === 'content-type') {
                delete headers[name]
            } else {
                XHR.setRequestHeader(name, headers[name])
            }
        })
        XHR.send(data)
    })
}