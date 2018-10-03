//history-controller接口管理
'use strict';
import api from './requestServer.js';
let historyController = api("onemore");

module.exports = {
  //1.查询历史记录上所有图书
  historyFindAll: (data) => {
    return historyController('post', 'history', 'findAll', data);
  },
}