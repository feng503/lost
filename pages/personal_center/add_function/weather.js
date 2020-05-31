Page({
  data: {
    region: ['天津市', '天津市', '红桥区'],
    now: ''
  },
  changeRegion: function (e) {
    this.setData({
      region: e.detail.value
    })
    this.getWeater(); //更新天气
  },
  getWeater: function () {
    var that = this; //this不可以直接在wxAPI函数内部使用
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/now?',
      data: {
        location: that.data.region[1],
        key: '913aa68b6d794573a53e5542e63d6de5'
      },
      success: function (res) {
        // console.log(res.data)
        that.setData({ now: res.data.HeWeather6[0].now })
      }
    })
  },
  onLoad: function (options) {
    this.getWeater();
  },
  onShareAppMessage: function (res) {
    return {
      title: '河工大失物招领平台',
      path: '/pages/gerenzhongxin/jinritianqi',
      success: function (res) {
        //转发成功
      },
      fail: function (res) {
        //转发失败
      }
    }
  }
})