const app = getApp();

import {
  selectAllFollower
} from '../../../api/followerController.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listInfo: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFriendsList();
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

  //获取好友列表
  getFriendsList(){
    const param = {
      uid: app.globalData.uid
    }
    selectAllFollower(param).then((data) => {
      this.setData({
        listInfo: data.followers
      })
    })
  }
})