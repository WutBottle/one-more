//resource-controller接口管理
'use strict';
import api from './requestServer.js';
let resourceController = api("onemore");

module.exports = {
  //1.添加一个音频
  addAudio: (data) => {
    return resourceController('post', 'resource', 'addAudio', data);
  },
  //2.添加一个图片
  addAudio: (data) => {
    return resourceController('post', 'resource', 'addImg', data);
  },
  //3.添加一条资源
  addAudio: (data) => {
    return resourceController('post', 'resource', 'addResource', data);
  },
  //4.查找更多资源（可分页）
  addAudio: (data) => {
    return resourceController('post', 'resource', 'findAllByTime', data);
  },
  //5.查找资源详情页面
  addAudio: (data) => {
    return resourceController('post', 'resource', 'findInfo', data);
  },
  //6.查找资源详情页面（最新的评论）
  addAudio: (data) => {
    return resourceController('post', 'resource', 'findInfoNew', data);
  },
  //7.查找资源详情页面（自己的评论）
  addAudio: (data) => {
    return resourceController('post', 'resource', 'findInfoSend', data);
  },
  //8.资源首页初始化
  addAudio: (data) => {
    return resourceController('post', 'resource', 'findResourceIndex', data);
  },
  //9.查找某人发表评论的页面（可分页）
  addAudio: (data) => {
    return resourceController('post', 'resource', 'selectByPublish', data);
  },
}