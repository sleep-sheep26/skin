// pages/me/me.js
const { httpGet } = require("../../../utils/http");
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    menuItems:[
      {text: '姓名' , value: 'rain'},
      {text: '性别' , value: '男' },
      {text: '生日' , value: '2003.1.20'},
      {text: '所在地' , value: '中国安徽宣城'},
      {text: '手机号码' , value: '12345678'},
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
            userInfo: data.data,
          })
        }
      }
    })
  },


  onTapMenuItem: function (event) {
    // 获取点击的菜单项的索引
    const index = event.currentTarget.dataset.index;
    
    // 获取点击的菜单项的路径
    const values = this.data.menuItems[index].value;

    // 跳转到相应页面
    console.log("点击了:",this.data.menuItems[index].text,values );
    
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
  },

  backToIndex:function(e){
    wx.navigateBack({
     delta: 1
    })
  }
})