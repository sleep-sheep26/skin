// pages/serach/search.js
const { httpGet } = require("../../utils/http");
var app = getApp()
Page({
  data: {
    navH: 35,
    inputVal: '', // 输入框中的值
    historyKeywords: [] // 历史搜索记录
  },
  backLastPage: function(){
    wx.navigateBack({
      delta: 1,
    })
  },
  // 输入框输入事件
  onInput: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  // 点击搜索按钮
  search: function() {
    let keyword = this.data.inputVal.trim();
    if (keyword === '') {
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none'
      });
      return;
    }
    // 跳转到结果页面，并将搜索关键词传递过去
    wx.navigateTo({
      url: '/pages/search-detail/search-detail?keyword=' + encodeURIComponent(keyword)
    });
    // 更新历史搜索记录
    this.updateHistory(keyword);
  },

 // 选择历史搜索关键词
 selectHistory: function(e) {
  let keyword = e.currentTarget.dataset.keyword;
  // 将选中的历史搜索关键词填入输入框
  this.setData({
    inputVal: keyword
  });
  // 跳转到结果页面，并将历史搜索关键词传递过去
  wx.navigateTo({
    url: '/pages/search-detail/search-detail?keyword=' + encodeURIComponent(keyword)
  });
},

  // 更新历史搜索记录
  updateHistory: function(keyword) {
    let historyKeywords = this.data.historyKeywords;
    // 如果历史搜索中已经存在该关键词，则将其移到第一个位置
    let index = historyKeywords.indexOf(keyword);
    if (index !== -1) {
      historyKeywords.splice(index, 1);
    }
    historyKeywords.unshift(keyword);
    // 只保留前五个历史搜索记录
    if (historyKeywords.length > 5) {
      historyKeywords.pop();
    }
    this.setData({
      historyKeywords: historyKeywords
    });
  }
});
