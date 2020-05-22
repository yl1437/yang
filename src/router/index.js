import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
// import Home from '../components/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component:()=>import('../views/Login.vue'),
    
  },
  {
    path:'/channel',
    name:'channel',
    component:()=>import('../views/Channel.vue'),
  },
  {
    path:'/frlist',
    name:'frlist',
    component:()=>import('../views/FRList.vue'),
  },
  {
    path:'/userDetails',
    name:'userDetails',
    component:()=>import('../views/UserDetails.vue'),
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

// 路由守卫导航


// // axios请求拦截器配置token，校验请求时的登录态
// axios.interceptors.request.use((config)=>{
//   if(document.getCookies('token')){
//     config.headers.common['Authorization']='Token'+document.getCookies('token')
//   }
//   return config
// },(error)=>{
//   return Promise.reject(error)
// })
// // axios响应拦截器更新cookie
// axios.interceptors.response.use((res)=>{
//   var _url=res.config.url.replace(axios.defaults.baseURL,'')
//   if(res.data.sts==1){
//     document.setCookies('token',document.getCookies('token'),2)
//   }
//   return res.data
// })

// // 添加请求拦截器，在请求头中加token
// axios.interceptors.request.use((config)=>{
//   if(localStorage.getItem('Authorization')){
//     config.headers.Authorizatio=localStorage.getItem('Authorization')
//   }
//   return config
// },
// (error)=>{
//   return Promise.reject(error)
// })

// // http response 拦截器
// axios.interceptors.response.use(
//   undefined,
//   error => {
//       let res = error.response;
//       switch (res.status) {
//           case 401:
//               console.warn("token 过期重登录!");
//               // this.$router.push('/');
//               break;
//           case 403:
//               console.log('您没有该操作权限');
//               break;
//           case 500:
//               console.log('服务器错误');
//       }
//       return Promise.reject(error.response.data);//返回接口返回的错误信息
//   })


export default router
