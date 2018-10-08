//question-controller接口管理
'use strict';
import api from './requestServer.js';
let questionController = api("onemore");

module.exports = {
  //1.查询问卷题目
  queryQuestionInfo: (data) => {
    return questionController('post', 'question', 'selectByProId', data);
  },
}