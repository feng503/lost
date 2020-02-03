// pages/gerenzhongxin/gerenzhongxin.js
let app = getApp();
Page({
  data: {
    faceImage:[],
    nickname:[]
  },
  onLoad: function (options) {
    this.setData({
      nickname:app.globalData.user.nickname,
      faceImage: app.globalData.user.faceImage
    })
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
  go: function () {
    wx.navigateTo({
      url: '/pages/gerenzhongxin/shangchuanshiwu/shangchuanshiwu',
    })
  },
  to: function () {
    wx.navigateTo({
      url: '/pages/gerenzhongxin/kaixinyike/kaixinyike',
    })
  },
  liujiayu: function () {
    wx.navigateTo({
      url: '/pages/gerenzhongxin/chazhao/chazhao',
    })
  },
  and: function () {
    wx.navigateTo({
      url: '/pages/gerenzhongxin/jinritianqi/jinritianqi',
    })
  },
  lu: function () {
    wx.navigateTo({
      url: '/pages/gerenzhongxin/shezhi/shezhi',
    })
  },
  yu: function () {
    wx.navigateTo({
      url: '/pages/gerenzhongxin/kefu/kefu',
    })
  },
})
