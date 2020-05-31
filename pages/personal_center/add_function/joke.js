Page({
  data: {
    joke: []
  },
  onLoad: function () {
    var that = this;
    that.joke = [];
    wx.request({
      url: 'https://v.juhe.cn/joke/randJoke.php?key=271e5753421c1ec9f69403c327ba57de',
      method: 'get',
      success: function (res) {
        that.setData({
          joke: res.data.result
        });
      },

    })
    wx.stopPullDownRefresh()
  },
  onPullDownRefresh: function () {
    this.onLoad()
  },
  onShareAppMessage: function (res) {
    return {
      title: '河工大失物招领平台',
      path: '/pages/gerenzhongxin/kaixinyike',
      success: function (res) {
        //转发成功
      },
      fail: function (res) {
        //转发失败
      }
    }
  }
})
