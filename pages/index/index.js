//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    imgInfo: [
      { url:"https://img1.doubanio.com/dae/niffler/niffler/images/37832904-b80c-11e8-be8b-0242ac11001c.jpg"
      },{
        url: "https://img3.doubanio.com/dae/niffler/niffler/images/155d88ce-b0d7-11e8-b24b-0242ac11000e.jpg"
      },{
        url: "https://img3.doubanio.com/dae/niffler/niffler/images/f90e218a-b8aa-11e7-9cc5-0242ac110021.jpg"
      },{
        url: "https://img1.doubanio.com/dae/niffler/niffler/images/81c6658c-6341-11e8-b830-0242ac110019.jpg"
      }],
  },
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  }
})
