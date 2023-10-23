const { httpGet, httpPost } = require("./http");


function fastLogin(){
  let token
  httpGet({
    uri: '/community/user/check/wechat', 
    success:({data})=>{
      // 成功则存储新token
      if(data.code === 200){
        token = data.data.token
        console.log('token', token)
        wx.setStorage({
          key: 'token',
          data: token
        })
        wx.$userInfo = data.data.token
      }else{
          console.log('快速登录失败，本地无有效token', data)
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
                      if(data.code === 200){
                        console.log('注册过，直接登录')

                        // 已经授权过，响应体直接获取token
                        token = data.data.token
                        wx.$userInfo = data.data.user
                        wx.setStorage({
                          key: 'token',
                          data: token
                        })
                        console.log('token', token)
                      }else{
                        console.log('没注册过，跳转授权')
                        wx.navigateTo({
                          url: '/pages/login/login'
                        })
                      }
                    }
                  })
                } else {
                  console.log('登录失败！' + res.errMsg)
                }
              }
            })
          }
      }
    }
  })
}
/*
module.exports = {
  fastLogin: fastLogin
}
*/