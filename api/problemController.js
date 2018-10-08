//problem-controller接口管理
'use strict';
import api from './requestServer.js';
let problemController = api("onemore");

module.exports = {
  //1.趣味测试题目列表
  getFunTestList: (data) => {
    return problemController('post', 'problem', 'findAll', data);
  },
  //2.根据id查找题干
  getTestStem: (data) => {
    return problemController('post', 'problem', 'selectById', data);
  }
}