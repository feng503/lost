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
            url: app.serverUrl +'lost/deleteLost?studentId=' + studentId + '&lostId=' + id,
            header: { 'lost': app.globalData.user.token },
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
  // 失物详情页
  detailLost: function(e){
    let that = this;
    let index = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/lost_to_show/detail?lostDeteil=' + JSON.stringify(that.data.mySubmit[index])
    })
  },
  // 失物详情页 pages/fishpond/fishdetail
  detailFish: function(e){
    let that = this;
    let index = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/fishpond/fishdetail?fishDeteil=' + JSON.stringify(that.data.queryAllFishes[index])
    })
  },
  deleteFish: function (e) {
    // console.log(e)
    let id = e.currentTarget.dataset.id;
    let studentId = app.globalData.user.studentId;
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确认删除？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.serverUrl+'fish/deleteFish?studentId=' + studentId + '&fishId=' + id,
            header: { 'lost': app.globalData.user.token },
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
  onShow: function () {
    var that = this;
    if (this.data.TopIndex == 0) {
      wx.request({
        url: app.serverUrl+'lost/mySubmit?studentId=' + app.globalData.user.studentId,
        header: { 'lost': app.globalData.user.token },
        success: (res) => {
          that.setData({
            mySubmit: res.data
          })
        }
      })
    }
    else {
      wx.request({
        url: app.serverUrl+'fish/queryMyFishes?studentId=' + app.globalData.user.studentId,
        header: { 'lost': app.globalData.user.token },
        data: {
        },
        success: (res) => {
          that.setData({
            queryAllFishes: res.data
          })
        }, fail: function () {
        }
      })
    }
  },
})