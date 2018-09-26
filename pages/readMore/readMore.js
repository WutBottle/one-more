Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookValue:null,
    imgInfo: [
      {
        url: "https://img1.doubanio.com/dae/niffler/niffler/images/37832904-b80c-11e8-be8b-0242ac11001c.jpg"
      }, {
        url: "https://img3.doubanio.com/dae/niffler/niffler/images/155d88ce-b0d7-11e8-b24b-0242ac11000e.jpg"
      }, {
        url: "https://img3.doubanio.com/dae/niffler/niffler/images/f90e218a-b8aa-11e7-9cc5-0242ac110021.jpg"
      }, {
        url: "https://img1.doubanio.com/dae/niffler/niffler/images/81c6658c-6341-11e8-b830-0242ac110019.jpg"
      }, {
        url: "https://img3.doubanio.com/dae/niffler/niffler/images/f9493ac4-d428-11e7-a75c-0242ac11002e.jpg"
      }],
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
  bookValueChange(e){
    this.setData({
      bookValue: e.detail.value,
    })
  },
  submitBookValue(e){
    console.log("需要查找的书本名称是：" + e.detail.value);
  }
})