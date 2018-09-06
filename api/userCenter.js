'use strict';

let api = require('./requestService');
let userCenter = api("usercenter/v1.0");

module.exports = {
  //1.获取医院列表
  getHospitalList: (data) => {
    return userCenter('get', 'hospital', 'getHospitalIdAndName', data);
  },
  //2.根据id获取科室列表
  getDepartmentList: (data) => {
    return userCenter('get', 'hospital', 'getHospitalDdpartmentList', data);
  },
  //3.提交医院名称进行数据采集
  addHospital: (data) => {
    return userCenter('post', 'hospital', 'addHospitalIntention', data);
  }
};
