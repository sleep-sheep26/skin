const { uploadFiles } = require("../../utils/http");
// pages/photo/photo.js
var app = getApp()
Page({

  /*
    页面的初始数据
   */
  data: {
    imageUrl:'',
    inputVal:"",
    inputShowed: false,
    naVH:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navHeight
    });
  },
gotoSearch(){
  console.log("跳转到搜索页面")
  wx.navigateTo({
    url: "/pages/search/search",
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

 /**
   * 搜索实现函数集
   */
  showInput: function () {
    this.setData({
        inputShowed: true
    });
},
hideInput: function () {
    this.setData({
        inputVal: "",
        inputShowed: false
    });
},
clearInput: function () {
    this.setData({
        inputVal: ""
    });
},
inputTyping: function (e) {
    this.setData({
        inputVal: e.detail.value
    });
    console.log(this.data.inputVal)
},
backLastPage: function(){
  wx.navigateBack({
    delta: 1,
  })
},

 /**
   * 图片识别函数集
   */
  chooseImage(){
    wx.chooseImage({
      count: 0,
      sizeType: ['compressed'],
      sourceType: ['alubm','camera'],
      success: (res) => {this.updateImage(res.tempFilePaths[0])}
    })
   },
   updateImage(imagePath) {
    uploadFiles({
      files: [imagePath], // 将图片路径放入文件数组中
      success: ({data}) => {
        // 上传图片成功，处理识别结果
        let result = data; // 图片上传
        if (result.code === 200) {
          console.log('图片上传结果:', result);
        
          // 跳转到结果页面，并携带识别结果作为关键词传递给结果页面
          wx.navigateTo({
            url: '/pages/search-detail/search-detail?img=' + result.data.urls[0],
          });
        } else{
          console.log('图片上传失败:', result);
        }

      },
      fail: function (res) {
        console.log(res);
      }
    });
  }
  
})




