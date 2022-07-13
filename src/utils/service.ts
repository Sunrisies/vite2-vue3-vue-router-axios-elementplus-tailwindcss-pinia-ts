//1.引入axios包
import axios from 'axios'
//2.axios创建对象
const service = axios.create({
  baseURL:'https://api.shop.eduwork.cn/',//管理后台要使用的接口的基地址
  timeout:30000,
})

//3.请求拦截器,请求发送出去之前触发的
service.interceptors.request.use(config => {
  //接口请求的配置信息
  return config
},err => {
  //错误信息
  return Promise.reject(err)
})

//4.响应拦截器
service.interceptors.response.use(res => {
  //响应回来的数据操作
  return res.data
},err => {
  //报错的是时候抛出一个报错的信息
  return Promise.reject(err)
})

//5.抛出对象的信息
export default service