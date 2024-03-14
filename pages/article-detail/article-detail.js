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
    const postId = options.postId; // 获取传递过来的帖子ID
    this.setData({
      navH: app.globalData.navHeight
    });
    wx.request({
      url: 'https://wolves.vip/api/posts/' + postId,  //*****************/
      success: (res) => {
        const postDetail = res.data; // 获取到的帖子详情数据
        // 渲染帖子详情到页面中
        this.setData({
          postDetail: postDetail
        });
      },
      fail: (err) => {
        console.error('请求失败', err);
      }
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