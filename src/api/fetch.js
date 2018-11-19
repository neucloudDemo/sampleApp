import Vue from 'vue'
import axios from 'axios'
import { baseUrl, loginUaaConfig } from './url'

const LOGON_FAIL_TEXT = '登录失效，请重新登录！'
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

const fetch = axios.create({
    baseURL: baseUrl,
    headers: headers,
    timeout: 30000
})

fetch.interceptors.request.use(function (config) {
    if (localStorage.token) {
        config.headers['Authorization'] = `Bearer ${localStorage.token}`
    }
    return config
}, function (error) {
    return Promise.reject(error)
})

fetch.interceptors.response.use((response) => {
    return response.data.model ? response.data.model : response.data
}, (error) => {
    if (error.response.status === 401) {
        // 登录失效
        Vue.prototype.$Message.error({ content: LOGON_FAIL_TEXT, duration: 3 })
        window.localStorage.clear()
        window.location.href = `${loginUaaConfig.host}${loginUaaConfig.parame}&state=${encodeURIComponent(window.location.href)}`
    } else {
        const errorMessage = error.response.data.msg || error.message
        Vue.prototype.$Message.error({ content: errorMessage, duration: 3 })
    }
    return Promise.reject(error)
})

Vue.prototype.fetch = fetch
export default fetch