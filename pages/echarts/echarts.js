import * as echarts from '../../ec-canvas/echarts.min';
const app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var dataAxis = ['D', 'I', 'S', 'C'];
  var data = [10, 20, 5, 8];
  var yMax = 30;
  var dataShadow = [];

  for (var i = 0; i < data.length; i++) {
    dataShadow.push(yMax);
  }

  var option = {
    title: {
      text: '您的性格测试图新鲜出炉啦！',
      subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
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
        itemStyle: {
          normal: { color: 'rgba(0,0,0,0.05)' }
        },
        barGap: '-100%',
        barCategoryGap: '40%',
        data: dataShadow,
        animation: false
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
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {
  }
});
