Page({
  data: {
    joke: []
  },
  onLoad: function () {
    var that = this;
    that.joke = [];
    wx.request({
      url: 'http://v.juhe.cn/joke/content/text.php?&key=271e5753421c1ec9f69403c327ba57de',
      method: 'get',
      success: function (res) {
        console.log(res.data.result.data)
        that.setData({
          joke: res.data.result.data
        });
      },

    })
  },
  onUnload: function () {
    wx.reLaunch({
      url: '/pages/gerenzhongxin/gerenzhongxin',
    })
  },
})
