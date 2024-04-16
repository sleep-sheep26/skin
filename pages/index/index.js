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
    currentpage: 1,
    currentsort: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.setData({
      navH: app.globalData.navHeight
    });
    this.get_newposts(this.data.currentsort);
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
    this.fresh_posts();
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


//获取新帖子
get_newposts: function(sort){
  wx.showLoading({
    title: '加载中',  // 加载提示框的标题
    mask: true,       // 是否显示透明蒙层
  });
  httpGet({
      url: '/community/topic/page/',
      data: {
        page: 1,
        limit:5,
        sort: sort,
      },
      success: ({data}) => {
        // 使用从服务器获取的帖子更新页面状态中的帖子数据
        console.log(data)
        data.data.forEach(element => {
          element.createTime = new Date(element.createTime).toLocaleDateString()
        });

        this.setData({
          posts: data.data,
          currentsort:sort,
        });
        wx.hideLoading();
        
      },
      fail: (err) => {
        console.error('获取帖子失败：', err);
        wx.hideLoading();
      },
    });


},


//刷新帖子
fresh_posts: function(){
  
  wx.showLoading({
    title: '加载中',  // 加载提示框的标题
    mask: true,       // 是否显示透明蒙层
  });
  this.setData({
    currentpage: this.data.currentpage + 1,
  });

  httpGet({
    url: '/community/topic/page/',
    data: {
      page: this.data.currentpage,
      limit:5,
      sort: this.data.currentsort,
    },
    success: ({data}) => {
      // 使用从服务器获取的帖子更新页面状态中的帖子数据
      wx.hideLoading();
      console.log(data)
      data.data.forEach(element => {
        element.createTime = new Date(element.createTime).toLocaleDateString()
      });

      this.setData({
        posts: this.data.posts.concat(data.data),
      });
      
    },
    fail: (err) => {
      console.error('获取帖子失败：', err);
      wx.hideLoading();
    },
  });

  
},



goTonewsort:function(event){
// 获取被点击的图片所在的父级组件
const sortId = event.target.dataset.parenttarget.sortid;
// 从父级组件的自定义数据中获取 sortid
  console.log(sortId);
  this.setData({
     currentsort: sortId  // 更新当前分类的状态变量
    });

    this.get_newposts(this.data.currentsort);


},




// 跳转到详情页面
navigateToDetail: function (event) {
  const dataset = event.currentTarget.dataset; // 获取点击的帖子信息
  console.log("获取到的帖子信息2：",dataset);
  wx.navigateTo({
    url: '/pages/article-detail/article-detail?postId=' + dataset.topicid,
  });
}
})

