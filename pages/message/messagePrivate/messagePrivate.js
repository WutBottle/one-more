Page({

  /**
   * 页面的初始数据
   */
  data: {
    privateMessage:[
      {
        userId: 1,
        username: "王玉菡",
        avatarUrl: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1810152264,2923293270&fm=27&gp=0.jpg",
        time: "09-16 18:00",
        latestMsg: "你今天读了哪一本书",
        noReadMsgNum: 3,
      }, {
        userId: 2,
        username: "杨震",
        avatarUrl: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1804819840,2974605393&fm=27&gp=0.jpg",
        time: "09-16 18:00",
        latestMsg: "你今天读了哪一本书",
        noReadMsgNum: 5,
      }, {
        userId: 3,
        username: "张鹏",
        avatarUrl: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3028269206,4116848032&fm=27&gp=0.jpg",
        time: "09-16 18:00",
        latestMsg: "你今天读了哪一本书",
        noReadMsgNum: 0,
      }, {
        userId: 4,
        username: "曹雪纯",
        avatarUrl: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1663046701,2739831134&fm=27&gp=0.jpg",
        time: "09-16 18:00",
        latestMsg: "你今天读了哪一本书",
        noReadMsgNum: 1,
      }
    ],
    userDialogInfo:{
      userId: 1,
      username: "王玉菡",
      contentList: [
        {
          userId: 1,
          avatarUrl: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1810152264,2923293270&fm=27&gp=0.jpg",
          content: "你今天读了哪一本书",
          time: "18:00",
        },{
          userId: 3,
          avatarUrl: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3028269206,4116848032&fm=27&gp=0.jpg",
          content: "百年孤独啦",
          time: "18:05",
        },
      ],
      
      
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
  showDialogModal(e){
    console.log(e.target.dataset.id)
  }
})