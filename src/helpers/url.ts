import { isDate, isPlainObject } from './util'

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
export function buildURL(url: string, param?: any): string {
    // let newURL:string = '';
    if (!param) {
        return url
    }
    const parts: string[] = [];
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
    let serialzedParams = parts.join('');
    if (serialzedParams) {
        const markIndex = url.indexOf('#');
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
