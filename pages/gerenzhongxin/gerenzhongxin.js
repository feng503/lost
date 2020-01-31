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
    wx.redirectTo({
      url: '/pages/gerenzhongxin/shangchuanshiwu/shangchuanshiwu',
    })
  },
  to: function () {
    wx.redirectTo({
      url: '/pages/gerenzhongxin/kaixinyike/kaixinyike',
    })
  },
  liujiayu: function () {
    wx.redirectTo({
      url: '/pages/gerenzhongxin/zhifeiji/zhifeiji',
    })
  },
  and: function () {
    wx.redirectTo({
      url: '/pages/gerenzhongxin/jinritianqi/jinritianqi',
    })
  },
  lu: function () {
    wx.redirectTo({
      url: '/pages/gerenzhongxin/shezhi/shezhi',
    })
  },
  yu: function () {
    wx.redirectTo({
      url: '/pages/gerenzhongxin/kefu/kefu',
    })
  },
})
