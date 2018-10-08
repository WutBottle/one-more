const app = getApp();

import {
  getFunTestList,
  getTestStem
} from '../../api/problemController.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    testList: [],
    stemInfo: {},
    ifShowTestStem: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.updateFunTestList();
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
    this.setData({
      ifShowTestStem: false
    })
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

  //获取趣味测试列表
  updateFunTestList(){
    const param = {
      uid: app.globalData.uid,
    }
    getFunTestList(param).then((data) => {
      this.setData({
        testList: data.problems,
      })
    })
  },

  //弹出题干
  showTestStem(e){
    const param = {
      problemId: e.target.dataset.id
    }
    getTestStem(param).then((data) => {
      this.setData({
        stemInfo: data.problem,
        ifShowTestStem: true,
      })
    })
  },

  //关闭题干
  closeTestStem(e){
    if (e.target.dataset.modalblank){
      this.setData({
        ifShowTestStem: false,
      })
    }else{
      this.setData({
        ifShowTestStem: true,
      })
    }
  },

  //跳转到测试页面
  startTest(e){
    wx.navigateTo({
      url: 'testDetail/testDetail?problemId=' + e.target.dataset.id,
    })
  }
})