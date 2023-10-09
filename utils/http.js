function httpRequest(http){
  // 请求头追加token
/*
  // TODO OnLunch时App实例尚未创建
  if (!'$token' in getApp()){
    wx.getStorage({
      key: 'token',
      encrypt: true,
      success: (token)=>{
        getApp().$token = token
        http.header.Authorization = 'Bearer '+ token
      }
    })
  }else{
    http.header.Authorization = 'Bearer '+ getApp().$token
  }*/
  wx.getStorage({
    key: 'token',
    encrypt: true,
    success: (token)=>{
      if(token.data !== undefined){
        if(http.header === undefined){
          http.header = {Authorization: 'Bearer ' + token.data}
        }else{
          http.header.Authorization = 'Bearer ' + token.data
        }
      }
    }
  })
  return wx.request({url: 'https://wolves.vip' + http.uri,...http})
}

function getRequest(http){
  return httpRequest({...http, method:'get'})
}
function postRequest(http){
  return httpRequest({...http, method:'post'})
}

module.exports = {
  httpGet:getRequest,
  httpPost: postRequest,
  httpRequest: httpRequest
  
}