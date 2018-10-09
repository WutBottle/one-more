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
  addImg: (data) => {
    return resourceController('post', 'resource', 'addImg', data);
  },
  //3.添加一条资源
  addResource: (data) => {
    return resourceController('post', 'resource', 'addResource', data);
  },
  //4.查找更多资源（可分页）
  findAllByTime: (data) => {
    return resourceController('post', 'resource', 'findAllByTime', data);
  },
  //5.查找资源详情页面
  findInfo: (data) => {
    return resourceController('post', 'resource', 'findInfo', data);
  },
  //6.查找资源详情页面（最新的评论）
  findInfoNew: (data) => {
    return resourceController('post', 'resource', 'findInfoNew', data);
  },
  //7.查找资源详情页面（自己的评论）
  findInfoSend: (data) => {
    return resourceController('post', 'resource', 'findInfoSend', data);
  },
  //8.系统发表资源首页初始化
  findOurResource: (data) => {
    return resourceController('post', 'resource', 'findOurResource', data);
  },
  //9.用户一条资源首页初始化
  findUserOneResource: (data) => {
    return resourceController('post', 'resource', 'findUserOneResource', data);
  },
  //10.用户三条资源首页初始化
  findUserThreeResource: (data) => {
    return resourceController('post', 'resource', 'findUserThreeResource', data);
  },
  //11.查找某人发表的资源(可分页)
  selectByPublish: (data) => {
    return resourceController('post', 'resource', 'selectByPublish', data);
  },
}