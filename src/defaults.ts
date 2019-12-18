import { AxiosRequestConfig } from "./types";

 const defaults:AxiosRequestConfig = {
    method: 'get',
    headers: {
        common: {
            Accept: 'applaction/json,text/plain,*/*'
        },

    },
    timeout: 0,
}

const methodsWithNoData = ['get','delete','head','options']
const methodsWithData = ['post','put','patch']

methodsWithNoData.forEach(method=>{
    defaults.headers[method] = {}
})
methodsWithData.forEach(method=>{
    defaults.headers[method] = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

export default defaults