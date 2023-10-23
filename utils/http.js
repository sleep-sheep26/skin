

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