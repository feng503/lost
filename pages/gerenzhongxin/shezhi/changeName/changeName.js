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
    newNickName:''
  },
  methods: {
    formInputChange(e) {
      this.setData({
        newNickName:e.detail.value
      })
    },
    submitForm() {
      let data = this.data
      if (data.newNickName === '')
        return
      let userInfo = wx.getStorageSync('userInfo')
      wx.request({
        url: 'https://www.vergessen.top/lostobj/reSetNickname',
        data: {
          studentId: userInfo.studentId,
          newNickname: data.newNickName
        },
        success: (e) => {
          // console.log(e);
          if (e.statusCode === 201 || e.statusCode === 200) {
            // console.log('我被执行了');
            wx.showToast({
              title: '昵称修改成功',
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
});