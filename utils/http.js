function httpRequest(http){
  // 请求头追加token
  if (wx.$token === undefined) {
    wx.getStorage({
      key: 'token',
      success: (token)=>{
        console.log('getStorage---token---success', token)
        if(token.data !== undefined){
          if(http.header === undefined){
            http.header = {Authorization: 'Bearer ' + token.data}
          }else{
            http.header.Authorization = 'Bearer ' + token.data
          }
        }
      },
      /*
      complete:(token)=>{
        console.log('getStorage---token---complete', token)
        if(token.data !== undefined){
          if(http.header === undefined){
            http.header = {Authorization: 'Bearer ' + token.data}
          }else{
            http.header.Authorization = 'Bearer ' + token.data
          }
        }
      }*/
    })
  }else{
    if(http.header === undefined){
      http.header = {Authorization: 'Bearer ' + wx.$token}
    }else{
      http.header.Authorization = 'Bearer ' + wx.$token
    }
  }
 
  
  console.log('httpRequest---http', http)
  /*
  let token = 'eyJhbGciOiJIUzUxMiIsInppcCI6IkRFRiJ9.eNqqViouTVKyUrIAAyUdpdSKAiUrQ3NTI0tjQxMzi1oAAAAA__8.KauBT5NZ_nq8dmi2bajUm5gajBfvlgie-Wf1aqAOgaQnBTLt_2ipVLEkUORH3CqrBU8dJF1rBgqqlFx3r5ms5w'
  if(http.header === undefined){
    http.header = {Authorization: 'Bearer ' + token}
  }else{
    http.header.Authorization = 'Bearer ' + token
  } */
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