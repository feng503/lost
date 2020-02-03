let app = getApp();

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
    passwd1:'',
    passwd2: '',
    phoneNum:'',
    testCode:''
  },
  methods: {
    formInputChange1(e) {
      console.log(e)
      this.setData({
        passwd1:e.detail.value
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
    getCode:function(){
      var data = this.data
      if (data.phoneNum != "") {
        wx.request({
          url: 'https://www.vergessen.top/lostobj/code?phoneNum=' + data.phoneNum,
        })
      }
    },
    submitForm() {
      let data = this.data
      if (data.passwd1 === '' || data.passwd2 === '' || data.phoneNum === '' || data.testCode === '')
        return
      const userInfo = wx.getStorageSync('userInfo')
      if(data.passwd1 === data.passwd2){
        wx.request({
          url: 'https://www.vergessen.top/lostobj/reSetPassword',
          data: {
            studentId: userInfo.studentId,
            phoneNumber: data.phoneNum,
            newPasswordFirst:data.passwd1,
            newPasswordSecond:data.passwd2,
            testCode:data.testCode
          },
          success: (e) => {
            console.log(e);
            if (e.statusCode === 201 || e.statusCode === 200) {
              // console.log('我被执行了');
              wx.showToast({
                title: '密码修改成功',
                duration: 3000,
                icon: 'success',
              })
              wx.setStorageSync('userInfo', e.data)
              app.globalData.user = e.data;
              wx.navigateBack({

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
      }
    }

  }
});