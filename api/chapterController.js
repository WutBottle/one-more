//chapter-controller接口管理
'use strict';
import api from './requestServer.js';
let chapterController = api("onemore");

module.exports = {
  //1.查找一本书下的所有章节
  chapterFindAll: (data) => {
    return chapterController('post', 'chapter', 'findAll', data);
  },
}