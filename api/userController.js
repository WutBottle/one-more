//user-controller接口管理
'use strict';
import api from './requestServer.js';
let userController = api("onemore");

module.exports = {
  //1.用户登录接口
  userLogin: (data) => {
    return userController('post', 'user', 'login', data);
  },
  //2.查找用户简要信息
  selectUserBrief: (data) => {
    return userController('post', 'user', 'selectUserBrief', data);
  },
  //3.查找用户详细信息
  selectUserInfo: (data) => {
    return userController('post', 'user', 'selectUserInfo', data);
  },
  //4.更改用户信息
  updateStatus: (data) => {
    return userController('post', 'user', 'updateStatus', data);
  }
};
