import { AxiosInstance } from "./types";
import Axios from './core/Axios'
import { extend } from "./helpers/util";
function createInstance(): AxiosInstance {
    //这里实现的是 axios.post / get /等.方法
    const context  = new Axios();
    //这里实现的是 axios({url:'',method:'',headers:{}})方法
    const instance  = Axios.prototype.request.bind(context)
    //组合到一起
    extend(instance,context)
    return instance as AxiosInstance
}

const axios  = createInstance()

export default axios