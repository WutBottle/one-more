// pages/recommendResource/recommendResource.js
const audioManager = wx.getBackgroundAudioManager()
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
} from '../../api/bookShelfController.js'

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chapterId: null,
    scrollHeight: null, //滚动部分高度
    sysResource: [],
    userResource: [],
    userResourceSingle: [],
    // changeCount:null,
    value: 0,
    percent: 0,
    max: 401,
    pass_time_sys: '00:00',
    pass_time_user: '00:00',
    total_time_sys: '00:00',
    total_time_user: '00:00',
    // pause: '暂停',
    picSrc: '../../images/pause.png',
    pause_disable: true,
    isSysStart: false,
    isUserStart: false,
    disabledSys: true,
    disabledUser: true
  },
  wxzxSlider: null,
  sysResourceType: null,
  userResourceIndex: 0, //用户资源序号

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
    var that = this
    this.setData({
      chapterId: options.chapterId
    })
    // 高度适配
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight, //250为页面出去滚动部分其余高度
          changeCount: 3,
        });
      }
    });
    this.addBookShelf(); //添加一条书架记录
    this.loadOurResource();
    setTimeout(function() {
      that.wxzxSlider = that.selectComponent('#wxzxSlider');
      that.wxzxSlider1 = that.selectComponent('#wxzxSlider1');
      audioManager.onTimeUpdate(function() {
        if (!that.wxzxSlider.properties.isMonitoring) {
          return
        } else if (!that.wxzxSlider1.properties.isMonitoring) {
          return
        }
        var currentTime = audioManager.currentTime.toFixed(0);
        if (currentTime > that.data.max) {
          currentTime = that.data.max;
        }
        if (that.data.isSysStart) {
          var pass_time = that.secondTransferTime(currentTime);
          that.setData({
            value: currentTime,
            pass_time_sys: pass_time,
            percent: audioManager.buffered / audioManager.duration * 100,
            disabledSys: false
          })
        } else {
          var pass_time = that.secondTransferTime(currentTime);
          that.setData({
            value: currentTime,
            pass_time_user: pass_time,
            percent: audioManager.buffered / audioManager.duration * 100,
            disabledUser: false
          })
        }
      })

      audioManager.onWaiting(function() {
        if (that.data.isSysStart) {
        that.setData({
          disabledSys: true
        })
        } else if (that.data.isSysStart) {
          that.setData({
            disabledUser: true
          })
        }
      })

      audioManager.onEnded(function() {
        if (that.data.isSysStart) {
          that.setData({
            // pause: '暂停',
            picSrc: '../../images/play.png',
            pause_disable: true,
            value: 0,
            pass_time_sys: '00:00',
            percent: 0,
            disabledSys: true,
            isSysStart: false
          })
        } else {
          that.setData({
            // pause: '暂停',
            picSrc: '../../images/play.png',
            pause_disable: true,
            value: 0,
            pass_time_user: '00:00',
            percent: 0,
            disabledUser: true,
            isUserStart: false
          })
        }
      })
    }, 1000)

  },

  // 点击slider时调用
  sliderTap: function(e) {
    console.log("sliderTap")
    this.seek(e.target.dataset.res)
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
    this.seek(e.target.dataset.res)
  },

  // 滑动取消 （左滑时滑到上一页面或电话等情况）
  sliderCancel: function(e) {
    console.log("sliderCancel")
    this.seek(e.target.dataset.res)
  },

  seek: function(resType) {
    var that = this;
    if (resType =='sysResource') {
      var value = parseInt(that.wxzxSlider.properties.value) 
      console.log(value);
      var seek_time = value.toFixed(0);
      var pass_time = that.secondTransferTime(seek_time);
      that.setData({
        pass_time_sys: pass_time,
      })
      audioManager.seek(Number(seek_time));
    } else {
      var value = that.wxzxSlider1.properties.value
      console.log(value)
      var seek_time = value.toFixed(0);
      var pass_time = that.secondTransferTime(seek_time);
      that.setData({
        pass_time_user: pass_time,
      })
      audioManager.seek(Number(seek_time));
    }
  },

  startSys: function(e) {
    if (e.target.dataset.res === 'sysResource') {
      audioManager.title = this.data.sysResource.title;
      audioManager.epname = '';
      audioManager.singer = this.data.sysResource.fakeName;
      audioManager.coverImgUrl = this.data.sysResource.imageUrl;
      audioManager.src = this.data.sysResource.audioUrl;
      this.setData({
        isSysStart: true,
        picSrc: '../../images/pause.png',
        pause_disable: false
      })
    }
  },

  startUser: function(e) {
    if (e.target.dataset.res === 'userResource') {
      audioManager.title = this.data.userResourceSingle.title;
      audioManager.epname = '';
      audioManager.singer = this.data.userResourceSingle.fakeName;
      audioManager.coverImgUrl = this.data.userResourceSingle.imageUrl;
      audioManager.src = this.data.userResourceSingle.audioUrl;
      this.setData({
        isUserStart: true,
        picSrc: '../../images/pause.png',
        pause_disable: false
      })
    }
  },

  pause: function(e) {
    if (e.target.dataset.res === 'sysResource') {
      if (audioManager.paused) {
        audioManager.play()
        this.setData({
          picSrc: '../../images/pause.png',
        })
      } else {
        audioManager.pause()
        this.setData({
          picSrc: '../../images/play.png',
        })
      }
    } else if (e.target.dataset.res === 'userResource') {
      if (audioManager.paused) {
        audioManager.play()
        this.setData({
          picSrc: '../../images/pause.png',
        })
      } else {
        audioManager.pause()
        this.setData({
          picSrc: '../../images/play.png',
        })
      }
    }
  },

  stop: function(e) {
    if (e.target.dataset.res === 'sysResource') {
      audioManager.stop()
      this.setData({
        isSysStart: false,
        picSrc: '../../images/play.png',
        pause_disable: true,
        value: 0,
        pass_time: '00:00',
        percent: 0,
        disabledSys: true
      })
    } else if (e.target.dataset.res === 'userResource') {
      audioManager.stop()
      this.setData({
        isUserStart: false,
        picSrc: '../../images/play.png',
        pause_disable: true,
        value: 0,
        pass_time: '00:00',
        percent: 0,
        disabledUser: true
      })
    }
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
  addBookShelf: function() {
    const param = {
      chapterId: this.data.chapterId,
      shelfUid: app.globalData.uid
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
      uid: app.globalData.uid
    }
    findOurResource(param).then((data) => {
      if (data.status === true && data.resources.length != 0) {
        this.sysResourceType = data.resources[0].type
        var timeLength = this.secondTransferTime(data.resources[0].timeLength)
        this.setData({
          total_time_sys: timeLength,
          sysResource: data.resources[0],
        })
      } else {
        console.log("暂无系统发表资源或查找资源失败！")
      }
      this.loadUserResource();
    })
  },

  /**
   * 加载三条图文用户资源
   */
  loadUserResource: function() {
    this.changeResource();
  },

  /**
   * 给系统资源删除点赞
   */
  deletePraise: function(e) {
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
  addPraise: function(e) {
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
  deleteTextPraise: function(e) {
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
  addTextPraise: function(e) {
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
  deleteAudioPraise: function(e) {
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
  addAudioPraise: function(e) {
    const param = {
      workId: e.target.dataset.id,
      workType: 0,
      praiseUid: app.globalData.uid
    }
    praiseAddOne(param).then((data) => {
      let tempData = this.data.userResourceSingle;
      tempData.praiseStatus = 1;
      tempData.praiseNum = tempData.praiseNum + 1;
      this.setData({
        userResourceSingle: tempData
      })
    })
  },

  /**
   * 对资源删除举报
   */
  deleteReport: function(e) {
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
  addReport: function(e) {
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
  changeResource: function() {
    var that = this;
    const param = {
      chapterId: that.data.chapterId,
      uid: app.globalData.uid
    }
    findUserThreeResource(param).then((data) => {
      var param = param;
      // 如果是图文类型的话 加载三条
      if (data.status === true && data.resources.length != 0) {
        if (data.resources[0].type == 0) {
          that.setData({
            userResource: data.resources
          })
        } else if (data.resources[0].type == 1) {
          //音频资源 加载一条
          var timeLength = this.secondTransferTime(data.resources[0].timeLength)
          that.setData({
            total_time_user: timeLength,
            userResourceSingle: data.resources[0]
          })
        }
      } else {
        console.log("暂无用户发表资源或查找资源失败！")
      }
    })
  },

  /**
   * 跳转对应资源详情页
   */
  gotoResDetailPage: function(e) {
    wx.navigateTo({
      url: 'recommendResourceDetail/recommendResourceDetail?resourceId=' + e.target.dataset.id,
    })
  },

  /**
   * 跳转发表资源页
   */
  gotoPublishPage: function(e) {
    wx.navigateTo({
      url: 'publishResource/publishResource?chapterId=' + this.data.chapterId + '&resourceType=' + this.sysResourceType,
    })
  },

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
  }
})