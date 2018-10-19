//index.js
//获取应用实例
const app = getApp();
import { bookFindNew } from '../../api/bookController.js';
Page({
  data: {
    hasUserInfo: false,
    recommendBookInfo: [],
  },
  onLoad: function (options) {
    bookFindNew().then((data) => {
      this.setData({
        recommendBookInfo: data.books,
      })
    })
  },

  recommendBookClick(e){
    wx.navigateTo({
      url: '../bookDetail/bookDetail?bookId=' + e.target.dataset.id,
    })
  },

  // 跳转随笔页面
  gotoTextPage: function () {
    wx.navigateTo({
      url: '../recommendResource/recommendResource?chapterId=3',
    })
  },

  // 跳转音频页面
  gotoAudioPage:function() {
    wx.navigateTo({
      url: '../recommendResource/recommendResource?chapterId=4',
    })
  },
})
