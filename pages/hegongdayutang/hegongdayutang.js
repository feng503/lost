let app = getApp();
Page({
  data: {
    list: [],
    maxtime: '',
    loadingHidden: false,
    faceImage: [],
    nickname: '',
    newsdata: []
  },
  onShareAppMessage: function (res) {
    return {
      title: '河工大失物招领平台',
      path: '/pages/shiwuzhanshi',
      success: function (res) {
        //转发成功
      },
      fail: function (res) {
        //转发失败
      }
    }
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.vergessen.top/lostobj/queryAllFishes',
      data: {
      },
      success: function (res) {
        that.setData({
          newsdata: res.data
        });
        console.log(that.data.newsdata)
      },
    })
  },
  onShow: function (options) {
    this.setData({
      nickname: app.globalData.user.nickname,
      faceImage: app.globalData.user.faceImage
    })
  },
  liujiayu:function() {
    wx.navigateTo({
      url: '/pages/hegongdayutang/publish/publish',
    })
  },
})