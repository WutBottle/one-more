// pages/message/messageComment/messageComment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: ['我发出的', '我收到的'],
    current: 0, //当前选中的Tab项
    clientHeight: null, //高度适配
    commentSend: [
      {
        userId: 1,
        username: "王玉菡",
        avatarUrl: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1810152264,2923293270&fm=27&gp=0.jpg",
        time: "09-16 18:00",
        latestMsg: "你今天读了哪一本书",
        noRead: true,
      }, {
        userId: 2,
        username: "杨震",
        avatarUrl: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1804819840,2974605393&fm=27&gp=0.jpg",
        time: "09-16 18:00",
        latestMsg: "你今天读了哪一本书",
        noRead: true,
      }, {
        userId: 3,
        username: "张鹏",
        avatarUrl: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3028269206,4116848032&fm=27&gp=0.jpg",
        time: "09-16 18:00",
        latestMsg: "你今天读了哪一本书",
        noRead: true,
      }, {
        userId: 4,
        username: "曹雪纯",
        avatarUrl: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1663046701,2739831134&fm=27&gp=0.jpg",
        time: "09-16 18:00",
        latestMsg: "你今天读了哪一本书",
        noRead: false,
      }, {
        userId: 4,
        username: "曹雪纯",
        avatarUrl: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1663046701,2739831134&fm=27&gp=0.jpg",
        time: "09-16 18:00",
        latestMsg: "你今天读了哪一本书",
        noRead: false,
      }, {
        userId: 4,
        username: "曹雪纯",
        avatarUrl: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1663046701,2739831134&fm=27&gp=0.jpg",
        time: "09-16 18:00",
        latestMsg: "你今天读了哪一本书",
        noRead: false,
      }, {
        userId: 4,
        username: "曹雪纯",
        avatarUrl: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1663046701,2739831134&fm=27&gp=0.jpg",
        time: "09-16 18:00",
        latestMsg: "你今天读了哪一本书",
        noRead: false,
      }, {
        userId: 4,
        username: "曹雪纯",
        avatarUrl: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1663046701,2739831134&fm=27&gp=0.jpg",
        time: "09-16 18:00",
        latestMsg: "你今天读了哪一本书",
        noRead: false,
      }
    ],
    commentGet: [
      {
        userId: 1,
        username: "王玉菡",
        avatarUrl: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1810152264,2923293270&fm=27&gp=0.jpg",
        time: "09-16 18:00",
        latestMsg: "你今天读了哪一本书",
        noRead: true,
      }, {
        userId: 2,
        username: "杨震",
        avatarUrl: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1804819840,2974605393&fm=27&gp=0.jpg",
        time: "09-16 18:00",
        latestMsg: "你今天读了哪一本书",
        noRead: false,
      }, {
        userId: 3,
        username: "张鹏",
        avatarUrl: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3028269206,4116848032&fm=27&gp=0.jpg",
        time: "09-16 18:00",
        latestMsg: "你今天读了哪一本书",
        noRead: true,
      }, {
        userId: 4,
        username: "曹雪纯",
        avatarUrl: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1663046701,2739831134&fm=27&gp=0.jpg",
        time: "09-16 18:00",
        latestMsg: "你今天读了哪一本书",
        noRead: false,
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight - 50, //40为调试测试出的tabBar高度 160为轮播栏高度（ip6换算rpx和px标准）
        });
      }
    });
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
  /**
 * Tab的点击切换事件
 */
  tabItemClick: function (e) {
    //当购买窗口打开 切换tab时需关闭
    this.setData({
      current: e.currentTarget.dataset.pos,
    })
  },
  /**
   * 菜单项点击切换事件
   */
  menuItemClick: function (e) {
    this.setData({
      currentItem: e.currentTarget.dataset.idx,
    })
  },

  /**
   * 内容区域swiper的切换事件
   */
  contentChange: function (e) {

    this.setData({
      current: e.detail.current
    })
  },

})