const app = getApp();
Page({

  data: {
    faceImage:[],
    student_name:'',
    student_id:'',
    year:'',
    num:''
  },
  onShow:function(){
    this.onLoad()
  },
  onLoad: function (options) {
    this.setData({
      student_name: app.globalData.user.nickname,
      faceImage: app.globalData.user.faceImage,
      student_id: app.globalData.user.studentId,
    })
    // 获取用户信息
    var myDate = new Date();
    this.setData({
      year: myDate.getFullYear(),
      num: myDate.getMonth()
    })
    if (myDate.getMonth() <= 7) {
      this.setData({
        season: '春'
      })
    }
    else {
      this.setData({
        season: '秋'
      })
    }
    // 对学期动态说明
  },
  pick_up_lost:function(){
    wx.navigateTo({
      url: '/pages/personal_center/pick_up_lost/pick_up_lost',
    })
  },
  look_for_lost:function(){
    wx.navigateTo({
      url: '/pages/personal_center/look_for_lost/look_for_lost',
    })
  },
  my_publish:function(){
    wx.navigateTo({
      url: '/pages/personal_center/my_publish/my_publish',
    })
  },
  scan_code:function(){
    wx.navigateTo({
      url: '/pages/personal_center/scan_code/scan_code',
    })
  },
  joke:function(){
    wx.navigateTo({
      url: '/pages/personal_center/add_function/joke',
    })
  },
  weather: function () {
    wx.navigateTo({
      url: '/pages/personal_center/add_function/weather',
    })
  },
  game: function () {
    wx.navigateTo({
      url: '/pages/personal_center/add_function/game',
    })
  },
  service: function () {
    wx.navigateTo({
      url: '/pages/personal_center/add_function/service',
    })
  },
  seet: function () {
    wx.navigateTo({
      url: '/pages/personal_center/set/set',
    })
  },
  about: function () {
    wx.navigateTo({
      url: '/pages/personal_center/add_function/about',
    })
  },
  // 跳转页的设置
  onShareAppMessage: function (res) {
    return {
      title: '河工大失物招领平台',
      path: '/pages/personal_center/personal_center',
      success: function (res) {
        //转发成功
      },
      fail: function (res) {
        //转发失败
      }
    }
  }
})