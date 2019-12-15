import { isPlainObject,isString } from './util'

export function transFormRequest(data: any): any {
    if (isPlainObject(data)) {
        return JSON.stringify(data)
    }
    return data

}
export function transFormResponse(data: any){
    if(!data){
        return
    }
    if(isString(data)){
        try{
           data =  JSON.parse(data)
        }catch(e){
            //do nothing
        }
       
    }
    return data
}