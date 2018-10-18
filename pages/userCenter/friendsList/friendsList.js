const app = getApp();

import {
  selectAllFollower,
  followerDeleteOne
} from '../../../api/followerController.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listInfo: [],
    uid: '',//自己的uid
    fakeName: '',//点击的用户name
    isFollow: null,
    showDeteleModal: false,//删除确认弹窗
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFriendsList();
    this.setData({
      uid: app.globalData.uid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.dialogModal = this.selectComponent("#dialogModal");
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

  //出现删除弹窗
  showDeleteModal(e){
    this.followerId = e.target.dataset.id;
    this.setData({
      showDeteleModal: true,
    })
  },

  //关闭删除弹窗
  closeDialogModal(e){
    if (e.target.dataset.modalblank) {
      //关闭弹窗后要重置页面数据状态
      this.setData({
        showDeteleModal: false,
      })
    }
  },

  //取消删除好友
  cencelDelete(){
    this.setData({
      showDeteleModal: false,
    })
  },

  //确认删除好友
  confirmDelete(){
    const param = {
      followerId: this.followerId
    }
    followerDeleteOne(param).then((data) => {
      this.getFriendsList();
      wx.showToast({
        title: '删除成功',
        icon: 'success',
        duration: 2000,
        success: () => {
          this.setData({
            showDeteleModal: false,
          })
        }
      });
    })
  },

  //点击私信
  handleDialogClick(e){
    this.dialogModal.openDialogModal(e.target.dataset.id, e.target.dataset.name, true);
  },

  //获取好友列表
  getFriendsList(){
    const param = {
      uid: app.globalData.uid
    }
    selectAllFollower(param).then((data) => {
      this.setData({
        listInfo: data.followers
      })
    })
  },
})