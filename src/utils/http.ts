/*
添加拦截器：
  拦截request请求
  拦截uploadFile文件上传

TODO：
  非http开头需拼接地址
  请求超时
  添加小程序端请求头地址
  添加token请求头地址
 */

import { useMemberStore } from '@/stores'

const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

// 添加拦截器
const httpInterceptor = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    // 非http开头需拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    // 请求超时
    options.timeout = 10000
    // 添加小程序端请求头地址
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    // 添加token请求头地址
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
    console.log(options)
  },
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)
