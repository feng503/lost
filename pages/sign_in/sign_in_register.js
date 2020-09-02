let app = getApp();
var interval = null //倒计时函数
Page({

  data: {
    TopIndex: 0,
    put:'',  //切换登录和注册
    email: "", //邮箱保存
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
    wx.hideHomeButton()
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo != null && userInfo != '' && userInfo != {}) {
      app.globalData.user = userInfo;
      wx.switchTab({
        url: '/pages/lost_to_show/lost_to_show',
      })
    } else {
      this.login()
    }
  },
  // 登录
  login: (e) => {
    if (e.detail.value.studentId === '' || e.detail.value.password === '')
      return;
    let that = this;
    wx.request({
      url: app.serverUrl+'user/login',
      data: {
        studentId: e.detail.value.studentId,
        password: e.detail.value.password
      },
      success: (e) => {
        if (e.statusCode === 200) {
          wx.setStorageSync('userInfo', e.data)
          app.globalData.user = e.data;
          wx.switchTab({
            url: '/pages/lost_to_show/lost_to_show',
          })
        } else {
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
  GoRegister: function (e) {
    var userInfo = e.detail.value;
    let that = this;
    wx.request({
      url: app.serverUrl+'user/register',
      data: {
        studentId: userInfo.username,
        email: userInfo.phone,
        passwordFirst: userInfo.pwd1,
        passwordSecond: userInfo.pwd2,
        authCode: userInfo.code
      },
      success: (e) => {
        if (e.statusCode === 200) {
          wx.showToast({
            title: '注册成功',
            duration: 2000,
            icon: 'success',
          })
          that.setData({
            TopIndex: 0
          })
        }else {
          wx.showToast({
            title: e.data.message,
            duration: 2000,
            icon: 'none',
          })
        }
      }
    })
  },
  setPhone: function (e) {
    this.setData({
      email: e.detail.value
    })
  },
  //发送验证码
  getCode: function (e) {
    if (this.data.email != "") {
      var that = this;
      wx.request({
        url: app.serverUrl+'user/code?email=' + that.data.email,
        success: (e) => {
          if (e.statusCode !== 200) {
            wx.showToast({
              title: e.data.message,
              duration: 3000,
              icon: 'none',
            })
          } else{
            that.dead_time();
          }
        } 
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
})
