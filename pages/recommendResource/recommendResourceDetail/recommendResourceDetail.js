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
    recommendModal: '',
    userResourceModal: '',
    resourceType: null, //资源类型 0：图文，1：音频
    commentList: [], //资源评论列表
    commentListOfNew: [], //最新资源评论列表
    resourceContent: '', //资源文本内容
    commentMsgValue: '', //发送评论的内容
    showMask: false, //发表评论时遮盖其他部分
    pubSuccess: false, //评论发表成功
    scrollHeight: null,//滚动部分高度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      resouceId: options.resouceId
    })
    // 高度适配
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight - 250, //250为页面出去滚动部分其余高度
        });
      }
    });
    this.findCommentInfo();
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

  /**
   * 加载点赞数最高三条评论
   */
  findCommentInfo: function () {
    const param = {
      rid: 1,
      uid: 19
      // uid:app.globalData.uid
    }
    findInfo(param).then((data) => {
      this.setData({
        resourceType: data.resource.type,
        commentList: data.resource.commentInfos,
        resourceContent: data.resource.content
      })
      this.findCommentInfoNew();
    })

  },
  /**
   * 加载最新评论
   */
  findCommentInfoNew: function () {
    const param = {
      rid: 1,
      uid: 19
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
  doComment: function (e) {
    this.setData({
      commentMsgValue: e.detail.value
    })
  },

  /**
   * 输入框聚焦触发蒙层出现
   */
  maskShow: function () {
    this.setData({
      showMask: true,
    })
  },

  /**
   * 关闭蒙层
   */
  maskClose: function () {
    this.setData({
      showMask: false,
    })
  },

  /**
   * 发表评论
   */
  submitSendComment: function () {
    console.log(this.data.commentMsgValue)
    var comment = this.data.commentMsgValue;
    if (!!comment) {
      const param = {
        commentUid: 19,
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
          this.findCommentInfo();
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
  deletePraise: function (e) {
    console.log(e.target.dataset.praiseid)
    const param = {
      praiseId: e.target.dataset.praiseid,      
      workId: e.target.dataset.id,
      workType: 1,
      praiseUid: 19
    }
    praiseDeleteOne(param).then((data) => {
      this.findCommentInfo();
    })
  },

  /**
   * 给评论添加点赞
   */
  addPraise: function (e) {
    console.log(e.target.dataset.id);
    const param = {
      workId: e.target.dataset.id,
      workType: 1,
      praiseUid: 19
    }
    praiseAddOne(param).then((data) => {
      this.findCommentInfo();
    })
  },

  /**
 * 对评论删除举报
 */
  deleteReport: function (e) {
    const param = {
      workId: e.target.dataset.id,
      workType: 1,
      reportUid: 19
    }
    reportDeleteOne(param).then((data) => {
      this.findCommentInfo();
    })
  },

  /**
   * 对评论添加举报
   */
  addReport: function (e) {
    // console.log(e.target.dataset.reportid)
    const param = {
      // reportid:e.target.dataset.reportid,
      workId: e.target.dataset.id,
      workType: 1,
      reportUid: 19
    }
    reportAddOne(param).then((data) => {
      this.findCommentInfo();
    })
  }
})