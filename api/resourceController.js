//resource-controller接口管理
'use strict';
import api from './requestServer.js';
let resourceController = api("onemore");

module.exports = {
  //1.添加一个音频
  addAudio: (data) => {
    return resourceController('post', 'resource', 'addAudio', data);
  },
}