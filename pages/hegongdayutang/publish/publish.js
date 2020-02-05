let app = getApp();
Page({

  data: {
    faceImage:[],
    nickname:''
  },
  onShow: function (options) {
    this.setData({
      nickname: app.globalData.user.nickname,
      faceImage: app.globalData.user.faceImage
    })
  },
})