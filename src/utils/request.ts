import axios, { AxiosRequestConfig } from 'axios'
import { message } from 'antd'
import { createHashHistory } from 'history'
axios.defaults.timeout = 10000

axios.interceptors.request.use(
  config => {
    config.headers['token'] = localStorage.getItem('token')
    return config
  },
  error => {
    Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    if (response.data.code == 401) {
      message.error(response.data.msg)
      createHashHistory().push('/login')
    }
    return response.data
  },
  error => {
    let errorMessage = '系统异常'
    if (error?.response?.data?.msg) {
      errorMessage = error?.response?.data.msg
    }
    if (error?.msg?.includes('Network Error')) {
      errorMessage = '网络错误，请检查您的网络'
    }
    error.msg && message.error(errorMessage)
    return {
      code: false,
      message: errorMessage,
      result: null
    }
  }
)

const notMonitorId = ['/communal/projects', '/communal/addTeamProject', '/communal/projectHealthy']

export type Response<T = any> = {
  code: number
  msg: string
  data: T
}

type Method = 'get' | 'post' | 'put' | 'delete'

export const request = <T>(
  method: Method,
  url: string,
  data = {},
  config?: AxiosRequestConfig
): Promise<Response<T>> => {
  const prefix = 'http://127.0.0.1:8889'
  if (!notMonitorId.includes(url)) {
    const monitor_id = localStorage.getItem('monitor_id')
    Object.assign(data, { monitor_id })
  }
  if (url.indexOf('https') !== 0) {
    url = prefix + url
  }
  if (method === 'post') {
    return axios.post(url, data, config)
  } else if (method === 'put') {
    return axios.put(url, data)
  } else if (method === 'delete') {
    return axios.delete(url)
  } else {
    return axios.get(url, {
      params: data,
      ...config
    })
  }
}
