const app = getApp();
import {
  selectNoAgree,
  agreeAdd,
  followerDeleteOne
} from '../../../../api/followerController.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    applicationList: [],//好友申请列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.updateApplicationList();
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

  //获取好友申请列表信息
  updateApplicationList(){
    const param = {
      uid: app.globalData.uid,
    };
    selectNoAgree(param).then((data) => {
      this.setData({
        applicationList: data.followers,
      })
    })
  },

  //同意好友申请
  agreeHints(e){
    const param = {
      followerId: e.target.dataset.id
    }
    console.log(param)
    agreeAdd(param).then((data) => {
      wx.showToast({
        title: '添加好友成功',
        icon: 'success',
        duration: 1500,
      })
      this.updateApplicationList();
    })
  },
  
  //不同意好友申请
  disagreeHints(e){
    const param = {
      followerId: e.target.dataset.id
    }
    console.log(param)
    followerDeleteOne(param).then((data) => {
      wx.showToast({
        title: '已拒绝申请',
        icon: 'success',
        duration: 1500,
      })
      this.updateApplicationList();
    })
  }
})