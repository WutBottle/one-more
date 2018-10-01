//user-controller接口管理
'use strict';
import api from './requestServer.js';
let userCenter = api("onemore");

module.exports = {
  //1.用户登录接口
  postLogin: (data) => {
    return userCenter('post', 'user', 'login', data);
  },
};
