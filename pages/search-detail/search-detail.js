// pages/search-detail/search-detail.js
const { httpGet, httpPost } = require("../../utils/http");
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH: 0,
    inputShowed: false,
    disease: {},
    num: 0,
    keyword: '', // 搜索关键词
    currentPage: 0, // 当前页码
    items: [], // 存放疾病信息的数组
    queryFailed: false // 是否查询失败标志
  },

  // 点击上一页按钮
  prevPage: function() {
    if (this.data.currentPage > 0) {
      this.setData({
        currentPage: this.data.currentPage - 1,
        disease: this.data.items[this.data.currentPage - 1]
      });
      wx.pageScrollTo({
        scrollTop: 0, // 滚动到顶部
        duration: 300 // 滚动动画时长
      });
    }
  },

  // 点击下一页按钮
  nextPage: function() {
    if (this.data.currentPage < this.data.num - 1 && this.data.currentPage + 1 < this.data.items.length) {
      this.setData({
        currentPage: this.data.currentPage + 1,
        disease: this.data.items[this.data.currentPage + 1]
      });
      wx.pageScrollTo({
        scrollTop: 0, // 滚动到顶部
        duration: 300 // 滚动动画时长
      });
    }
  },

  // 返回上一页
  backlastPage: function() {
    wx.navigateBack({
      delta: 1,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 从页面参数中获取关键词
    console.log('opt', options)
    let url = options.img || '';
    httpPost({
      url: '/identify/identify/',
      data: { imgUrl: url },
      success: ({ data }) => {
        console.log('识别结果', data)
        if (data.code === 200) {

          let keyword = data.data.res.most || '';

          // 发起请求
          httpGet({
            url: '/third/wiki/en/' + keyword,
            success: ({ data }) => {
              console.log('disease', data);
              if (data.code === 200) {
                if (data.data.items.length > 0) {
                this.setData({
                  items: data.data.items,
                  disease: data.data.items[0], // 设置初始显示的疾病信息为数组的第一个元素
                  num: data.data.items.length
                });}
                else {
                  this.setData({
                    queryFailed: true
                  });
                }
                console.log(this.data.disease);
              }else {
                this.setData({
                  queryFailed: true
                });
              }
            },

            fail: (res) => {
              wx.showToast({
                title: '数据加载失败',
                icon: 'none'
              });
            }
          });
        }else {
          this.setData({
            queryFailed: true
          });
        }

      }
    })

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
