//book-shef-controller接口管理
'use strict';
import api from './requestServer.js';
let bookShelfController = api("onemore");

module.exports = {
  //1.添加一条书架记录
  addOne: (data) => {
    return bookShelfController('post', 'bookShelf', 'addOne', data);
  },
  //2.查找书架上的所有图书
  findAllBooks:(data) => {
    return bookShelfController('post','bookShelf','findAll',data);
  }
}