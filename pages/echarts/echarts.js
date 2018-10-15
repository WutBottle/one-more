const app = getApp();

import * as echarts from '../../ec-canvas/echarts.min';
import {
  insertUpMatch,
  selectUpMatch
} from '../../api/upMatchController.js';
import {
  followerAddOne
} from '../../api/followerController.js';

Page({
  onShareAppMessage: function (res) {
    return {
      title: '这是我的性格测试分析图啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    isShowModal: true,
    resultObj: {},
    barLoadStatus:false,
    resultLoadStatus: false,
    showSimilar: false,//推送相似用户弹窗
    similarUserInfo:{},//相似用户信息
  },
  answerArray: [0,0,0,0],//答案的临时存储
  problemId: null,//题目ID

  onLoad(options){
    console.log(options)
    this.answerArray[0] = parseInt(options.I);
    this.answerArray[1] = parseInt(options.D);
    this.answerArray[2] = parseInt(options.S);
    this.answerArray[3] = parseInt(options.C);
    this.problemId = parseInt(options.problemId);
    this.setData({
      ec: {
        onInit: this.initChart,
      },
    })
    setTimeout(() => {
      this.setData({
        barLoadStatus: true,
      })
    },1000)
  },

  onReady() {
  },

  initChart(canvas, width, height) {
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    canvas.setChart(chart);

    var dataAxis = ['I', 'D', 'S', 'C'];
    var data = this.answerArray;
    var yMax = 40;
    var dataShadow = [];

    for (var i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
    }

    var option = {
      title: {
        text: '您的性格测试图新鲜出炉啦！',
        subtext: 'This is your character test chart.'
      },
      xAxis: {
        data: dataAxis,
        axisLabel: {
          inside: true,
          textStyle: {
            color: '#fff'
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        z: 10
      },
      yAxis: {
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#999'
          }
        }
      },
      dataZoom: [
        {
          type: 'inside'
        }
      ],
      series: [
        { // For shadow
          type: 'bar',
          barGap: '-100%',
          barCategoryGap: '40%',
          animation: true
        },
        {
          type: 'bar',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: '#83bff6' },
                  { offset: 0.5, color: '#188df0' },
                  { offset: 1, color: '#188df0' }
                ]
              )
            },
            emphasis: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ]
              )
            }
          },
          data: data
        }
      ]
    };

    chart.setOption(option);
    return chart;
  },

  readResult(){
    this.getTestAnswer();
    this.setData({
      isShowModal: false
    })
  },

  //提交测试结果
  getTestAnswer(){
    const param = {
      I: this.answerArray[0],
      D: this.answerArray[1],
      S: this.answerArray[2],
      C: this.answerArray[3],
      problemId: this.problemId,
      uid: app.globalData.uid
    }
    insertUpMatch(param).then((data) => {
      this.setData({
        resultObj: data.presonality,
        resultLoadStatus: true,
      })
    })
  },

  //返回题目列表
  backToTestList(){
    wx.navigateBack({
      delta: 2,
    })
  },

  //推送相似用户
  findSimilar(){
    const param = {
      pageNum: 1,
      pageSize: 1,
      uid: app.globalData.uid
    }
    selectUpMatch(param).then((data) => {
      this.setData({
        showSimilar: true,
        similarUserInfo: data.chapters[0],
      })
    })

  },

  //关闭好友推送
  closeDialogModal(e) {
    if (e.target.dataset.modalblank) {
      this.setData({
        showSimilar: false,
      })
    }
  },

  //添加好友
  addFriend(e){
    const param = {
      publishUid: app.globalData.uid,
      followerUid: e.target.dataset.id,
      status: 0,
    }
    followerAddOne(param).then((data) => {
      wx.showToast({
        title: '已发送申请',
        icon: 'success',
        duration: 1500,
        mask: true,
        success: this.setData({
          showSimilar: false
        })
      })
    })
  }
});
