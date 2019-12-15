export type Method = 'get' | 'GET' | 'delete' | 'DELETE' | 'head' | 'HEAD' | 'options' | 'OPTIONS' | 'post' | 'POST' | 'put' | 'PUT' | 'patch' | 'PATCH';
export interface AxiosRequestConfig {
    url: string
    method?: Method
    data?: any
    params?: any
    isasync?: boolean
    headers?: any
    responseType?: XMLHttpRequestResponseType
    isJSON?: boolean
    timeout?: number
}
export interface AxiosResponse {
    //从服务端接受回的对象格式
    data: any
    status: number
    statusText: string
    config: AxiosRequestConfig
    headers: any
    request: any
}
export interface AxiosPromise extends Promise<AxiosResponse> {

}

export interface AxiosError extends Error {
    isAxiosError: boolean
    config: AxiosRequestConfig
    code?: string | null
    request?: any
    response: AxiosResponse
}