//app.js
import constant from './utils/systemConstant.js';
import {
  userLogin
} from './api/userController.js';

App({
  globalData: {
    code: null,
    userInfo:{},
    uid: null,
  },
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: resCode => {
        this.globalData.code = resCode.code;
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // 获取用户信息
        if (resCode.code) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              const param = {
                code: resCode.code,
                encryptedData: res.encryptedData,
                iv: res.iv,
              }
              //登录接口
              userLogin(param).then((data) => {
                this.globalData.uid = data.uid;
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
            fail: function() {
              //获取用户信息失败后。请跳转授权页面
              wx.showModal({
                title: '警告',
                content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
                success: function(res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '../login/login',
                    })
                  }
                }
              })
            }
          })
        }
      }
    })
  },
})