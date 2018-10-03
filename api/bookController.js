//book-controller接口管理
'use strict';
import api from './requestServer.js';
let bookController = api("onemore");

module.exports = {
  //1.添加一本书籍
  bookAddOne: (data) => {
    return bookController('post', 'book', 'addOne', data);
  },
  //2.查找最新书籍
  bookFindNew: (data) => {
    return bookController('get', 'book', 'findNew', data)
  },
  //3.根据标题查找最新书籍
  bookSelectByTitle: (data) => {
    return bookController('post','book','selectByTitle',data)
  }
}