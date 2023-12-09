//app.js
App({
  globalData: {
    userInfo: null,
    navHeight: 0,
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
  },
  
})