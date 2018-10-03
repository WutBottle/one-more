//message-controller接口管理
'use strict';
import api from './requestServer.js';
let messageController = api("onemore");

module.exports = {
  //1.发表一条私信信息
  messageAddOne: (data) => {
    return messageController('post', 'message', 'addOne', data);
  },
  //2.收到的未读评论条数
  countUnRead: (data) => {
    return messageController('post', 'message', 'acountUnRead', data);
  },
  //3.私信页面初始化
  selectMessageBrief: (data) => {
    return messageController('post', 'message', 'selectMessageBrief', data);
  },
  //4.查询与一个人的消息往来
  selectMessageInfo: (data) => {
    return messageController('post', 'message', 'selectMessageInfo', data);
  },
  //5.全部私信已读
  updateAllStatus: (data) => {
    return messageController('post', 'message', 'updateAllStatus', data);
  },
}