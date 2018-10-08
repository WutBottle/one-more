// pages/message/messageComment/messageComment.js
import {
  findAllReceive,
  findAllSend,
  countAllReceive
} from '../../../api/commentController.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: ['我发出的', '我收到的'],
    current: 0, //当前选中的Tab项
    clientHeight: null, //高度适配
    commentSend: [],
    commentGet: [],
    unReadCount:0,//未读评论条数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          clientHeight: res.windowHeight - 50, //50为导航切换栏高度
        });
      }
    });

    this.findSend();
    this.findReceive();
    this.countUnread();
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
   * Tab的点击切换事件
   */
  tabItemClick: function(e) {
    //当购买窗口打开 切换tab时需关闭
    this.setData({
      current: e.currentTarget.dataset.pos,
    })
  },
  /**
   * 菜单项点击切换事件
   */
  menuItemClick: function(e) {
    this.setData({
      currentItem: e.currentTarget.dataset.idx,
    })
  },

  /**
   * 内容区域swiper的切换事件
   */
  contentChange: function(e) {

    this.setData({
      current: e.detail.current
    })
  },

  /**
   * 收到未读评论条数
   */
  countUnread:function(){
    const param={
      uid:app.globalData.uid
    }
    countAllReceive(param).then((data) =>{
      this.setData({
        unReadCount:data.unReadCount
      })
    })
  },

  /**
   * 加载我发出的所有评论
   */
  findSend: function() {
    const param = {
      uid: app.globalData.uid,
    }
    findAllSend(param).then((data) => {
      this.setData({
        commentSend: data.comment
      })
    })
  },
  /**
   * 加载我收到的所有评论
   */
  findReceive: function() {
    const param = {
      uid: app.globalData.uid,
    }
    findAllReceive(param).then((data) => {
      this.setData({
        commentGet: data.comment
      })
    })
  },

  /**
   * 跳转对应资源详情页
   */
  gotoResDetailPage: function(e) {
    console.log(e.target.dataset.id);
    wx.navigateTo({
      url: '../../recommendResource/recommendResourceDetail/recommendResourceDetail?resourceId=' + e.target.dataset.id,
    })
  },
})