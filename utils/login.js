const { httpGet, httpPost } = require("./http");


function fastLogin(){
  let token
  httpGet({
    uri: '/community/user/check/wechat', 
    success:({data})=>{
      // 成功则存储新token
      if(data.code === 200){
        token = data.data.token
      }else{
          console.log('ffffffffffffail', data)
          if(data.code === 403){
            // 没有有效token, 开始登录验证
            wx.login({
              success: (res) => {
                if (res.code) {
                  // 先判断是否授权过
                  httpPost({
                    uri: '/community/user/login/wechat',
                    data: {jsCode: res.code},
                    success: ({data})=>{
                      console.log('completecompletecompletecomplete', data)
                      if(data.code === 200){
                        // 已经授权过，响应体直接获取token
                        token = data.data.token
                        console.log('token', token)

                      }else{
                        // 发送 res.code 到后台换取 openId, sessionKey, unionId
                        console.log('dawffwa测试', data)
                        wx.getUserProfile({
                          desc: '测试',
                          success: (info)=>{
                            console.log('dawffwa', info)
                          }
                        })
                      }
                    }
                  })
    /*
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                console.log('success', res)
                var data = {username:'root', phone:15137610729}
                wx.getUserProfile({
                  desc: '测试',
                  success: (info)={
                    
                  }
                })*/
             
                } else {
                  console.log('登录失败！' + res.errMsg)
                }
               
                  
            /*
              wx.request({
                  url: 'https://mock.apifox.cn/m1/3005354-0-default/community/user/login/phone',
                  method: 'POST',
                  data,
                  success: ({data}) => {
                      console.log(data)
                      if (data.code === 200) {
                          //console.log("login success", data.msg)
                          wx.setStorageSync('token', data.data.token)
                      }
                  }
              })*/
              }
          })
    
    
          }
      }
    }
  })
  
}

module.exports = {
  fastLogin: fastLogin
}
