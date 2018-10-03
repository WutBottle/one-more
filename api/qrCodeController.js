//qr-Code-controller接口管理
'use strict';
import api from './requestServer.js';
let qrCodeController = api("onemore");

module.exports = {
  //1.生成二维码接口
  getQrcode: (data) => {
    return qrCodeController('post', '', 'getQrcode', data);
  },
}