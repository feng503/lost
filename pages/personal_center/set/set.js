const app = getApp();
Page({

  data: {
    student_new_name:''
  },
  changeFaceImg: function () {
    wx.navigateTo({
      url: '/pages/personal_center/set/changeFaceImg/changeFaceImg',
    })
  },
  changeUserName: function (e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    var that = this
    this.setData({
      modalName: null
    })
    let userInfo = wx.getStorageSync('userInfo')
    if (that.data.student_new_name !==''){
      wx.request({
        url: app.serverUrl+'user/reSetNickname',
        header: { 'lost': app.globalData.user.token },
        data: {
          studentId: userInfo.studentId,
          newNickname: that.data.student_new_name
        },
        success: (e) => {
          if (e.statusCode === 201 || e.statusCode === 200) {
            wx.showToast({
              title: '昵称修改成功',
              duration: 3000,
              icon: 'success',
            })
            wx.setStorageSync('userInfo', e.data)
            app.globalData.user = e.data;
            wx.switchTab({
              url: '/pages/personal_center/personal_center'
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
  },
  getInputValue(e) {
    this.setData({
      student_new_name: e.detail.value
    })
  },
  changePasswd: function () {
    wx.navigateTo({
      url: '/pages/personal_center/set/change_password/change_password',
    })
  },
  quit: function () {
    wx.showModal({
      title: '提示',
      content: '确定退出？',
      success(res) {
        if (res.confirm) {
          wx.clearStorageSync('userInfo')
          wx.reLaunch({
            url: '/pages/sign_in/sign_in_register',
          })
        } else if (res.cancel) {
        }
      }
    })
  }
})
