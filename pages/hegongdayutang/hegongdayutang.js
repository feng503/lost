let app = getApp();
Page({
  data: {
    list: [],
    maxtime: '',
    loadingHidden: false,
    faceImage: [],
    nickname: '',
    newsdata: [],
    images:[],
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
        console.log(that.data.newsdata.length)
        for (let i = 0; i < that.data.newsdata.length; i++){
        var str = that.data.newsdata[i].imagePath
        that.data.images = str.split(",")
        console.log(that.data.images)
        that.data.newsdata[i].imagePath = that.data.images
        }
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