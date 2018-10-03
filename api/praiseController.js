//praise-controller接口管理
'use strict';
import api from './requestServer.js';
let praiseController = api("onemore");

module.exports = {
  //1.添加一条点赞记录
  praiseAddOne: (data) => {
    return praiseController('post', 'praise', 'addOne', data);
  },
  //2.删除一条点赞记录
  praiseDeleteOne: (data) => {
    return praiseController('post', 'praise', 'deleteOne', data);
  },
}