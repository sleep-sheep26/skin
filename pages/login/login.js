//login.js
const { httpPost, httpGet } = require("../../utils/http");
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    angle: 0,
    jsCode: ''
  },
  getUserProfile: function() {
    // 开始登录验证
    if (this.data.jsCode) {
      wx.getUserProfile({
        desc: '用于完善会员资料',
        success: (info)=>{
          if(info.userInfo){
            console.log('info.userInfo', info.userInfo)
            wx.request({
              method:'POST',
              url: 'https://wolves.vip/community/user/register/wechat',
              data:{...info.userInfo, jsCode: this.data.jsCode},
              success:({data})=>{
                 console.log('注册info.userInfo.success', data)

                if(data.code === 200){
                  wx.$access_token = data.data.access_token
                  wx.$refresh_token = data.data.refresh_token
                  wx.setStorage({
                    key: 'access_token',
                    data: wx.$access_token
                  })
                  wx.setStorage({
                    key: 'refresh_token',
                    data: wx.$refresh_token
                  })
                  wx.switchTab({
                    url: '/pages/index/index',
                  });

                }
              }
            })
          }
          
        }
      })
    }


  },
  onLoad: function() {
    var that = this
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('mallName')
    })
  },
  onShow: function() {
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
          })
        }
      })
    } else {
      that.setData({
        userInfo: userInfo
      })
    }
    //-------
    wx.login({
      success: (res) => {
        if (res.code) {
          this.setData({jsCode: res.code})
          console.log('获取jsCode', res.code, this.data.jsCode)
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  onReady: function() {
    var that = this;
    setTimeout(function() {
      that.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function(res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) {
        angle = 14;
      } else if (angle < -14) {
        angle = -14;
      }
      if (that.data.angle !== angle) {
        that.setData({
          angle: angle
        });
      }
    });
  }
});