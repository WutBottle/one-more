//follower-controller接口管理
'use strict';
import api from './requestServer.js';
let followerController = api("onemore");

module.exports = {
  //1.申请添加好友
  followerAddOne: (data) => {
    return followerController('post', 'follower', 'addOne', data);
  },
  //2.同意添加好友
  agreeAdd: (data) => {
    return followerController('post', 'follower', 'agreeAdd', data);
  },
  //3.不同意添加好友
  followerDeleteOne: (data) => {
    return followerController('post', 'follower', 'deleteOne', data);
  },
  //4.查找所有的好友
  selectAllFollower: (data) => {
    return followerController('post', 'follower', 'selectAllFollower', data);
  },
  //5.申请加好友的列表
  selectNoAgree: (data) => {
    return followerController('post', 'follower', 'selectNoAgree', data);
  },
}