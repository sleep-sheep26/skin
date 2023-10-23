const axios = require('axios')
const mpAdapter = require('axios-miniprogram-adapter')
axios.defaults.adapter = mpAdapter

const BASIC_URL = 'https://wolves.vip'
const EXCLUDED_LOGIN_CHECK_URL_PREFIX = ['/community/user/login', '/community/user/check']
/**
 * httpGet(httpPost)请求参数的uri属性变为url
 * 用法: httpGet({url: '/community/user/check/wechat'})
 * 
 */

 function wxLoginPromise(){
  return new Promise((resolve, reject) => {
    wx.login({
      success: (res) => {
        if (res.code) {
          // 如果成功获取code，调用resolve函数
          resolve(res.code);
        } else {
          // 如果失败，调用reject函数
          reject(res.errMsg);
        }
      },
      fail: (err) => {
        // 如果接口调用失败，调用reject函数
        reject(err.errMsg);
      }
    });
  });
 }

async function fastLogin(){
  await httpGet({
    url: '/community/user/check/wechat', 
  }).then( (res)=>{
    console.log('wechatwechat---------------------------------', res)
  }, async (error)=>{
    console.log('快速登录失败，本地无有效token')
    await wxLoginPromise().then( async(code) => {
      // 先判断是否授权过
      await httpPost({
        url: '/community/user/login/wechat',
        data: {jsCode: code},
      }).then(({data})=>{
        console.log('success', data)
        if(data.code === 200){
          console.log('注册过，直接登录')

          // 已经授权过，响应体直接获取token
          wx.$userInfo = data.data.user
          wx.$token =  data.data.token
          wx.setStorageSync('token', data.data.token)
          console.log('token', data.data.token)
        }else{
          console.log('没注册过，跳转授权')
          wx.navigateTo({
            url: '/pages/login/login'
          })
        }
      })
    })
    
  })

  return wx.$token
}
// 使用axios
async function httpRequest(http){
  let token
  //console.log('axios', axios)
  // 请求头追加token
  if (isNotEmpty(token = wx.$token) || isNotEmpty(token = wx.getStorageSync('token'))) {
    if(http.header === undefined){
      http.header = {Authorization: 'Bearer ' + token}
    }else{
      http.header.Authorization = 'Bearer ' + token
    }
  }else{
    let isEmitFastLogin = true
        // 获取token
    for (const key in EXCLUDED_LOGIN_CHECK_URL_PREFIX) {
      if (http.url.startsWith(EXCLUDED_LOGIN_CHECK_URL_PREFIX[key])) {
        isEmitFastLogin = false;
        break
      }
    }
    if (isEmitFastLogin) {
      token = await fastLogin()
      if(http.header === undefined){
        http.header = {Authorization: 'Bearer ' + token}
      }else{
        http.header.Authorization = 'Bearer ' + token
      }
    }
  }

  console.log('login', {...http, url: BASIC_URL + http.url})
  
  return axios({...http, url: BASIC_URL + http.url})
}

/*
// 旧版 使用原生wx.request
function httpRequest(http){
  //console.log('axios', axios)
  // 请求头追加token
  if (wx.$token === undefined || wx.$token === '') {
    let token = wx.getStorageSync('token')
    if(token !== undefined && token !== ''){
      if(http.header === undefined){
        http.header = {Authorization: 'Bearer ' + token}
      }else{
        http.header.Authorization = 'Bearer ' + token
      }
    }
  }else{
    if(http.header === undefined){
      http.header = {Authorization: 'Bearer ' + wx.$token}
    }else{
      http.header.Authorization = 'Bearer ' + wx.$token
    }
  }
  
  return wx.request({url: 'https://wolves.vip' + http.uri,...http})
}
*/

function httpGet(http){
  return httpRequest({...http, method:'get'})
}
function httpPost(http){
  return httpRequest({...http, method:'post'})
}

function isEmpty(str){
  return str === undefined || str === ''
}
function isNotEmpty(str){
  return !isEmpty(str)
}

module.exports = {
  httpGet:httpGet,
  httpPost: httpPost,
  httpRequest: httpRequest
}