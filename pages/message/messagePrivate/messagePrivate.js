import {
  selectMessageBrief,
  selectMessageInfo
} from '../../../api/messageController.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    privateMessage: [],
    userDialogInfo: {
      userId: 1,
      username: "王玉菡",
      contentList: [{
        userId: 1,
        avatarUrl: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1810152264,2923293270&fm=27&gp=0.jpg",
        content: "你今天读了哪一本书你今天读了哪一本书你今天读了哪一本书你今天读了哪一本书你今天读了哪一本书你今天读了哪一本书你今天读了哪一本书",
        sendTime: "18:00",
      }],
    },
    showDialogModal: false,
    sendMsgValue: '',
    currentUserId: '',
    pageSize:5,
    pageNum:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const param = {
      // uid:app.globalData.uid,
      uid: 1
    }
    selectMessageBrief(param).then((data) => {
      this.setData({
        privateMessage:data.comment
      })
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
  showDialogModal(e) {
    console.log(e.target.dataset.id);
    this.currentUserId = e.target.dataset.id; //设置当前点击私信用户的id    
    const param = {
      // publishUid:this.currentUserId,
      // receiveUid:app.globalData.uid
      publishUid: 1,
      receiveUid:2,
      pageNum:this.pageNum,
      pageSize:this.pageSize
    }
    selectMessageInfo(param).then((data) => {
      this.setData({
        showDialogModal: true,
        // userDialogInfo:data.      
      })
    })
  },
  closeDialogModal(e) {
    if (e.target.dataset.modalblank) {
      this.setData({
        showDialogModal: false,
        sendMsgValue: ''
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
      console.log("发送成功！");
      this.setData({
        sendMsgValue: '',
      })
    }
  }
})