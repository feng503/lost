// pages/shiwuzhanshi/detail/detail.js

let app = getApp();

Page({


  data: {
   shuju: []
  },
  onLoad:
      function(opetios) {
        console.log(opetios)
        var suc = [];
        this.setData({
          shuju: app.globalData.newlist[opetios.id]
        });
        console.log(this.data.shuju)
      },
  bigimage:function(){
    wx.previewImage({
      current: '{{shuju.imagePath }}', // 当前显示图片的http链接
      urls: [  ] // 需要预览的图片http链接列表
    })
  }
})