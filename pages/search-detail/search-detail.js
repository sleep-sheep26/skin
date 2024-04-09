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
     console.log('opt', options)
     let url = options.img || '';
    httpPost({
      url: '/identify/identify/',
      data:{imgUrl: url},
      success: ({data}) =>{
        console.log('识别结果', data)
        if (data.code === 200){
          
        let keyword = data.data.res.most || '';
    
        // 发起请求
        httpGet({
          url: '/third/wiki/en/' + keyword,
          success: ({data}) => {
            console.log('disease', data);
            if (data.code === 200) {
              this.setData({
                disease: data.data.items[0]
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