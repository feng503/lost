let app = getApp();
Page({
  data: {
    shuju: [],
    tx: []
  },
  onLoad:
    function (opetios) {
      var that = this;
      var suc = [];
      this.setData({
        shuju: app.globalData.newlist[opetios.id]
      });
      wx.request({
        url: app.serverUrl+'getuser?studentId=' + this.data.shuju.lostUserStudentId,
        success: (res) => {
          that.setData({
            tx: res.data
          })
        }
      })
    },
  bigimage: function () {
    wx.previewImage({
      current: this.data.shuju.imagePathSmall, // 当前显示图片的http链接
      urls: this.data.shuju.imagePath// 需要预览的图片http链接列表
    })
  },
  imgYu: function (event) {
    var imgList = event.imagePath;//获取data-list
  },
  onShareAppMessage: function (res) {
    return {
      title: '河工大失物招领平台',
      path: '/pages/shiwuzhanshi/detail',
      success: function (res) {
        //转发成功
      },
      fail: function (res) {
        //转发失败
      }
    }
  }
})