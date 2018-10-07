const app = getApp();

import {
  historyFindAll
} from '../../api/historyController.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyListInfo:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHistoryList();
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

  //获取浏览历史数据列表
  getHistoryList(){
    const param = {
      uid: app.globalData.uid
    }
    historyFindAll(param).then((data) => {
      this.setData({
        historyListInfo: data.books
      })
    })
  }
})