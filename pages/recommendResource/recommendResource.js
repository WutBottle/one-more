// pages/recommendResource/recommendResouce.js
var app = getApp();
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
    changeCount:null,
  },
    sysResourceType:null,
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
    this.addBookShelf();//添加一条书架记录
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
        this.setData({
          sysResourceType: data.resources[0].type,
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
      uid:app.globalData.uid
    }
    findUserResource(param).then((data) => {
      if (data.status === true) {
        this.setData({
          userResource: data.resources,
          userResourceSingle: data.resources[this.userResourceIndex]
        })
      }
    })
  },

  /**
 * 给资源删除点赞
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
      this.loadUserResource();
    })
  },

  /**
   * 给资源添加点赞
   */
  addPraise: function (e) {
    const param = {
      workId: e.target.dataset.id,
      workType: 0,
      praiseUid: app.globalData.uid
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
      reportUid: app.globalData.uid
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
      reportUid: app.globalData.uid
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
      changeCount: this.data.changeCount-1
    })
    this.userResourceIndex = index;
  },

  /**
   * 跳转对应资源详情页
   */
  gotoResDetailPage:function(e) {
    console.log(e.target.dataset.id);
    wx.navigateTo({
      url: 'recommendResourceDetail/recommendResourceDetail?resourceId='+e.target.dataset.id,
    })
  },

  /**
   * 跳转发表资源页
   */
  gotoPublishPage:function(e) {
    console.log(this.data.chapterId)
    wx.navigateTo({
      url: 'publishResource/publishResource?chapterId=' + this.data.chapterId +'&resourceType='+this.resourceType,
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