//up-match-controller接口管理
'use strict';
import api from './requestServer.js';
let upMatchController = api("onemore");

module.exports = {
  //1.提交测试结果接口
  insertUpMatch: (data) => {
    return upMatchController('post', 'upMatch', 'insertUpMatch', data);
  },
}