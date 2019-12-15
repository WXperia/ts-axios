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