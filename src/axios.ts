import { AxiosInstance, AxiosRequestConfig, AxiosStatic, CancelTokenStatic } from "./types";
import Axios from './core/Axios'
import { extend } from "./helpers/util";
import defaults from "./defaults";
import mergeConfig from "./core/mergeConfig";
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'
function createInstance(config: AxiosRequestConfig): AxiosStatic {
    console.log(config)
    //这里实现的是 axios.post / get /等.方法
    const context = new Axios(config);
    //这里实现的是 axios({url:'',method:'',headers:{}})方法
    const instance = Axios.prototype.request.bind(context)
    //组合到一起
    extend(instance, context)
    return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function (config): AxiosStatic {
    return createInstance(mergeConfig(defaults, config))
}
axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel
axios.all = function all(promises) {
    return Promise.all(promises)
}
axios.spread = function spread(callback) {
    return function wrap(arr) {
        return callback.apply(null, arr)
    }
}
axios.Axios = Axios
export default axios