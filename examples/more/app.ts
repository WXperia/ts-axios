import axios, { AxiosError } from '../../src/index'
import $ from 'jquery'
import { Input } from 'normalize-package-data'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
document.cookie = 'a=b'

/* axios.get('/more/get').then(res => {
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
}) */
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