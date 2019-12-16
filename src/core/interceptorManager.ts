import { ResolveFn, RejectFn } from "../types";

interface interceptor<T> {
    resolved: ResolveFn<T>
    rejected?: RejectFn
}

export default class interceptorManager<T>{
    private interceptors: Array<interceptor<T> | null> 
    constructor() {
        this.interceptors = []

    }
    use(resolved: ResolveFn<T>, rejected?: RejectFn): number {
        this.interceptors.push(
            {
                resolved,
                rejected
            }
        )
        return this.interceptors.length - 1
    }
    //fn:() 括号内是即将要传入的形参 callback
    forEach(fn:(interceptor: interceptor<T>,id:number)=>void):void{
        this.interceptors.forEach((interceptor,value)=>{
            if(interceptor !== null){
                fn(interceptor,value)
            }
        })
    }
    eject(id:number){
        if(this.interceptors[id]){
            //删除函数
            this.interceptors[id] = null;
        }
    }
}