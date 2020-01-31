// pages/shiwuzhanshi/detail/detail.js

let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
   shuju: []
  },

  // function(options) {
  //   var that = this;
  //   wx.request({
  //     url: 'https://www.vergessen.top/lostobj/findlostsall',
  //     data: {
  //       service: 0
  //     },
  //     success: function (res) {
  //       console.log(res.data);
  //       var newsdata = [];
      
  //     },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:
      function(opetios) {
        console.log(opetios)
        var suc = [];
        this.setData({
          shuju: app.globalData.newlist[opetios.id]
        });
        console.log(this.data.shuju)
      },
})