const { fastLogin } = require("./utils/login");

//app.js
App({
  globalData: {
    userInfo: null,
    navHeight: 0,
    tags: [{
      text:"表白墙"
    },{
      text:"二手交易"
    }],
    meta: {}
  },
  onLaunch: function (t) {

     // 获取顶部栏信息
     wx.getSystemInfo({
      success: res => {
        //导航高度
        this.globalData.navHeight = res.statusBarHeight;
      }, fail(err) {
        console.log(err);
      }
    })
    fastLogin()


/*
    // login
    wx.login({

      success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      console.log('success', res)
      var data = {username:'root', phone:15137610729}

     
          
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
      })
      }
  })*/
  },
  
})