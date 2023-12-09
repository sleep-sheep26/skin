// pages/me/me.js

const { httpGet } = require("../../utils/http");
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    navH: 0
  },
//发起GET数据请求

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navHeight
    });
  },
  updateUserInfo(){
    httpGet({url:'/community/user/', 
      success:({data})=>{
        console.log('个人信息(服务器)', data)
        if (data.code === 200) {
          wx.setStorageSync('userInfo', data.data)
          this.setData({
            userInfo: data.data
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let info = wx.getStorageSync('userInfo')
    if(info === ''){
      this.updateUserInfo()
    }else{
      this.setData({userInfo: wx.getStorageSync('userInfo')}) 
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})