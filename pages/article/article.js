// pages/article/article.js
const { uploadFiles } = require("../../utils/http");
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH: 0,
    theme: {
      color: '#1890FF',
      tabColor: '#333' || '#20ACAB',
    },
    topic:{
      sorts:
      ["问题求助", "经验分享", "专业知识"],
    selectd:0
    },
    content:"",
    location: "",
    imageList: [],
    video:{},
    anonymous: false,
    request_url: 'https://www.wolves.vip',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navHeight
    });
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

  bindContent: function(e) {
    this.setData({content: e.detail.value})
  },


  // 清空图片或视频
  clearInput: function(name){
    if (name != 'imageList') {
      this.setData({ imageList: [] })
    }
    if (name != 'video') {
      this.setData({ video: {} })
    }
  },



  // 照片相关处理
  chooseImage: async function(e){
    var that = this;
    let surplus = 9 - this.data.imageList.length
    wx.chooseMedia({
      count: surplus,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res){
        console.log('res', res)
        that.clearInput("imageList");
        let paths = res.tempFiles.map(el => el.tempFilePath)
        paths.forEach( element =>  {
          wx.getFileSystemManager().readFile({
            filePath: element,
            success(res) {
              console.log(res)
              uploadFiles({
                files:[element],
                success({data}){
                  that.addNewImage(JSON.parse(data).data.urls);
                }
              })
             
            }
          })
        });

        console.log('paths', paths)
        
        wx.showToast({
          title: '上传成功！',
        })
      }
    })
  },



  addNewImage(imagePath){
    var list = this.data.imageList
    list = list.concat(imagePath)
    console.log('imageList', list)
    this.setData({
      imageList: list
    })
  },



  thisImage:function(e){
    let index = e.currentTarget.dataset.imageid;
    let list = this.data.imageList;
    wx.previewImage({
      urls: list,
      current: list[index]
    })
  },


  deleteImage: function(e){
    let index = e.currentTarget.dataset.imageid;
    let list = this.data.imageList;
    list.splice(index, 1)
    this.setData({
      imageList: list
    })
  },

  upImage: function(url) {
    var that = this;
    var imageList = that.data.imageList;
    for (var i = 0; i < imageList.length; i++) {
      wx.uploadFile({
        url: that.data.request_url + '/upload_image', // 替换成服务器上传图片的接口地址
        filePath: imageList[i],
        name: 'image', // 与服务器约定的字段名
        success(res) {
          // 上传成功后的处理逻辑
          console.log('图片上传成功', res.data);
        },
        fail(err) {
          // 上传失败后的处理逻辑
          console.error('图片上传失败', err);
        }
      })
    }
  },

  // 视频相关处理
  chooseVideo: function(e){
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success:(res)=>{
        this.clearInput("video")
        this.setData({
          video:res
        });
        wx.showToast({
          title: '上传成功！',
        })
      }
    })
  },

  deleteVideo: function(e){
    this.setData({
      video:{}
    })
  },

  // 获取地理位置
  
  chooseLocation:function(e){
    wx.showLoading({
      title: '正在加载',
    })
    wx.chooseLocation({
      success:(res)=>{
        wx.hideLoading({
          success: (res) => {},
        })
        let address = ''; 
        address = res.name
        this.setData({
          location: address
        })
      },
      fail:(res)=>{
        wx.hideLoading({
          success: (res) => {},
        })
      }
    })
  },

  deleteLocation:function(e){
    this.setData({
      location: ''
    })
  },

  // 是否匿名
  postStatus:function(e){
    this.setData({
      anonymous: !this.data.anonymous
    },()=>{
      console.log(this.data.anonymous)
    })
  },

  // 发布的类型
  clickTag:function(e){
    console.log(e) 
    let topicId = e.target.dataset.topicid;
    let topic = this.data.topic;
    topic.selected = topicId;
    this.setData({
      topic
    })
  },

//上传内容
  submitData: function() {
    var that = this;
    // 获取用户输入的内容
    var content = that.data.content;
    // 获取用户选择的地理位置
    var location = that.data.location;
    // 获取用户是否匿名状态
    var anonymous = that.data.anonymous;
    
    // 这里编写将以上数据上传至服务器的代码，可以使用 wx.request() 方法发送 POST 请求
    // 将 content、location、anonymous 等信息作为请求参数发送给服务器
    wx.request({
      url: that.data.request_url + '/submit_data', // 替换成服务器提交数据的接口地址
      method: 'POST',
      data: {
        content: content,
        location: location,
        anonymous: anonymous
      },
      success(res) {
        // 请求成功后的处理逻辑
        console.log('数据提交成功', res.data);
      },
      fail(err) {
        // 请求失败后的处理逻辑
        console.error('数据提交失败', err);
      }
    })
  },

//返回键
  backToIndex:function(e){
   wx.navigateBack({
    delta: 1
   })
  }



})
