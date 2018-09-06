//获取应用实例
const app = getApp()
import constant from '../utils/systemConstant.js';

function dispatchRequest(config) {

  return Promise.resolve(config)
    .then(config => {
      if (config.header) {
        config.header.token = (wx.getStorageSync(constant.COOKIE) || {}).token || ""
      } else {
        config.header = {
          token: (wx.getStorageSync(constant.COOKIE) || {}).token || "",
        };
      }
      return config;
    })
    .then(config => {
      return new Promise((resolve, reject) => {
        wx.request(Object.assign(config, {
          success: function (data) {
            resolve(data)
          },
          fail: function (error) {
            reject(error);
          }
        }))
      })
    })
    .then((response) => {
      const { statusCode, data } = response;
      if (statusCode == 200 && data.errCode == 0) {
        return data.data;
      } else if (statusCode == 401) {
        // 已登录状态下，token过期则redirect到登录页
        if (wx.getStorageSync(constant.LOGGED_IN)) {
          wx.setStorageSync(constant.LOGGED_IN, false);
          wx.showToast({
            title: '账户登陆已过期，请重新登录!',
            icon: 'none'
          })
          wx.redirectTo({
            url: '/pages/login/main'
          });
          return Promise.reject({});
        }
      } else {
        return Promise.reject(data)
      }
    })
}

const api = function (root) {
  return function (method, api, route, data) {
    return dispatchRequest({
      method,
      url: app.globalData.requestRoot + root + "/" + api + (route ? ("/" + route) : ""),
      data
    });
  }
};

module.exports = api;