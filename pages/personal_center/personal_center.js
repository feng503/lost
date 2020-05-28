const app = getApp();
Page({

  data: {
    faceImage:[],
    student_name:'',
    student_id:'',
    year:'',
    num:''
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
  }
  // 获得用户数据
})