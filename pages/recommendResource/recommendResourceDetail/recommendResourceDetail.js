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

const audioManager = wx.getBackgroundAudioManager()
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isResExit: false,
    resource:[],//资源内容
    resourceType: null, //资源类型 0：用户图文，1：用户音频，3：系统图文，4：系统音频
    resourceContent: {}, //资源内容
    commentList: [], //资源评论列表
    commentListOfNew: [], //最新资源评论列表
    commentMsgValue: '', //发送评论的内容
    showMask: false, //发表评论时遮盖其他部分
    pubSuccess: false, //评论发表成功
    scrollHeight: null, //滚动部分高度
    value: 0,
    percent: 0,
    max: 401,
    pass_time: '00:00',
    total_time_sys: '00:00',
    total_time_user: '00:00',
    // pause: '暂停',
    picSrc: '../../../images/pause.png',
    pause_disable: true,
    isStart: false,
  },
  resourceId: null,

  secondTransferTime: function(time) {
    if (time > 3600) {
      return [
          parseInt(time / 60 / 60),
          parseInt(time / 60 % 60),
          parseInt(time % 60)
        ]
        .join(":")
        .replace(/\b(\d)\b/g, "0$1");
    } else {
      return [
          parseInt(time / 60 % 60),
          parseInt(time % 60)
        ]
        .join(":")
        .replace(/\b(\d)\b/g, "0$1");
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    this.resourceId = options.resourceId
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
    setTimeout(function() {
      that.wxzxSlider = that.selectComponent('#wxzxSlider');
      audioManager.onTimeUpdate(function() {
        if (!that.wxzxSlider.properties.isMonitoring) {
          return
        }
        var currentTime = audioManager.currentTime.toFixed(0);
        if (currentTime > that.data.max) {
          currentTime = that.data.max;
        }
        var pass_time = that.secondTransferTime(currentTime);

        that.setData({
          value: currentTime,
          pass_time: pass_time,
          percent: audioManager.buffered / audioManager.duration * 100,
          disabled: false
        })
      })

      audioManager.onWaiting(function() {
        that.setData({
          disabled: true
        })
      })

      audioManager.onEnded(function() {
        that.setData({
          // pause: '暂停',
          picSrc: '../../../images/play.png',
          pause_disable: true,
          value: 0,
          pass_time: '00:00',
          percent: 0,
          disabled: true,
          isStart: false
        })
      })
    }, 1000)
  },

  // 点击slider时调用
  sliderTap: function(e) {
    console.log("sliderTap")
    this.seek()
  },

  // 开始滑动时
  sliderStart: function(e) {
    console.log("sliderStart")
  },

  // 正在滑动
  sliderChange: function(e) {
    console.log("sliderChange")
  },

  // 滑动结束
  sliderEnd: function(e) {
    console.log("sliderEnd")
    this.seek()
  },

  // 滑动取消 （左滑时滑到上一页面或电话等情况）
  sliderCancel: function(e) {
    console.log("sliderCancel")
    this.seek()
  },

  seek: function() {
    var value = this.wxzxSlider.properties.value
    console.log(value)
    var seek_time = value.toFixed(0);
    var pass_time = this.secondTransferTime(seek_time);
    this.setData({
      pass_time: pass_time,
    })
    audioManager.seek(Number(seek_time));
  },

  start: function() {
    audioManager.title = this.data.resource.title;
    audioManager.epname = '';
    audioManager.singer = this.data.resource.fakeName;
    audioManager.coverImgUrl = this.data.resource.imageUrl;
    audioManager.src = this.data.resource.audioUrl;
    this.setData({
      isStart: true,
      picSrc: '../../../images/pause.png',
      pause_disable: false
    })
  },

  pause: function(e) {
    if (audioManager.paused) {
      audioManager.play()
      this.setData({
        picSrc: '../../../images/pause.png',
      })
    } else {
      audioManager.pause()
      this.setData({
        picSrc: '../../../images/play.png',
      })
    }
  },

  stop: function() {
    audioManager.stop()
    this.setData({
      isStart: false,
      picSrc: '../../../images/play.png',
      pause_disable: true,
      value: 0,
      pass_time: '00:00',
      percent: 0,
      disabled: true
    })
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
          isResExit: true,
          resource: data.resource,
          resourceType: data.resource.type,
          resourceContent: data.resource,
          commentList: data.resource.commentInfos,
        })
        this.findCommentInfoNew();
      } else {
        this.setData({
          isResExit: false
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