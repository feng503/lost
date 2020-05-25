let app = getApp();
var interval = null //倒计时函数
Page({

  data: {
    TopIndex: 0,
    put:'',  //切换登录和注册
    phoneNum: "", //手机号保存
    time: '获取验证码', //倒计时 
    currentTime: 60,  //验证码时间
    btn: false,
    userInfo: []   //用户ID
  },
  changstyle: function (e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      TopIndex: index
    })
  },
  // 登录与注册转换函数
  mima: function (e) {
    this.setData({
      put: e.detail.value
    })
  },
  // 密码的获取函数
  lostPasswd: function () {
    wx.navigateTo({
      url: '/pages/sign_in/lost_password',
    })
  },
  // 忘记密码转页面
  onLoad: function () {
    const userInfo = wx.getStorageSync('userInfo')
    console.log(userInfo)
    if (userInfo != '') {
      app.globalData.user = userInfo;
      wx.switchTab({
        url: '/pages/lost_to_show/lost_to_show',
      })
    } else {
      this.login()
    }
  },
  // 刷新加验证缓存
  login: (e) => {
    let that = this;
    wx.request({
      url: app.serverUrl+'login',
      data: {
        studentId: e.detail.value.studentId,
        password: e.detail.value.password
      },
      success: (e) => {
        app.globalData.user = e.data;
        if (e.statusCode === 200) {
          wx.setStorageSync('userInfo', e.data)
          wx.switchTab({
            url: '/pages/lost_to_show/lost_to_show',
          })
        }
        if (e.statusCode === 500) {
          wx.showToast({
            title: e.data.message,
            duration: 3000,
            icon: 'none',
          })
        }
      }
    })
  },
  // 登录函数
  GoRegister: function (e) {
    var userInfo = e.detail.value;
    wx.request({
      url: app.serverUrl+'register',
      data: {
        studentId: userInfo.username,
        phoneNum: userInfo.phone,
        passwordFirst: userInfo.pwd1,
        passwordSecond: userInfo.pwd2,
        testCode: userInfo.code
      },
      success: (e) => {
        console.log(e);
        if (e.statusCode === 201) {
          wx.showToast({
            title: '注册成功',
            duration: 3000,
            icon: 'success',
          })
          wx.setStorage({
            key: "userInfo",
            data: e.data
          })
        }
        if (e.statusCode === 500) {
          wx.showToast({
            title: e.data.message,
            duration: 3000,
            icon: 'none',
          })
        }
      }
    })
  },
  // 注册函数
  setPhone: function (e) {
    this.setData({
      phoneNum: e.detail.value
    })
  },
  //保存手机号
  getCode: function (e) {
    this.dead_time();
    var that = this;
    if (that.data.phoneNum != "") {
      wx.request({
        url: app.serverUrl+'code?phoneNum=' + that.data.phoneNum,
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
})
