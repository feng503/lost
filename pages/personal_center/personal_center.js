const app = getApp();
Page({

  data: {
    faceImage:[],
    student_name:'',
    student_id:''
  },
  onLoad: function (options) {
    this.setData({
      student_name: app.globalData.user.nickname,
      faceImage: app.globalData.user.faceImage,
      student_id: app.globalData.user.studentId,
    })
  }
  // 获得用户数据
})