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
            httpPost({
              uri: '/community/user/register/wechat',
              data:{...info.userInfo, jsCode: this.data.jsCode},
              success:({data})=>{
                 console.log('注册info.userInfo.success', data)

                if(data.code === 200){
                  wx.$token = data.data.token
                  wx.setStorageSync('token', wx.$token)
                  httpGet({uri:'/community/user/', 
                    success:({data})=>{
                      console.log('个人信息(服务器)', data)
                      if (data.code === 200) {
                        wx.setStorageSync('userInfo', data.data)
                        wx.switchTab({
                          url: '/pages/index/index',
                        });
                      }
                    }}
                  )
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