// pages/recommendResource/recommendResouce.js
import {
  findOurResource,
  findUserResource
} from '../../api/resourceController.js'

import {
  praiseAddOne,
  praiseDeleteOne
} from '../../api/praiseController.js'

import {
  reportAddOne,
  reportDeleteOne
} from '../../api/reportController.js'

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: null, //滚动部分高度
    sysResource: [],
    userResource: [],
    userResourceSingle:[],
    changeCount:null,
  },
    userResourceIndex:0,//用户资源序号
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
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
    this.loadOurResource();
    this.loadUserResource();
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
   * 加载系统资源
   */
  loadOurResource: function() {
    const param = {
      chapterId: this.data.chapterId,
      uid:19
    }
    findOurResource(param).then((data) => {
      if (data.status === true) {
        this.setData({
          sysResource: data.resources[0],
        })
      }
    })
  },

  /**
   * 加载用户资源
   */
  loadUserResource: function () {
    const param = {
      chapterId: this.data.chapterId,
      uid:19
    }
    findUserResource(param).then((data) => {
      if (data.status === true) {
        this.setData({
          userResource: data.resources,
          userResourceSingle:data.resources[0]
        })
      }
    })
  },

  /**
 * 给资源删除点赞
 */
  deletePraise: function (e) {
    console.log(e.target.dataset.praiseid)
    const param = {
      praiseId: e.target.dataset.praiseid,
      workId: e.target.dataset.id,
      workType: 0,
      praiseUid: 19
    }
    praiseDeleteOne(param).then((data) => {
      this.loadOurResource();
      this.loadUserResource();
    })
  },

  /**
   * 给资源添加点赞
   */
  addPraise: function (e) {
    console.log(e.target.dataset.id);
    const param = {
      workId: e.target.dataset.id,
      workType: 0,
      praiseUid: 19
    }
    praiseAddOne(param).then((data) => {
      this.loadOurResource();
      this.loadUserResource();
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
      reportUid: 19
    }
    reportDeleteOne(param).then((data) => {
      this.loadOurResource();
      this.loadUserResource();
    })
  },

  /**
   * 对资源添加举报
   */
  addReport: function (e) {
    // console.log(e.target.dataset.reportid)
    const param = {
      // reportid:e.target.dataset.reportid,
      workId: e.target.dataset.id,
      workType: 0,
      reportUid: 19
    }
    reportAddOne(param).then((data) => {
      this.loadOurResource();
      this.loadUserResource();
    })
  },

  /**
   * 资源换一换
   */
  changeResource:function() {
    let index = this.userResourceIndex;
    index=(index+1)%3;
    console.log(index);
    this.setData({
      userResourceSingle:this.data.userResource[index],
    })
    this.userResourceIndex = index;
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