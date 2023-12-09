// pages/me/me.js
const { httpGet } = require("../../utils/http");
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    menuItems:[
      {text: '基本信息',path:'/pages/usercenter/person-info/person-info'},
      {text: '个人病历',path:'/pages/usercenter/user-cases/user-cases'},
      {text: '烦恼树洞',path:'/pages/usercenter/hole/hole'},
      {text: '联系我们',path:'/pages/usercenter/contact-us/contact-us'},
      {text: '关于平台',path:'/pages/usercenter/about-us/about-us'},
    ],
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

  onTapMenuItem: function (event) {
    // 获取点击的菜单项的索引
    const index = event.currentTarget.dataset.index;
    // 获取点击的菜单项的路径
    const path = this.data.menuItems[index].path;
    // 跳转到相应页面
    console.log("我点击了:",this.data.menuItems[index].text);
    console.log("地址为:",this.data.menuItems[index].path);
    wx.navigateTo({
      url: path,
      success: function (res) { },
 
      fail: function (res) { },
 
      complete: function (res) { }
    });
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