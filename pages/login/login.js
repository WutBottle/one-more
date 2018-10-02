//login.js
//获取应用实例
const app = getApp();
import { userLogin } from '../../api/userController.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
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
  bindGetUserInfo(e) {
    //此处授权得到userInfo
    console.log(e.detail.userInfo);
    //接下来写业务代码
    wx.getUserInfo({
      success: res => {
        let param = {
          code: app.globalData.code,
          encryptedData: res.encryptedData,
          iv: res.iv,
        }
        userLogin(param).then((data) => {
          console.log(data);
        })
      }
    })

    //最后，记得返回刚才的页面
    wx.navigateBack({
      delta: 1
    })
  }
})