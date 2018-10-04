import {
  findInfo
} from '../../api/resourceController.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommendModal:'',
    userResourceModal:'',
    resourceType:null,
    commentList:[],
    resourceContent:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      recommendModal: options.recommendModal,
      userResourceModal: options.userResourceModal,
    })
    const param = {
      rid:1,
      uid:1
      // uid:app.globalData.uid
    }
    findInfo(param).then((data) =>{
      this.setData({
        resourceType:data.resource.type,
        commentList:data.resource.commentInfos,
        resourceContent:data.resource.content
      })
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
})