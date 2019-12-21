import { isDate, isPlainObject, isURLSearchParams } from './util'

interface URLOrigin {
    protocol: string
    host: string
}
function encode(val: string): string {
    return encodeURIComponent(val)
        //g 全局查找， i 忽略大小写 
        .replace(/%40/g, '@')
        .replace(/%3A/ig, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/ig, ',')
        //空格换为+号
        .replace(/%20/g, '+')
        .replace(/%5B/ig, '[')
        .replace(/%5D/ig, ']')
        //RFC 3986
        .replace(/[!'()*]/g, function (c) {
            return '%' + c.charCodeAt(0).toString(16);
        });
}
export function isAbsoluteURL(url: string): boolean {
    return /(^[a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}
export function combineURL(baseURL: string, relativeURL?: string):string {
    return relativeURL? baseURL.replace(/\/+$/,'') + '/' + relativeURL.replace(/^\/+/,'') : baseURL
}
export function buildURL(url: string, param?: any, paramsSerializer?: (params: any) => string): string {
    // let newURL:string = '';
    if (!param) {
        return url
    }
    const parts: string[] = []
    let serialzedParams
    if (paramsSerializer) {
        serialzedParams = paramsSerializer(param)
    } else if (isURLSearchParams(param)) {
        serialzedParams = param.toString()
    } else {
        Object.keys(param).forEach(key => {
            const value = param[key]
            if (typeof value === 'undefined' || value === null) {
                return
            }
            let values = []
            if (Array.isArray(value)) {
                values = value
                key += '[]'
            } else {
                values = [value]
            }
            values.forEach(val => {
                if (isDate(val)) {
                    val = val.toISOString()
                } else if (isPlainObject(val)) {
                    val = JSON.stringify(val)
                }
                parts.push(`&${encode(key)}=${encode(val)}`)
            })
        })
        serialzedParams = parts.join('')
    }
    if (serialzedParams) {
        const markIndex = url.indexOf('#')
        if (markIndex !== -1) {
            url = url.slice(0, markIndex)
        }
        url += (url.indexOf('?') === -1 ? '?' : '&') + serialzedParams;
    }
    return url
}
const urlParsingNode = document.createElement('a')
const currentPageOrgin = resolveURL(window.location.href)
export function isURLSameOrigin(requestURL: string): boolean {
    const pasedOrgin = resolveURL(requestURL)
    return (pasedOrgin.protocol === currentPageOrgin.protocol && pasedOrgin.protocol === currentPageOrgin.protocol)
}
function resolveURL(url: string): URLOrigin {
    urlParsingNode.setAttribute('href', url)
    const { protocol, host } = urlParsingNode
    return { protocol, host }
}
