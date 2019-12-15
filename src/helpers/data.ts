import { isPlainObject } from './util'

export function transFormRequest(data: any): any {
    if (isPlainObject(data)) {
        return JSON.stringify(data)
    }
    return data

}