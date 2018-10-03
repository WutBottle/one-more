//report-controller接口管理
'use strict';
import api from './requestServer.js';
let reportController = api("onemore");

module.exports = {
  //1.添加一条举报记录
  reportAddOne: (data) => {
    return reportController('post', 'report', 'addOne', data);
  },
  //2.删除一条举报记录
  reportDeleteOne: (data) => {
    return reportController('post', 'report', 'deleteOne', data);
  }
}