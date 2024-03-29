// pages/index/index.js
const { httpGet } = require("../../utils/http");
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navH: 0,
    //存放轮播图的数据
    rotationList:[
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
    posts: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navHeight
    });
    httpGet({
      url: '/community/topic/page/',
      method: 'GET',
      data: {
        page: 1,
        limit:10,

        sort: 3
      },
      success: ({data}) => {
        // 使用从服务器获取的帖子更新页面状态中的帖子数据
        console.log(data)
        data.data.forEach(element => {
          element.createTime = new Date(element.createTime).toLocaleDateString()
        });

        this.setData({
          posts: data.data,
        });
        
      },
      fail: (err) => {
        console.error('获取帖子失败：', err);
      },
    });
  },

  //获取轮播图数据的方法
  getSwiperList(){
    httpGet({
      url: '/community/rotation/list/enabled',
      success:({data})=>{
        console.log('rotation', data)
        if (data.code === 200) {
          this.setData({
            rotationList:data.data
          })
          console.log(this.rotationList)
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
    this.getSwiperList()
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
  adddetial: function () {
 
    wx.navigateTo({
 
      url: '../article/article',
 
      success: function (res) { },
 
      fail: function (res) { },
 
      complete: function (res) { }
 
    })
 
  },

// 跳转到详情页面
navigateToDetail: function (event) {
  const dataset = event.currentTarget.dataset; // 获取点击的帖子信息
  console.log(dataset);
  wx.navigateTo({
    url: '/pages/article-detail/article-detail?postId=' + dataset.topicid,
  });
}
})

