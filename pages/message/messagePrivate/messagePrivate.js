const app = getApp();
import {
  selectMessageBrief,
  selectMessageInfo,
  messageAddOne,
} from '../../../api/messageController.js';
import {
  followerAddOne,
  selectNoAgree
} from '../../../api/followerController.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    privateMessage: [],
    userDialogInfo: [],
    showDialogModal: false,
    sendMsgValue: '',//发送私信的内容
    currentUserName: '',//当前点击用户name
    uid: '',//当前用户id
    isFollow: '',//与点击用户是否是好友
  },
  currentUserId: '',//当前点击用户ID
  pageSize: 10,
  pageNum: 0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      uid: app.globalData.uid,
    })
    this.updatePrivateMsgList();
    this.updateFriendApplication();
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
    this.updateFriendApplication();
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
    this.updatePrivateMsgList();//刷新私信列表数据
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
  showDialogModal(e) {
    this.currentUserId = e.target.dataset.id; //设置当前点击私信用户的id
    this.setData({
      currentUserName: e.target.dataset.name,//设置当前点击私信用户的name
      isFollow: !!e.target.dataset.isfollow
    })
    this.updateDialogList();
    this.updatePrivateMsgList();
  },
  closeDialogModal(e) {
    if (e.target.dataset.modalblank) {
      this.updateFriendApplication();
      this.updatePrivateMsgList();
      this.setData({
        showDialogModal: false,
        sendMsgValue: '',
      })
    }
  },
  sendMsgValueChange(e) {
    this.setData({
      sendMsgValue: e.detail.value
    })
  },
  submitSendMsgValue() {
    let msgValue = this.data.sendMsgValue;
    if (!!msgValue) {
      //发送私信接口
      let param = {
        publishUid: app.globalData.uid,
        receiveUid: this.currentUserId,
        text: msgValue,
      }
      messageAddOne(param).then((data) => {
        this.updatePrivateMsgList();
        this.updateDialogList();
        this.setData({
          sendMsgValue: '',
        })
      })
    }
  },
  //获取私信列表
  updatePrivateMsgList(){
    const param = {
      uid: app.globalData.uid
    }
    selectMessageBrief(param).then((data) => {
      this.setData({
        privateMessage: data.comment,
      })
    })
  },
  //获取私信弹窗对话
  updateDialogList(){
    const param = {
      publishUid: this.currentUserId,
      receiveUid: app.globalData.uid,
      pageNum: this.pageNum,
      pageSize: this.pageSize
    }
    selectMessageInfo(param).then((data) => {
      this.setData({
        showDialogModal: true,
        userDialogInfo: data.comment.reverse(),
      })
    })
  },
  //处理添加好友
  handleAddFriends(){
    const param = {
      publishUid: app.globalData.uid,
      followerUid: this.currentUserId,
      status: 0,
    }
    followerAddOne(param).then((data) => {
      wx.showToast({
        title: '已发送申请',
        icon: 'success',
        duration: 1500,
        mask: true,
      })
    })
  },
})