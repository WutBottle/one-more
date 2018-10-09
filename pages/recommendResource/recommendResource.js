// pages/recommendResource/recommendResource.js
var app = getApp();
import {
  findOurResource,
  findUserOneResource,
  findUserThreeResource
} from '../../api/resourceController.js'

import {
  praiseAddOne,
  praiseDeleteOne
} from '../../api/praiseController.js'

import {
  reportAddOne,
  reportDeleteOne
} from '../../api/reportController.js'

import {
  shelfAddOne
}from '../../api/bookShelfController.js'

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chapterId:null,
    scrollHeight: null, //滚动部分高度
    sysResource: [],
    userResource: [],
    userResourceSingle:[],
    // changeCount:null,
  },
    sysResourceType:null,
    userResourceIndex:0,//用户资源序号
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      chapterId: options.chapterId
    })
    // 高度适配
    let that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight, //250为页面出去滚动部分其余高度
          changeCount:3,
        });
      }
    });
    this.addBookShelf();//添加一条书架记录
    this.loadOurResource();
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
    this.setData({
      userResource: [],
      userResourceSingle: []
    })
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
   * 添加一条书架记录
   */
  addBookShelf:function() {
    const param ={
      chapterId:this.data.chapterId,
      shelfUid:app.globalData.uid
    }
    shelfAddOne(param).then((data) => {

    })
  },

  /**
   * 加载系统资源
   */
  loadOurResource: function() {
    const param = {
      chapterId: this.data.chapterId,
      uid:app.globalData.uid
    }
    findOurResource(param).then((data) => {
      if (data.status === true) {
        this.sysResourceType = data.resources[0].type
        this.setData({
          sysResource: data.resources[0],
        })
      }
      this.loadUserResource();
    })
  },

  /**
   * 加载三条图文用户资源
   */
  loadUserResource: function () {
    this.changeResource();
  },

  /**
 * 给系统资源删除点赞
 */
  deletePraise: function (e) {
    const param = {
      praiseId: e.target.dataset.praiseid,
      workId: e.target.dataset.id,
      workType: 0,
      praiseUid: app.globalData.uid
    }
    praiseDeleteOne(param).then((data) => {
      this.loadOurResource();
    })
  },

  /**
   * 给系统资源添加点赞
   */
  addPraise: function (e) {
    const param = {
      workId: e.target.dataset.id,
      workType: 0,
      praiseUid: app.globalData.uid
    }
    praiseAddOne(param).then((data) => {
      this.loadOurResource();
    })
  },

  /**
 * 给图文资源删除点赞（本地修改）
 */
  deleteTextPraise: function (e) {
    var index = e.target.dataset.idx;
    const param = {
      praiseId: e.target.dataset.praiseid,
      workId: e.target.dataset.id,
      workType: 0,
      praiseUid: app.globalData.uid
    }
    praiseDeleteOne(param).then((data) => {
      let tempData = this.data.userResource;
      tempData[index].praiseStatus = null;
      tempData[index].praiseNum = tempData[index].praiseNum - 1;
      this.setData({
        userResource: tempData
      })
    })
  },

  /**
   * 给图文资源添加点赞（本地修改）
   */
  addTextPraise: function (e) {
    var index = e.target.dataset.idx;
    const param = {
      workId: e.target.dataset.id,
      workType: 0,
      praiseUid: app.globalData.uid
    }
    praiseAddOne(param).then((data) => {
      let tempData = this.data.userResource;
      tempData[index].praiseStatus = 1;
      tempData[index].praiseNum = tempData[index].praiseNum + 1;
      this.setData({
        userResource: tempData
      })
    })
  },

  /**
 * 给音频资源删除点赞（本地修改）
 */
  deleteAudioPraise: function (e) {
    const param = {
      praiseId: e.target.dataset.praiseid,
      workId: e.target.dataset.id,
      workType: 0,
      praiseUid: app.globalData.uid
    }
    praiseDeleteOne(param).then((data) => {
      let tempData = this.data.userResourceSingle;
      tempData.praiseStatus = null;
      tempData.praiseNum = tempData.praiseNum - 1;
      this.setData({
        userResourceSingle: tempData
      })
    })
  },

  /**
 * 给音频资源添加点赞（本地修改）
 */
  addAudioPraise: function (e) {
    console.log(this.data.userResourceSingle)
    const param = {
      workId: e.target.dataset.id,
      workType: 0,
      praiseUid: app.globalData.uid
    }
    praiseAddOne(param).then((data) => {
      let tempData = this.data.userResourceSingle;
      tempData.praiseStatus = 1;
      tempData.praiseNum = tempData.praiseNum+1;
      this.setData({
        userResourceSingle:tempData
      })
    })
  },

  /**
 * 对资源删除举报
 */
  deleteReport: function (e) {
    const param = {
      reportId: e.target.dataset.reportid,
      workId: e.target.dataset.id,
      workType: 0,
      reportUid: app.globalData.uid
    }
    reportDeleteOne(param).then((data) => {
      this.loadOurResource();
    })
  },

  /**
   * 对资源添加举报
   */
  addReport: function (e) {
    const param = {
      workId: e.target.dataset.id,
      workType: 0,
      reportUid: app.globalData.uid
    }
    reportAddOne(param).then((data) => {
      this.loadOurResource();
    })
  },

  /**
   * 加载资源封装函数
   */
  changeResource:function() {
    var that = this;
    const param = {
      chapterId: that.data.chapterId,
      uid: app.globalData.uid
    }
    findUserThreeResource(param).then((data) => {
      var param = param;
      // 如果是图文类型的话 加载三条
      if (data.status === true && data.resources[0].type == 0) {
        that.setData({
          userResource: data.resources
        })
      } else if (data.status === true && data.resources[0].type == 1) {
        // 如果是音频类型的话 加载一条
        that.setData({
          userResourceSingle: data.resources[0]
        })
      }
    })
  },

  /**
   * 跳转对应资源详情页
   */
  gotoResDetailPage:function(e) {
    wx.navigateTo({
      url: 'recommendResourceDetail/recommendResourceDetail?resourceId='+e.target.dataset.id,
    })
  },

  /**
   * 跳转发表资源页
   */
  gotoPublishPage:function(e) {
    wx.navigateTo({
      url: 'publishResource/publishResource?chapterId=' + this.data.chapterId +'&resourceType='+this.sysResourceType,
    })
  },

  audioPlay: function () {
    console.log("audio play");
  },
  audioPause: function () {
    console.log("audio pause");
  },
  audioTimeUpdate: function (u) {
    // console.log(u.detail.currentTime);
    // console.log(u.detail.duration);
  },
  audioEnded: function () {
    console.log("audio end");
  },
  audioError: function (u) {
    console.log(u.detail.errMsg);
  }
})