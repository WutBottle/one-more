import {
  findInfo
} from '../../api/resourceController.js'

import {
  commentAddOne
} from '../../api/commentController.js'

import {
  praiseAddOne,
  praiseDeleteOne
} from '../../api/praiseController.js'

import {
  reportAddOne,
  reportDeleteOne
} from '../../api/reportController.js'

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommendModal: '',
    userResourceModal: '',
    resourceType: null, //资源类型 0：图文，1：音频
    commentList: [], //资源评论列表
    resourceContent: '', //资源文本内容
    commentMsgValue: '', //发送评论的内容
    showMask: false, //发表评论时遮盖其他部分
    pubSuccess: false, //评论发表陈工
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    this.setData({
      resouceId: options.resouceId
    })
    this.findCommentInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 用户发表评论
   */
  findCommentInfo: function() {
    const param = {
      rid: 1,
      uid: 1
      // uid:app.globalData.uid
    }
    findInfo(param).then((data) => {
      this.setData({
        resourceType: data.resource.type,
        commentList: data.resource.commentInfos,
        resourceContent: data.resource.content
      })
    })
  },

  /**
   * 用户发表评论
   */
  doComment: function(e) {
    this.setData({
      commentMsgValue: e.detail.value
    })
  },

  /**
   * 输入框聚焦触发蒙层出现
   */
  maskShow: function() {
    this.setData({
      showMask: true,
    })
  },

  /**
   * 关闭蒙层
   */
  maskClose: function() {
    this.setData({
      showMask: false,
    })
  },

  /**
   * 发表评论
   */
  submitSendComment: function() {
    console.log(this.data.commentMsgValue)
    var comment = this.data.commentMsgValue;
    if (!!comment) {
      const param = {
        commentUid: app.globalData.uid,
        content: comment,
        workId: 1
      }
      commentAddOne(param).then((data) => {
        this.setData({
          pubSuccess: data.status,
          showMask: false,
          commentMsgValue: ''
        })
        if (this.data.pubSuccess === true) {
          console.log("成功")
          wx.showToast({
            title: '发表成功',
            icon: 'success',
            duration: 1000
          });
        }
      })
    }
  },

  /**
   * 给评论删除点赞
   */
  deletePraise: function(e) {
    const param = {
      workId: e.target.dataset.id,
      workType: 1,
      praiseUid: app.globalData.uid
    }
    praiseDeleteOne(param).then((data) => {
      this.findCommentInfo();
    })
  },

  /**
   * 给评论添加点赞
   */
  addPraise: function(e) {
    const param = {
      workId: e.target.dataset.id,
      workType: 1,
      praiseUid: app.globalData.uid
    }
    praiseAddOne(param).then((data) => {
      this.findCommentInfo();
    })
  },

    /**
   * 对评论删除举报
   */
  deleteReport:function (e) {
    const param = {
      workId: e.target.dataset.id,
      workType: 1,
      reportUid: app.globalData.uid
    }
    reportDeleteOne(param).then((data) => {
      this.findCommentInfo();
    })
  },

  /**
   * 对评论添加举报
   */
  addReport: function (e) {
    const param = {
      workId: e.target.dataset.id,
      workType: 1,
      reportUid: app.globalData.uid
    }
    reportAddOne(param).then((data) => {
      this.findCommentInfo();
    })
  }
})