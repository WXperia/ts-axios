import { AxiosRequestConfig } from "./types";
import { processHeaders } from "./helpers/header";
import { transformRequest, transformResponse } from "./helpers/data";

const defaults: AxiosRequestConfig = {
    method: 'get',
    headers: {
        common: {
            Accept: 'applaction/json,text/plain,*/*'
        },

    },
    timeout: 0,
    transformRequest: [
        function (data: any, headers: any): any {
            processHeaders(headers, data)
            return transformRequest(data)
        }
    ],
    transformResponse: [
        function (data: any): any {
          return transformResponse(data)
        }
    ]
}

const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']

methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults