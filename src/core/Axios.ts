import { AxiosRequestConfig, AxiosPromise, Method, AxiosResponse, ResolveFn, RejectFn } from "../types";
import requestDispatch from './requestDispatch'
import interceptorManager from './interceptorManager'

interface interceptors {
    request: interceptorManager<AxiosRequestConfig>
    response: interceptorManager<AxiosResponse>
}
interface PromiseChain<T> {
    resolved: ResolveFn<T> | ((config: AxiosRequestConfig) => AxiosResponse)
    rejected?: RejectFn
}
export default class Axios {
    defaults: AxiosRequestConfig
    interceptors: interceptors
    constructor(defaultsConfig:AxiosRequestConfig) {
        this.defaults = defaultsConfig
        this.interceptors = {
            request: new interceptorManager<AxiosRequestConfig>(),
            response: new interceptorManager<AxiosResponse>()
        }
    }
    request(url: any, config?: any): AxiosPromise {
        if (typeof url === 'string') {
            if (!config) {
                config = {}
            }
            config.url = url
        } else {
            config = url
        }
        const chain: PromiseChain<any>[] = [{
            //将链式调用的最后一项定义为 requestDispatch 通过 promise.then来发起请求。
            resolved: requestDispatch,
            rejected: undefined
        }]
        this.interceptors.request.forEach(interceptor => {
            chain.unshift(interceptor)
        })
        this.interceptors.response.forEach(interceptor => {
            chain.push(interceptor)
        })
        let promise = Promise.resolve(config)
        while (chain.length) {
            const { resolved, rejected } = chain.shift()!
            promise = promise.then(resolved, rejected)
            
        }
        return promise
        // return requestDispatch(config)
    }

    _requestMethodWithOutData(url: string, method: Method, config?: AxiosRequestConfig): AxiosPromise {
        //使用object.assign 如果有相同key会优先保留第二个对象key的值
        return requestDispatch(Object.assign(config || {}, {
            method,
            url
        }))
    }
    _requestMethodWithData(url: string, method: Method, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return requestDispatch(Object.assign(config || {}, {
            method,
            url,
            data
        }))
    }
    get(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithOutData(url, 'get', config)
    }
    delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithOutData(url, 'delete', config)
    }
    put(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData(url, 'put', data, config)
    }
    head(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithOutData(url, 'head', config)
    }
    options(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithOutData(url, 'options', config)
    }
    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData(url, 'post', data, config)
    }
    patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData(url, 'patch', data, config)
    }

}