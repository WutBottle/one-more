const app = getApp();

import {
  queryQuestionInfo
} from '../../../api/questionController.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionList: [],
    questionOrder: 0,//当前题号
    currentQuestion: {},//当前题目
  },
  answerArray: [0, 0, 0, 0],//答案统计数组
  totalNum: 0,//题目总数
  problemId: null,//题目ID

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.problemId = options.problemId;
    const param = {
      proId: options.problemId
    }
    queryQuestionInfo(param).then((data) => {
      this.setData({
        questionList: data.questions,
        currentQuestion: data.questions[this.data.questionOrder]
      })
      this.totalNum = data.questions.length;
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      questionOrder: 0,
    })
    this.answerArray = [0, 0, 0, 0];
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  //点击答案处理
  chooseAnswer(e){
    if(!!e.target.dataset.type){
      switch (e.target.dataset.type){
        case "optionI":
          this.answerArray[0]++;
        break;
        case "optionD":
          this.answerArray[1]++;
        break;
        case "optionS":
          this.answerArray[2]++;
        break;
        case "optionC":
          this.answerArray[3]++;
        break;
        default: break;
      }
      this.questionNumIncrease();
    }
  },
  //题目加加
  questionNumIncrease(){
    let tempOrder = this.data.questionOrder;
    tempOrder++;
    if(tempOrder < this.totalNum){
      this.setData({
        currentQuestion: this.data.questionList[tempOrder],
        questionOrder: tempOrder
      })
    }else{
      this.submitAnswer();
    }
  },

  //提交答案数组
  submitAnswer(){
    console.log(this.answerArray);
    wx.navigateTo({
      url: '../../echarts/echarts?I=' + this.answerArray[0] + '&D=' + this.answerArray[1] + '&S=' + this.answerArray[2] + '&C=' + this.answerArray[3] + '&problemId=' + this.problemId,
    })
    this.setData({
      questionOrder: 0,
      currentQuestion: this.data.questionList[0],
    })
    this.answerArray = [0,0,0,0];
  }
})