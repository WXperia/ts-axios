import axios, { Canceler } from '../../src/index'

const CancelToken = axios.CancelToken
const source = CancelToken.source()
let cancel: Canceler
// axios.get('/cancel/get', {
//     cancelToken: source.token
// }).catch(function (e) {
//     if (axios.isCancel(e)) {
//         console.log('request canceled', e.message)
//     }
// })

// setTimeout(() => {
//     source.cancel('Oertation cancled by the user')
//     axios.post('/cancle/post', { a: 1 }, {
//         cancelToken: source.token
//     }).catch(function (e) {
//         if (axios.isCancel(e)) {
//             console.log(e.message)
//         }
//     })
// }, 100)


axios.get('/cancel/get').then(res=>{
    console.log(res)
})
// axios.get('/cancel/get', {
//     cancelToken: new CancelToken(c => {
//         cancel = c
//     })
// }).catch(function (e) {
//     if (axios.isCancel(e)) {
//         console.log('Request Canceled')
//     }
// })

// setTimeout(() => {
//     cancel()
// }, 500)