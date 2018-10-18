const app = getApp();

import {
  selectMessageInfo,
  messageAddOne
} from '../../api/messageController.js';

Component({
  options:{
    multipleSlots: true
  },
  /**
  * 组件的属性列表
  */
  properties: {

  },
  /**
   * 组件的初始数据
   */
  data: {
    userDialogInfo: [],//对话数据列表
    sendMsgValue: '',//发送私信的内容
    showDialogModal: false,
    currentUserName: '',//好友昵称
    isFollow: true,//是否是好友
    uid: '',
    toIndex: '',//定位到指定位置
  },
  friendUid: '',//好友的uid
  ready: function () {
    this.setData({
      uid: app.globalData.uid
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //隐藏弹框
    closeDialogModal(e) {
      if (e.target.dataset.modalblank) {
        //关闭弹窗后要重置页面数据状态
        this.setData({
          showDialogModal: false,
          sendMsgValue: '',
          userDialogInfo: [],
          currentUserName: '',
          toIndex: '',
        })
      }
    },
    //展示弹框
    openDialogModal(id, fakeName, isFollow) {
      this.friendUid = id;
      this.updateDialogList();
      this.setData({
        showDialogModal: true,
        currentUserName: fakeName,
        isFollow: isFollow,
      })
    },
    //更新列表数据
    updateDialogList() {
      const param = {
        publishUid: this.friendUid,
        receiveUid: app.globalData.uid,
      }
      selectMessageInfo(param).then((data) => {
        this.setData({
          userDialogInfo: data.comment.reverse(),
          toIndex: 'lastOne',//动态绑定锚点跳转到指定位置
        })
      })
    },
    //对话input输入变化
    sendMsgValueChange(e) {
      this.setData({
        sendMsgValue: e.detail.value
      })
    },
    //发送对话
    submitSendMsgValue() {
      let msgValue = this.data.sendMsgValue;
      if (!!msgValue) {
        //发送私信接口
        let param = {
          publishUid: app.globalData.uid,
          receiveUid: this.friendUid,
          text: msgValue,
        }
        messageAddOne(param).then((data) => {
          this.updateDialogList();
          this.setData({
            sendMsgValue: '',
          })
        })
      }
    },
    /*
    * 内部私有方法建议以下划线开头
    * triggerEvent 用于触发事件
    */
    _error() {
      //触发取消回调
      this.triggerEvent("error")
    },
    _success() {
      //触发成功回调
      this.triggerEvent("success");
    }
  },
  
})