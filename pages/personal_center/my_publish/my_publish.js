let app = getApp();
Page({
  data: {
    mySubmit: [],
    TopIndex: 0,
    queryAllFishes: [],
  },
  changstyle: function (e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      TopIndex: index
    })
    this.onShow()
  },
  // 顶部页面切换
  deleteLost: function (e) {
    let id = e.currentTarget.dataset.id;
    let studentId = app.globalData.user.studentId;
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确认删除？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.serverUrl+'deleteLost?studentId=' + studentId + '&lostId=' + id,
            success: (res) => {
              that.onShow();
              wx.showToast({
                title: '删除成功',
                duration: 1000,
                icon: 'success',
                mask: true,
              })
            }
          })
        } else if (res.cancel) {
        }
      }
    })
  },
  // 删除失物
  deleteFish: function (e) {
    let id = e.currentTarget.dataset.id;
    let studentId = app.globalData.user.studentId;
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确认删除？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.serverUrl+'lostobj/deleteFish?studentId=' + studentId + '&fishId=' + id,
            success: (res) => {
              that.onShow();
              wx.showToast({
                title: '删除成功',
                duration: 1000,
                icon: 'success',
                mask: true,
              })
            }
          })
        } else if (res.cancel) {
        }
      }
    })
  },
// 删除鱼塘
  onShow: function () {
    var that = this;
    if (this.data.TopIndex == 0) {
      wx.request({
        url: app.serverUrl+'mySubmit?studentId=' + app.globalData.user.studentId,
        success: (res) => {
          that.setData({
            mySubmit: res.data
          })
        }
      })
    }
    else {
      wx.request({
        url: app.serverUrl+'queryMyFishes?studentId=' + app.globalData.user.studentId,
        success: (res) => {
          that.setData({
            queryAllFishes: res.data
          })
        }, fail: function () {
        }
      })
    }
  },
//页面展示 
})