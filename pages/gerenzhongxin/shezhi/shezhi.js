// pages/gerenzhongxin/shezhi/shezhi.js
Page({

  data: {

  },
  changeUserImg:function(){

  },
  changeUserName:function(){
    wx.redirectTo({
      url: '/pages/gerenzhongxin/shezhi/changeName/changeName',
    })
  },
  changePasswd:function(){
    wx.redirectTo({
      url: '/pages/gerenzhongxin/shezhi/changePasswd/changePasswd',
    })
  },
  quit:function(){
    wx.clearStorage('userInfo')
    wx.redirectTo({
      url: '/pages/denglu/denglu',
    })
  }
})
