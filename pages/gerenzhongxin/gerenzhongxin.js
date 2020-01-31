// pages/gerenzhongxin/gerenzhongxin.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
