let app = getApp();
var interval = null //倒计时函数
Page({
  data:{
    passwd1: '',
    passwd2: '',
    phoneNum: '',
    testCode: '',//验证码
    studentId:'',
    currentTime: 60,
    time: '获取验证码'
  },
  student_new:function(e){
    this.setData({
      passwd1: e.detail.value.password_one,
      passwd2: e.detail.value.password_two,
      phoneNum: e.detail.value.phone_number,
      testCode: e.detail.value.code,//验证码
      studentId: e.detail.value. student_id,
    })
    let data = this.data
    if (data.studentId === '' || data.passwd1 === '' || data.passwd2 === '' || data.phoneNum === '' || data.testCode === '')
      return
    if (data.passwd1 === data.passwd2) {
      wx.request({
        url: app.serverUrl + 'user/reSetPassword',
        data: {
          studentId: data.studentId,
          email: data.phoneNum,
          newPasswordFirst: data.passwd1,
          newPasswordSecond: data.passwd2,
          testCode: data.testCode
        },
        success: (e) => {
          if (e.statusCode == 201 || e.statusCode == 200) {
            wx.showToast({
              title: '密码修改成功',
              duration: 1000,
              icon: 'success',
              mask: true,
            })
          }
          if (e.statusCode == 500) {
            wx.showToast({
              title: e.data.message,
              duration: 1000,
              icon: 'none',
              mask: true,
            })
          }
        }
      })
    }
  },
  // 将本地缓存给data数据,并向云端请求更改数据
  getCode: function (e) {
    this.dead_time();
    var that = this;
    if (that.data.phoneNum != "") {
      wx.request({
        url: app.serverUrl + 'user/code?email=' + that.data.phoneNum,
      })
    }
  },
  dead_time: function (options) {
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒',
        btn: true
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          btn: false,
          currentTime: 60,
          disabled: false
        })
      }
    }, 1000)
  },
  // 获取验证码
  formInputChange3(e) {
    this.setData({
      phoneNum: e.detail.value
    })
  },
  // 获取手机号
})