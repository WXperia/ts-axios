import axios, { AxiosError } from '../../src/index'
import $ from 'jquery'
import { Input } from 'normalize-package-data'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import qs from 'qs'
/* document.cookie = 'a=b'

axios.get('/more/get').then(res => {
    console.log(res)
})

axios.post('http://127.0.0.1:8088/more/server2', {}, {
    withCredentials: true
}).then(res => {
    console.log(res)
})

const instance = axios.create({
    xsrfCookieName: 'XSRF-TOKEN-D',
    xsrfHeaderName: 'X-XSRF-TOKEN-D'
})

instance.get('/more/get', {
    withCredentials: true
}).then(res => {
    console.log(res)
})
function calculatePercentage(loaded: number, total: number) {
    return Math.floor(loaded * 1.0) / total
}
function loadProgressBar() {
    const setupStartProgress = () => {
        axios.interceptors.request.use(config => {
            NProgress.start()
            return config
        })
    }
    const setupUpdateProgress = () => {
        const update = (e: ProgressEvent) => {
            console.log(e)
            NProgress.set(calculatePercentage(e.loaded, e.total))
        }
        axios.defaults.onDownloadProgess = update
        axios.defaults.onUploadProgess = update
    }
    const setupStopProgress = () => {
        axios.interceptors.response.use(response => {
            NProgress.done()
            return response
        }, error => {
            NProgress.done()
            return Promise.reject(error)
        })
    }
    setupStartProgress()
    setupUpdateProgress()
    setupStopProgress()
}
loadProgressBar()
const downloadBtn = document.getElementById('download')

downloadBtn.addEventListener('click', e => {
    axios.get('https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4238142487,3274484296&fm=26&gp=0.jpg')
})
const formData: FormData = new FormData()
const fr: FileReader = new FileReader()
console.log(formData)
const btn = document.getElementById('upLoad')
const fileInput: Input = document.getElementById('fileUpload') as HTMLInputElement
// const handleUpload = function (e: Event): void {
//     if (fileInput.files) {
//         formData.append('file', fileInput.files[0])
//         axios.post('/more/upload', formData)
//     }
// }
const handleUpload = function (e: Event): void {
    formData.append('file', fileInput.files[0])
    formData.append('name', '12')
    formData.append('user', 'xzq')
    if (fileInput.files) {
        $.ajax({
            type: 'POST',
            url: '/more/upload',
            data: formData,
            contentType: false,
            processData: false,
            // mimeType: "multipart/form-data",
            success: function (res) {
                console.log(res)
            }
        })
    }
}
const handelOnchange = function (e: Event): void {
    console.log(this.value)
    console.log(this.files[0])
    let imgViewer = document.createElement('img')
    imgViewer.style.height = '300px'
    fr.readAsDataURL(this.files[0])
    fr.onload = e => {
        let imgDataAsUrl = e.target.result
        imgViewer.setAttribute('src', imgDataAsUrl as string)
        document.body.appendChild(imgViewer)
    }

}
btn.addEventListener('click', handleUpload)
fileInput.addEventListener('change', handelOnchange)

axios.post('/more/auth', { a: `1` }, {
    auth: {
        username: 'xzq',
        password: '1213123'
    }
}).then(res => {
    console.log(res)
})

axios.get('/more/304').then(res => {
    console.log('3041', res)
})

axios.get('/more/304', {
    validateStatus(status) {
        //设置返回数据范围
        return status >= 200 && status < 400
    }
}).then(res => {
    console.log('3042', res)
}).catch(err => {
    console.log(err)
})
 */
// axios.get('/more/get', {
//     params: new URLSearchParams('a=b&c=d')
// }).then(res => {
//     console.log(res)
// })

// axios.get('/more/get', {
//     params: {
//         a: 1,
//         b: 2,
//         c: ['a', 'b', 'c']
//     }
// }).then(res => {
//     console.log(res)
// })
// const instance = axios.create({
//     paramsSerializer(params) {
//         return qs.stringify(params, { arrayFormat: 'brackets' })
//     },
// })
// instance.get('/more/get', {
//     params: {
//         a: 1,
//         b: 2,
//         c: ['a', 'b', 'c']
//     }
// }).then(res=>{
//     console.log(res)
// })

// const instance = axios.create({
//     baseURL:'http://www.bilibili.com'
// })
// instance.get('/video/av78673424?from=search&seid=8620702020580106865').then(res=>{
//     console.log(res)
// })

function getA(){
    return axios.get('/more/A')
}
function getB(){
    return axios.get('/more/B')
}

axios.all([getA(),getB()]).then(axios.spread(function(resA,resB){
    console.log(resA)
    console.log(resB)
}))

axios.all([getA(),getB()]).then(([resA,resB])=>{
    console.log(resA)
    console.log(resB)
})

const fakeConfig = {
    baseURL: 'https://www.baidu.com',
    url: 'user/12345',
    params: {
        idClient: 1,
        idTest: 2,
        testString: 'thisIsATest'
    }
}

console.log(axios.getUri(fakeConfig))