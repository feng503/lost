let app = getApp();
var interval = null //倒计时函数

Component({
  data: {
    rules: [{
      name: 'radio',
      rules: { required: true, message: '单选列表是必选项' },
    }, {
      name: 'checkbox',
      rules: { required: true, message: '多选列表是必选项' },
    }, {
      name: 'qq',
      rules: { required: true, message: 'qq必填' },
    }, {
      name: 'mobile',
      rules: [{ required: true, message: 'mobile必填' }, { mobile: true, message: 'mobile格式不对' }],
    }, {
      name: 'vcode',
      rules: { required: true, message: '验证码必填' },
    }, {
      name: 'idcard',
      rules: { required: true, message: 'idcard必填' },
    }],
    passwd1: '',
    passwd2: '',
    phoneNum: '',
    testCode: '',
    studentId:'',
    currentTime: 60,
    time: '获取验证码',
  },
  methods: {
    formInputChange(e) {
      this.setData({
        studentId: e.detail.value
      })
    },
    formInputChange1(e) {
      this.setData({
        passwd1: e.detail.value
      })
    },
    formInputChange2(e) {
      this.setData({
        passwd2: e.detail.value
      })
    },
    formInputChange3(e) {
      this.setData({
        phoneNum: e.detail.value
      })
    },
    formInputChange4(e) {
      this.setData({
        testCode: e.detail.value
      })
    },
    getCode: function () {
      var data = this.data

      if (data.currentTime === 60 && data.phoneNum != "") {
        this.daojishi();

        if (data.phoneNum != "") {
          wx.request({
            url: 'https://www.vergessen.top/lostobj/code?phoneNum=' + data.phoneNum,
          })
        }
      }
    },
    daojishi: function (options) {
      if (this.data.currentTime === 60) {
        var that = this;
        var currentTime = that.data.currentTime
        interval = setInterval(function () {
          currentTime--;
          that.setData({
            time: currentTime + '秒',
            currentTime: currentTime
          })
          if (currentTime <= 0) {
            clearInterval(interval)
            that.setData({
              time: '重新发送',
              currentTime: 60,
              disabled: false
            })
          }
        }, 1000)
      }
    },
    submitForm() {
      
      //   url: 'pages/denglu/denglu',
      let data = this.data
      if (data.studentId ==='' ||data.passwd1 === '' || data.passwd2 === '' || data.phoneNum === '' || data.testCode === '')
        return
      if (data.passwd1 === data.passwd2) {
        wx.request({
          url: 'https://www.vergessen.top/lostobj/reSetPassword',
          data: {
            studentId: data.studentId,
            phoneNumber: data.phoneNum,
            newPasswordFirst: data.passwd1,
            newPasswordSecond: data.passwd2,
            testCode: data.testCode
          },
          success: (e) => {
            console.log(e);
            if (e.statusCode == 201 || e.statusCode == 200) {
              console.log('我被执行了');
              wx.showToast({
                title: '密码修改成功',
                duration: 1000,
                icon: 'success',
              })
              wx.navigateBack({

              })
            }
            if (e.statusCode == 500) {
              wx.showToast({
                title: e.data.message,
                duration: 1000,
                icon: 'none',
              })
            }
          }
        })
      }
    }

  }
});