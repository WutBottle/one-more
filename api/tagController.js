//tag-controller接口管理
'use strict';
import api from './requestServer.js';
let tagController = api("onemore");

module.exports = {
  //1.查询历史记录上所有图书
  tagFindAll: (data) => {
    return tagController('get', 'tag', 'findAll', data);
  },
}