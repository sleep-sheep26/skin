const FormData = require('./formData.js')

const BASIC_URL = 'https://wolves.vip'
const EXCLUDED_LOGIN_CHECK_URL_PREFIX = ['/community/user/login', '/community/user/check']

/**
 * 官方并没有提供wx.request和wx.login的Promise用法，故手动实现一个简单的Promise用法
 */

function requestPromise(http){
  return new Promise((resolve, reject)=>{
      wx.request({...http, url: 'https://wolves.vip' + http.url,
      success:(res)=>{ 
        if (res.statusCode === 200) {
          resolve(res)
        }else{
          reject(res.exception)
        }
      },
      fail:(error)=>{ reject(error.errMsg) }
    })
  })
}
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
  }, async ()=>{
    console.log('快速登录失败，本地无有效token')
    await wxLoginPromise().then( async(code) => {
      console.log('jsCode', code)
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


async function httpRequest(http){
  let token
  // 请求头追加token
  if (isNotEmpty(token =  wx.$token) || isNotEmpty(token = wx.getStorageSync('token'))) {
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
  if (http.success === undefined && http.fail === undefined && http.complete === undefined) {
    return requestPromise(http)
  }
  return wx.request({...http, url: 'https://wolves.vip' + http.url})
}

function httpGet(http){
  return httpRequest({...http, method:'get'})
}
function httpPost(http){
  console.log('http', http)
  return httpRequest({...http, method:'post'})
}

function isEmpty(str){
  return str === undefined || str === ''
}

function isNotEmpty(str){
  return !isEmpty(str)
}
// 参数 obj.files  obj.success
function uploadFiles(obj){
  let files = obj.files;
  console.log('文件上', files)

  let formData = new FormData()
  files.forEach(element => {
    formData.appendFile('files', element)
  });
  
  let data = formData.getData()
  httpPost({
    url: '/third/upload/form',
    data: data.buffer,
    dataType: "其他",
    header:{'Content-Type': data.contentType},
    success: obj.success
  })
}

module.exports = {
  httpGet,
  httpPost,
  httpRequest,
  wxLoginPromise,
  uploadFiles
}