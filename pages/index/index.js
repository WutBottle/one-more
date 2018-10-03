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
    console.log(e.target.dataset.id)
  }
})
