//T 相当于外部传入的变量类型
//一般情况下，定义接口，只是为了外部使用时，只能使用接口暴露的方法，比如这里就只能使用到use 和 eject
export type Method = 'get' | 'GET' | 'delete' | 'DELETE' | 'head' | 'HEAD' | 'options' | 'OPTIONS' | 'post' | 'POST' | 'put' | 'PUT' | 'patch' | 'PATCH';
export interface AxiosRequestConfig {
    url?: string
    method?: Method
    data?: any
    params?: any
    isasync?: boolean
    headers?: any
    responseType?: XMLHttpRequestResponseType
    isJSON?: boolean
    timeout?: number
}
export interface AxiosResponse<T = any> {
    //从服务端接受回的对象格式
    data: T
    status: number
    statusText: string
    config: AxiosRequestConfig
    headers: any
    request: any
}
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {

}

export interface AxiosError extends Error {
    isAxiosError: boolean
    config: AxiosRequestConfig
    code?: string | null
    request?: any
    response: AxiosResponse
}

export interface Axios {
    //兼容Axios实现的接口
    request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

    get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

    delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

    options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

    head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

    interceptors: {
        request: AxiosInterceptorManager<AxiosRequestConfig>
        response: AxiosInterceptorManager<AxiosResponse>
    }
}

export interface AxiosInstance extends Axios {
    //函数的重载
    <T>(config: any): AxiosPromise<T>
    <T>(url: string, config: AxiosRequestConfig): AxiosPromise<T>
}
export interface ResolveFn<T> {
    (val: T): T | Promise<T>
}
export interface RejectFn {
    (error: any): any
}

export interface AxiosInterceptorManager<T> {
    use(resolved: ResolveFn<T>, rejected?: RejectFn): number
    eject(id: number): void
}