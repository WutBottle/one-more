const app = getApp();

import {
  selectBookInfo
} from '../../api/bookController.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookInfo: {},
    showTipModal: false,//提示弹窗标记
  },
  bookId: null,
  uid: null,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.bookId = 2;
    this.uid = 8;
    this.updateCatalog();
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

  //处理点击目录
  handleTapCatalog(e){
    console.log(e.target.dataset)
    if (!e.target.dataset.status){
      this.setData({
        showTipModal: true
      })
    }else{
      //跳转到资源配置页面
    }
  },

  //刷新书籍详情页面
  updateCatalog(){
    const param = {
      bookId: this.bookId,
      uid: this.uid
    }
    selectBookInfo(param).then((data) => {
      this.setData({
        bookInfo: data.book[0]
      })
    })
  },

  //关闭tip弹窗
  closeTipModal(){
    this.setData({
      showTipModal: false,
    })
  }
})