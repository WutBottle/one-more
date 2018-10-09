// pages/recommendResource/publishResource/publishResource.js
import {
  addAudio,
  addImg,
  addResource
} from '../../../api/resourceController.js'
var app = getApp();
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chapterId: null,
    isRecording: false, //正在录音
    resourceTitle: null, //资源标题
    recorderTempFilePath: '', // 录音地址
    playDuration: null, // 播放时间
    onPlay: false, // 播放状态样式判断
    timeLimit: 2, //时间限制
    resourceType: null, //发表资源类型(图文:0||3,音频:1||4)   
    isPicExit:false,//是否上传图片
    picUrl:null,//图片路径 
    textContent:'',//文本内容
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    this.setData({
      chapterId: options.chapterId,
      resourceType: options.resourceType
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 保存资源标题
   */
  saveTitle: function(e) {
    this.setData({
      resourceTitle: e.detail.value
    })
  },

  /**
   * 按住录音
   */
  recorderStart: function() {
    this.setData({
      isRecording: true
    })
    const options = {
      duration: 1000000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'mp3',
      frameSize: 50
    }
    // 开始录音
    recorderManager.start(options);
    recorderManager.onStart(() => {
      // console.log('recorder start')
      wx.showLoading({
        title: '录音中...',
      })
    })
    //错误回调
    recorderManager.onError((res) => {
      this.setData({
        isRecording: false
      })
      console.log(res);
      wx.hideLoading();
      wx.showToast({
        title: res,
        icon: 'success',
        duration: 1000
      })
    })
  },

  /**
   * 录音结束
   */
  recorderEnd: function() {
    this.setData({
      isRecording: false
    })
    let that = this;
    // 结束录音
    recorderManager.stop();
    recorderManager.onStop((res) => {
      wx.hideLoading();
      wx.showToast({
        title: '录音结束',
        icon: 'success',
        duration: 1000
      })
      // console.log('recorder stop', res)
      const {
        tempFilePath,
        duration
      } = res
      let recorderTempFilePath = tempFilePath;
      let playDuration = Math.ceil(duration / 1000);
      that.setData({
        recorderTempFilePath: recorderTempFilePath,
        playDuration: playDuration,
      })
    })
  },

  /**
   * 播放录音
   */
  play: function() {
    if (this.data.recorderTempFilePath && this.data.playDuration > this.data.timeLimit) {
      let that = this;
      console.log(that.data.recorderTempFilePath);
      let recorderTempFilePath = that.data.recorderTempFilePath;
      innerAudioContext.autoplay = true
      innerAudioContext.src = recorderTempFilePath
      innerAudioContext.onPlay(() => {
        // console.log('开始播放')
        wx.showLoading({
          title: '播放中...',
        })
        that.setData({
          onPlay: true
        })
      })
      innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '无可播放录音',
          showCancel: false
        })
      })
      // 播放结束
      innerAudioContext.onEnded((res) => {
        wx.hideLoading();
        that.setData({
          onPlay: false
        })
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '无可播放录音',
        showCancel: false
      })
    }
  },

  /**
   * 重新录音
   */
  reRecord: function() {
    this.setData({
      recorderTempFilePath: '', // 录音地址
      playDuration: null, // 播放时间

    })
    wx.showToast({
      title: '请重新录音',
      icon: 'success',
      duration: 1000
    })
  },

  /**
   * 提交录音
   */
  submitRecord: function() {
    if (this.data.recorderTempFilePath && this.data.playDuration > this.data.timeLimit && this.data.resourceTitle) {
      let that = this;
      wx.uploadFile({
        url: 'https://wanzhuanshudu.top/onemore/resource/addAudio',
        filePath: this.data.recorderTempFilePath,
        name: 'audio',
        success(res) {
          let chapterId = that.data.chapterId;
          let resourceTitle = that.data.resourceTitle;
          let audioUrl = JSON.parse(res.data).audioUrl;
          let timeLength = JSON.parse(res.data).timeLength
          const param = {
            audioUrl: audioUrl,
            chapterId: chapterId,
            publishUid:app.globalData.uid,
            status: 0, //可以评论
            title: resourceTitle,
            type: 1,
            timeLength: timeLength
          }
          addResource(param).then((data) => {
            wx.showToast({
              title: '发布成功',
              icon: 'success',
              duration: 2000
            })
            setTimeout(function() {
              wx.navigateBack({
                chapterId: chapterId
              })
            }, 2000)

          })
        }
      })
    } else if (!this.data.resourceTitle) {
      wx.showModal({
        title: '提示',
        content: '请添加音频标题',
        showCancel: false
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '无可上传录音',
        showCancel: false
      })
    }
  },

  /**
 * 用户输入文本
 */
  doInput: function (e) {
    this.setData({
      textContent: e.detail.value
    })
  },

  /**
   * 添加图片
   */
  addPic: function() {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        upload(that, tempFilePaths);
      }
    })

    function upload(page, path) {
      console.log(path[0]);
      wx.showToast({
          icon: "loading",
          title: "正在上传"
        }),
        wx.uploadFile({
          url: 'https://wanzhuanshudu.top/onemore/resource/addImg',
          filePath: path[0],
          name: 'img',
          success: function(res) {
            console.log(res);
            if (res.statusCode != 200) {
              wx.showModal({
                title: '提示',
                content: '上传失败',
                showCancel: false
              })
              return;
            }
            var data = res.data;
            page.setData({
              isPicExit: true,
              picUrl: JSON.parse(res.data).imgUrl
            })
          },
          fail: function(e) {
            console.log(e);
            wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
            })
          },
          complete: function() {
            wx.hideToast(); //隐藏Toast
          }
        })
    }
  },

  /**
   * 上传图文资源
   */
  submitText:function(){
    if (this.data.textContent||(this.data.textContent&&this.data.isPicExit)){
      // console.log(this.data.textContent);
      const param ={
        imageUrl: this.data.picUrl,
        chapterId: this.data.chapterId,
        publishUid: app.globalData.uid,
        status: 0, //可以评论
        type: 0,
        content:this.data.textContent
      }
      addResource(param).then((data) => {
        console.log(this.data);
        var chapterId=this.data.chapterId;
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          wx.navigateBack({
            chapterId: chapterId
          })
        }, 2000)

      })
    }else {
      wx.showModal({
        title: '提示',
        content: '请将资源完善',
        showCancel: false
      })
    }
  },

})