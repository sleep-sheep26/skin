const { fail } = require("assert/strict")

const BASIC_URL = 'https://wolves.vip'

/**
 * 官方并没有提供wx.request和wx.login的Promise用法，故手动实现一个简单的Promise用法
 */

function requestPromise(http){
  return new Promise((resolve, reject)=>{
      wx.request({url: 'https://wolves.vip' + http.uri,...http, 
      success:(res)=>{ 
        if (res.statusCode === 200) {
          resolve(res)
        }else{
          reject(res.exception)
        }
      },
      fail:(error)=>{ rejec(error.errMsg) }
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

  }
  if (http.success === undefined && http.fail === undefined && http.complete === undefined) {
    return requestPromise(http)
  }
  return wx.request({url: 'https://wolves.vip' + http.uri,...http})
}

function getRequest(http){
  return httpRequest({...http, method:'get'})
}
function postRequest(http){
  return httpRequest({...http, method:'post'})
}

function isEmpty(str){
  return str === undefined || str === ''
}

function isNotEmpty(str){
  return !isEmpty(str)
}

module.exports = {
  httpGet:getRequest,
  httpPost: postRequest,
  httpRequest: httpRequest
  
}