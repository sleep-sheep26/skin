const { httpGet, httpPost, httpRequest } = require("../../utils/http");


// pages/index/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH: 0,
    //存放轮播图的数据
    rotationList:[
      '../../assets/images/rotation/man.jpg',
      '../../assets/images/rotation/student.jpg',
      '../../assets/images/rotation/test1.jpg',
      '../../assets/images/rotation/test2.jpg',
      '../../assets/images/rotation/test3.jpg',
    ],
    swiperCurrent: 0,

    sortList:[
      {
        icon: "../../assets/images/sort/news.png",
        sortid: 1,
        text:"最新发布"
      },{
        icon: "../../assets/images/sort/second-hand.png",
        sortid: 2,
        text:"问题求助"
      },{
        icon: "../../assets/images/sort/love-mood.png",
        sortid: 3,
        text:"经验分享"
      },{
        icon: "../../assets/images/sort/question-ask.png",
        sortid: 4,
        text:"专业知识"
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navHeight
    });
    this.getSwiperList()
  },

  //获取轮播图数据的方法
  getSwiperList(){
    console.log('pageRouterpageRouterpageRouterpageRouter')
    httpGet({
      uri: '/community/rotation/list/enabled',
      success:(res)=>{
        console.log('rotation', res)
        this.setData({
          rotationList:res.data
        })
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
  //轮播图改变事件
  swiperChange: function (e) {
    if (e.detail.source === 'touch'){
      this.setData({
        swiperCurrent: e.detail.current
      })
    }
  },
})