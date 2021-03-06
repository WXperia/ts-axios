import { isPlainObject } from './util'
import { Method } from '../types'
import { deepMerge } from '../core/mergeConfig'
function normalizeHeaderName(headers: any, normalizedName: string): void {
    if (!headers) {
        return
    }
    Object.keys(headers).forEach(name => {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
            headers[normalizedName] = headers[name]
            delete headers[name]
        }
    })
}

export function processHeaders(headers: any, data: any): any {
    normalizeHeaderName(headers, 'Content-Type')

    if (isPlainObject(data)) {
        if (headers && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json;charset=utf-8'
        }
    }
    return headers
}
export function parseResponseHeaders(responseHeaders: string): any {
    let parsed = Object.create(null)
    if (!responseHeaders) {
        return parsed
    }
    responseHeaders.split('\r\n').forEach(value => {
        let [key, val] = value.split(':')
        key = key.trim().toLowerCase()
        if (!key) {
            return
        }
        if (val) {
            val = val.trim().toLowerCase()
        }
        parsed[key] = val
    })
    return parsed
}

export function faltterHeaders(headers: any, method: Method): any {
    if (!headers) {
        return headers
    }
    headers = deepMerge(headers.common, headers[method], headers)
    const methodDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']
    methodDelete.forEach(key => {
        delete headers[key]
    })
    return headers
}