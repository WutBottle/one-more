import {
  findInfo,
  findInfoNew
} from '../../../api/resourceController.js'

import {
  commentAddOne
} from '../../../api/commentController.js'

import {
  praiseAddOne,
  praiseDeleteOne
} from '../../../api/praiseController.js'

import {
  reportAddOne,
  reportDeleteOne
} from '../../../api/reportController.js'

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isResExit:false,
    resourceType: null, //资源类型 0：用户图文，1：用户音频，3：系统图文，4：系统音频
    resourceContent: {}, //资源内容
    commentList: [], //资源评论列表
    commentListOfNew: [], //最新资源评论列表
    commentMsgValue: '', //发送评论的内容
    showMask: false, //发表评论时遮盖其他部分
    pubSuccess: false, //评论发表成功
    scrollHeight: null, //滚动部分高度
  },
  resourceId: null,
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    this.resourceId= options.resourceId
    // 高度适配
    let that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight - 240, //250为页面出去滚动部分其余高度
        });
      }
    });
    this.findResourceInfo();
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
   * 加载资源详情&点赞数最高三条评论
   */
  findResourceInfo: function() {
    const param = {
      rid: this.resourceId,
      uid: app.globalData.uid
      // uid:app.globalData.uid
    }
    findInfo(param).then((data) => {
      if (data.status) {
        this.setData({
          isResExit:true,
          resourceType: data.resource.type,
          resourceContent: data.resource,
          commentList: data.resource.commentInfos,
        })
        this.findCommentInfoNew();
      } else {
        this.setData({
          isResExit:false
        })
      }
    })
  },
  /**
   * 加载最新评论
   */
  findCommentInfoNew: function() {
    const param = {
      rid: this.resourceId,
      uid: app.globalData.uid
      // uid:app.globalData.uid
    }
    findInfoNew(param).then((data) => {
      this.setData({
        commentList: this.data.commentList.concat(data.resource.commentInfos)
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
    var comment = this.data.commentMsgValue;
    if (!!comment) {
      const param = {
        commentUid: app.globalData.uid,
        content: comment,
        workId: this.resourceId
      }
      commentAddOne(param).then((data) => {
        this.setData({
          pubSuccess: data.status,
          showMask: false,
          commentMsgValue: ''
        })
        if (this.data.pubSuccess === true) {
          this.findResourceInfo();
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
      praiseId: e.target.dataset.praiseid,
      workId: e.target.dataset.id,
      workType: 1,
      praiseUid: app.globalData.uid
    }
    praiseDeleteOne(param).then((data) => {
      this.findResourceInfo();
    })
  },

  /**
   * 给评论添加点赞
   */
  addPraise: function(e) {
    console.log(e.target.dataset.id);
    const param = {
      workId: e.target.dataset.id,
      workType: 1,
      praiseUid: app.globalData.uid
    }
    praiseAddOne(param).then((data) => {
      this.findResourceInfo();
    })
  },

  /**
   * 对评论删除举报
   */
  deleteReport: function(e) {
    const param = {
      reportId: e.target.dataset.reportid,
      workId: e.target.dataset.id,
      workType: 1,
      reportUid: app.globalData.uid
    }
    reportDeleteOne(param).then((data) => {
      this.findResourceInfo();
    })
  },

  /**
   * 对评论添加举报
   */
  addReport: function(e) {
    const param = {
      workId: e.target.dataset.id,
      workType: 1,
      reportUid: app.globalData.uid
    }
    reportAddOne(param).then((data) => {
      this.findResourceInfo();
    })
  },

  /**
   * 音频对应事件
   */
  audioPlay: function() {
    console.log("audio play");
  },
  audioPause: function() {
    console.log("audio pause");
  },
  audioTimeUpdate: function(u) {
    // console.log(u.detail.currentTime);
    // console.log(u.detail.duration);
  },
  audioEnded: function() {
    console.log("audio end");
  },
  audioError: function(u) {
    console.log(u.detail.errMsg);
  },
})