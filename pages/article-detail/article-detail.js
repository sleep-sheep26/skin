// pages/article-detail/article-detail.js
const { httpGet,httpPost } = require("../../utils/http");
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH: 0,
    windowHeight: 0,//记录界面高度

    containerHeight: 0,//记录未固定整体滚动界面的高度
    
    containerBottomHeight: 0,//记录未固定整体滚动界面距离底部高度
    
    keyboardHeight: 0,//键盘高度
    
    isIphone: false, //是否为苹果手机，因苹果手机效果与Android有冲突，所以需要特殊处理

    isVideoInfoShow:false,

    commentsContent: '', // 初始化评论内容为空

    isliked: false,

    likenums: 1,

    topicId: 0,

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
    const topicId = options.postId; // 获取传递过来的帖子ID
    console.log("topicId",topicId);
    var that = this
    that.setData({
      navH: app.globalData.navHeight
    });

    wx.getSystemInfo({

      success: function(res) {
      that.data.windowHeight = res.windowHeight
      that.data.isIphone = res.model.indexOf("iphone") >= 0 || res.model.indexOf("iPhone") >= 0
      // console.error(res)    
      }
      });


    httpGet({
      url: '/community/topic/' + topicId,  
      success: (res) => {
        let postDetail = res.data.data
        console.log("帖子内容查看",postDetail)
        postDetail.createTime = new Date(postDetail.createTime).toLocaleDateString()
        postDetail.comments.forEach(element => {
          element.createTime = new Date(element.createTime).toLocaleDateString()
        });
        // 渲染帖子详情到页面中
        this.setData({
          postDetail,  // 获取到的帖子详情数据
          likenums: postDetail.likes,
          topicId:parseInt(topicId),
        });
      },
      fail: (err) => {
        console.error('请求失败', err);
      },
    });

  },

  thisImage:function(e){
    let index = e.currentTarget.dataset.imageid ;
    let imgslist = this.data.postDetail.imgs;
    console.log(index)
    wx.previewImage({
      urls: imgslist,
      current: imgslist[index]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
var that = this

setTimeout(() => {

//界面初始化渲染需要初始化获取整体界面的高度以及距离信息

that.refreshContainerHeight()

}, 800);
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

  backToIndex:function(e){
    wx.navigateBack({
     delta: 1
    })
   },

/**

* 刷新整体界面高度、距离等信息，如列表有上划加载数据，需要在数据加载过后调用此方法进行高度以及间距的刷新

*/
   refreshContainerHeight: function() {

    var that = this
    
    var query = wx.createSelectorQuery();
    
    query.select('.container').boundingClientRect()
    
    query.exec((res) => {
    
    //container为整体界面的class的样式名称
    
    that.data.containerHeight = res[0].height;
    
    that.data.containerBottomHeight = res[0].bottom
    
    })
    
    },

    /**

* 界面滚动监听

*/

onPageScroll: function(e) {

  var that = this
  
  // 界面滚动刷新整体界面高度以及间距
  
  that.refreshContainerHeight()
  
  },

/**

* 评论框焦点获取监听

*/

inputCommentsFocus: function(e) {

  var that = this
  
  if (!that.data.isIphone) {
  
  var keyboardHeight = e.detail.height
  
  var windowHeight = that.data.windowHeight
  
  var containerHeight = that.data.containerHeight
  
  var containerBottomHeight = that.data.containerBottomHeight
  
  //整体内容高度大于屏幕高度，才动态计算输入框移动的位置；
  
  if (containerHeight > windowHeight) {
  
  if ((containerBottomHeight - windowHeight) > keyboardHeight) {
  
  //距离底部高度与屏幕高度的差值大于键盘高度，则评论布局上移键盘高度；
  
  that.setData({
  
  keyboardHeight: e.detail.height
  
  })
  
  } else {
  
  //距离底部高度与屏幕高度的差值小于键盘高度，则评论布局上移距离底部高度与屏幕高度的差值；
  
  var newHeight = containerBottomHeight - windowHeight
  
  that.setData({
  
  keyboardHeight: newHeight
  
  })
  
  }
  
  } else {
  
  that.setData({
  
  keyboardHeight: 0
  
  })
  
  }
  
  } else {
  
  that.setData({
  
  keyboardHeight: 0
  
  })
  
  }
  
  },

/**
* 评论框焦点失去监听
*/

inputCommentsBlur: function(e) {

  var that = this
  
  that.setData({
  
  keyboardHeight: 0
  
  })
  
  },

  inputCommentsContentListening: function(e) {
    this.setData({
      commentsContent: e.detail.value // 更新评论内容
    });
  },

  // 点击评论按钮时触发的函数
  clickComments: function() {
    // 获取输入框中的内容
    const content = this.data.commentsContent;
    // 提交评论内容到服务器或者其他处理
    console.log("提交评论内容：" + content);
    var that = this;

    httpGet({url: '/community/user/', success: ({data})=>{
          // 将 content、location、anonymous 等信息作为请求参数发送给服务器
      httpPost({
        url: "/community/comment/save", // 替换成服务器提交数据的接口地址
        data: {
          userId: data.data.userId,
          content: content,   
          topicId: that.data.topicId,       
        },
        success(res) {
          // 请求成功后的处理逻辑
          console.log('数据提交成功', res.data);
          //重新获取页面内容以刷新页面
          httpGet({
            url: '/community/topic/' + that.data.topicId,  
            success: (res) => {
              let postDetail = res.data.data
              console.log("帖子内容查看2",postDetail)
              postDetail.createTime = new Date(postDetail.createTime).toLocaleDateString()
              postDetail.comments.forEach(element => {
                element.createTime = new Date(element.createTime).toLocaleDateString()
              });
              // 渲染帖子详情到页面中
              that.setData({
                postDetail,  // 获取到的帖子详情数据
              });
            },
            fail: (err) => {
              console.error('请求失败', err);
            },
          });

        },
        fail(err) {
          // 请求失败后的处理逻辑
          console.error('数据提交失败', err);
        }
      })
    }})

    // 清空输入框内容
    this.setData({
      commentsContent: ''
    });
  },

  toggleLike: function() {
    // 切换点赞状态

    this.setData({
      isLiked: !this.data.isLiked,
      likenums: this.data.isLiked ? this.data.likenums - 1 : this.data.likenums + 1,
    });
    


  },

  
  
})


