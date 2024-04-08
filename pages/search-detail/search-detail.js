// pages/search-detail/search-detail.js
const { httpGet } = require("../../utils/http");
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH: 0,
    inputShowed: false,
    disease: {},
    keyword: '', // 搜索关键词
  },
  backlastPage: function(){
    wx.navigateBack({
      delta: 1,
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
     // 从页面参数中获取关键词
     let keyword = options.keyword || '';
     // 根据关键词调用不同的接口
     let apiUrl = '';
     if (/^[a-zA-Z]+$/.test(keyword)) {
       // 如果关键词是英文，则调用接口b
       apiUrl = '/third/wiki/en/{keyword}' + keyword;
     } else {
       // 否则，调用接口a
       apiUrl = '/third/wiki/cn/{keyword}' + keyword;
     }
 
     // 发起请求
     httpGet({
       url: apiUrl,
       method: 'GET',
       success: (data) => {
         console.log('disease', data);
         if (data.code === 200) {
           this.setData({
             disease: data.data
           });
           console.log(this.disease);
         }
       },
       fail: (res) => {
         wx.showToast({
           title: '数据加载失败',
           icon: 'none'
         });
       }
     });
   },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})