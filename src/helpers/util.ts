const OBJ_PROTO_TOSTRING = Object.prototype.toString;
export function isDate(val?: any): val is Date {
    return OBJ_PROTO_TOSTRING.call(val) === '[object Date]'
}
export function isObject(val?: any): val is Object {
    return val !== null && typeof val === 'object'
}

export function isPlainObject(val: any): val is Object {
    return OBJ_PROTO_TOSTRING.call(val) === '[object Object]'
}
export function isString(val: any):val is string {
    return OBJ_PROTO_TOSTRING.call(val) === '[object String]'
}
export function extend<T,U>(to:T,from:U):T&U {
    for(const key in from){
        (to as T & U)[key] = from[key] as any
    }
    return to as T&U
}