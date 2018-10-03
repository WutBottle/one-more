//comment-controller接口管理
'use strict';
import api from './requestServer.js';
let commentController = api("onemore");

module.exports = {
  //1.添加一条评论信息
  commentAddOne: (data) => {
    return commentController('post', 'comment', 'addOne', data);
  },
  //2.收到未读评论条数
  countAllReceive: (data) => {
    return commentController('post', 'comment', 'countAllReceive', data);
  },
  //3.删除一条评论信息
  commentDeleteOne: (data) => {
    return commentController('post', 'comment', 'deleteOne', data);
  },
  //4.查询某个资源所有的评论
  commentfindAll: (data) => {
    return commentController('post', 'comment', 'findAll', data);
  },
  //5.查找已经接收的所有评论
  findAllReceive: (data) => {
    return commentController('post', 'comment', 'findAllReceive', data);
  },
  //6.查找已经发送的所有评论
  findAllSend: (data) => {
    return commentController('post', 'comment', 'findAllSend', data);
  },
  //7.评论全部已读
  updateStatus: (data) => {
    return commentController('post', 'comment', 'updateStatus', data);
  },
}