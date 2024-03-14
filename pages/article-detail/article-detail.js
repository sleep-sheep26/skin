const { httpGet } = require("../../utils/http");

// pages/article-detail/article-detail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const topicId = options.postId; // 获取传递过来的帖子ID
    console.log(options)
    this.setData({
      navH: app.globalData.navHeight
    });
    httpGet({
      url: '/community/topic/' + topicId,  //*****************/
      success: (res) => {
        let postDetail = res.data.data
        postDetail.createTime = new Date(postDetail.createTime).toLocaleDateString()
        postDetail.comments.forEach(element => {
          element.createTime = new Date(element.createTime).toLocaleDateString()
        });
        // 渲染帖子详情到页面中
        this.setData({
          postDetail  // 获取到的帖子详情数据
        });
      },
      fail: (err) => {
        console.error('请求失败', err);
      },
    });
  },

  thisImage:function(e){
    let index = e.currentTarget.dataset.imageid;
    let list = this.data.image;
    console.log(list)
    wx.previewImage({
      urls: list,
      current: list[index]
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

  }
})