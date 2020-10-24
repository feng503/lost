const app = getApp();
Page({

  data: {
    faceImage:[],
    student_name:'',
    student_id:'',
    year:'',
    num:'',
    id: true
  },
  onShow:function(){
    this.onLoad()
  },
  onLoad: function (options) {
    this.setData({
      student_name: app.globalData.user.nickname,
      faceImage: app.globalData.user.faceImageSmall,
      student_id: app.globalData.user.studentId,
    })
    // 获取用户信息
    if (this.data.student_id == '000000')
    {
      this.setData({
        id: false
      })
    }
    var myDate = new Date();
    this.setData({
      year: myDate.getFullYear(),
      num: myDate.getMonth()
    })
    if (myDate.getMonth() <= 6) {
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
    if (this.data.id == false){
      wx.showToast({
        title: "请登录后操作!",
        icon: "none",
        duration: 1000
      })
    }
    else{
      wx.navigateTo({
        url: '/pages/personal_center/pick_up_lost/pick_up_lost',
      })
    }
  },
  look_for_lost:function(){
    wx.navigateTo({
      url: '/pages/personal_center/look_for_lost/look_for_lost',
    })
  },
  my_publish:function(){
    if (this.data.id == false) {
      wx.showToast({
        title: "请登录后操作!",
        icon: "none",
        duration: 1000
      })
    }
    else{
      wx.navigateTo({
        url: '/pages/personal_center/my_publish/my_publish',
      })
    }
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
    if (this.data.id == false) {
      wx.showToast({
        title: "请登录后操作!",
        icon: "none",
        duration: 1000
      })
    }else
    {
      wx.navigateTo({
        url: '/pages/personal_center/set/set',
      })
    }
  },
  new_login:function(){
    wx.clearStorageSync('userInfo')
    wx.reLaunch({
      url: '/pages/sign_in/sign_in_register',
    })
  },
  showQrcode() {
    wx.previewImage({
      urls: ['http://a1.qpic.cn/psc?/V10JXMix0CQf9J/bqQfVz5yrrGYSXMvKr.cqTE1hfQ*zLtZ.mBzPp.NRUj*8JTidz56ln97haseERCW*yOkhUuUUOEEhuUqBgmNdErLhsRUCRlKVYEsEjtKtvs!/b&ek=1&kp=1&pt=0&bo=dAJ0AnQCdAIDEDU!&tl=1&vuin=644960080&tm=1600401600&sce=60-1-1&rf=0-0'],
      current: 'http://a1.qpic.cn/psc?/V10JXMix0CQf9J/bqQfVz5yrrGYSXMvKr.cqTE1hfQ*zLtZ.mBzPp.NRUj*8JTidz56ln97haseERCW*yOkhUuUUOEEhuUqBgmNdErLhsRUCRlKVYEsEjtKtvs!/b&ek=1&kp=1&pt=0&bo=dAJ0AnQCdAIDEDU!&tl=1&vuin=644960080&tm=1600401600&sce=60-1-1&rf=0-0' // 当前显示图片的http链接      
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