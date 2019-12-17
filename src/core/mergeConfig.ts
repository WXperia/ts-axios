import { AxiosRequestConfig } from "../types";
import { isPlainObject } from "../helpers/util";
const strats = Object.create(null)

function defaultStrat(val1?: any, val2?: any): any {
    return typeof val2 !== 'undefined' ? val2 : val1
}
function stratFromVal2(val1?: any, val2?: any): any {
   if(typeof val2 !== 'undefined') return val2
}
function deepMerge(...objs: any){
    const result = Object.create(null)

    Object.keys(objs).forEach(key=>{
        const obj = objs[key]
        if(obj){
            Object.keys(obj).forEach(key=>{
                let val = obj[key]
                if(isPlainObject(val)){
                    deepMerge(val)
                }else {
                    result[key] = val   
                }
            })
        }
    })
}
//深度合并策略
function deepMergeStrat(val1?:any,val2?:any) {
    if(isPlainObject(val2)){
        return deepMerge(val1,val2)
    }else if (typeof val2 !== 'undefined') {
        return val2
    }else if (isPlainObject(val1)){
        return deepMerge(val1)
    }else if (typeof val1 !== 'undefined') {
        return val1
    }
}
const stratKeysFromVal2 = ['data', 'params', 'url']
const deepMergeStratKeys = ['header']
deepMergeStratKeys.forEach(key=>{
    strats[key] = deepMergeStrat
})
stratKeysFromVal2.forEach(key => {
    strats[key] = stratFromVal2
})


export default function mergeConfig(config1: AxiosRequestConfig, config2?: AxiosRequestConfig) {
    if(!config2){
        config2 = {}
    }
    const config = Object.create(null)
    function mergeField(key: string){
        const strat = strats[key] || defaultStrat
        config[key] = strat(config1[key],config2![key])
    }
    for(let key in config2){
        mergeField(key)
    }
    for(let key in config1){
        if(!config2[key]){
            mergeField(key)
        }
    }
}