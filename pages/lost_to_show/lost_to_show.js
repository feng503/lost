let app = getApp();
Page({
  data: {
    newsdata: [],
    userInfo: null,
    detail: '',
    tp: 0,
    page: 1,
    type: -1,
    lingColor: '#f9c828',
    zhaoColor: '#ffffff'
  },
  findLostByType: function () {
    var that = this;
    that.newsdata = [];
    wx.showToast({
      title: '加载中',
      duration: 13000,
      icon: 'loading',
      mask: true,
    })
    wx.request({
      url: app.serverUrl + 'lost/findLostByType',
      data: {
        type: 0,
        service: this.data.tp
      },
      success: function (res) {
        wx.showToast({
          title: '加载成功',
          duration: 500,
          icon: 'success',
          mask: true,
        })
        that.setData({
          newsdata: res.data,
          page: 1,
          type: 0,
        });
      },
    })
  },
  getInput: function (e) {
    this.setData({
      detail: e.detail.value
    })
  },
  queryLosts: function () {
    var that = this;
    wx.request({
      url: app.serverUrl +'lost/findLostByDetail',
      header: { 'lost': app.globalData.user.token },
      data: {
        detail: that.data.detail,
        service: that.data.tp
      },
      success: function (res) {
        wx.showToast({
          title: '加载成功',
          duration: 500,
          icon: 'success',
          mask: true,
        })
        that.setData({
          newsdata: res.data,
          page: 1,
          type: -2
        });
      },
    })
  },
  yiwubaobao: function () {
    var that = this;
    that.newsdata = [];
    wx.showToast({
      title: '加载中',
      duration: 13000,
      icon: 'loading',
      mask: true,
    })
    wx.request({
      url: app.serverUrl +'lost/findLostByType',
      data: {
        type: 1,
        service: that.data.tp
      },
      success: function (res) {
        wx.showToast({
          title: '加载成功',
          duration: 500,
          icon: 'success',
          mask: true,
        })
        that.setData({
          newsdata: res.data,
          page: 1,
          type: 1,
        });
      },

    })
  },
  shuji: function () {
    var that = this;
    that.newsdata = [];
    // app.globalData.newlist = [];
    wx.showToast({
      title: '加载中',
      duration: 13000,
      icon: 'loading',
      mask: true,
    })
    wx.request({
      url: app.serverUrl +'lost/findLostByType',
      data: {
        type: 2,
        service: that.data.tp
      },
      success: function (res) {
        wx.showToast({
          title: '加载成功',
          duration: 500,
          icon: 'success',
          mask: true,
        })
        that.setData({
          newsdata: res.data,
          page: 1,
          type: 2,
        });
      },
    })
  },
  yaoshi: function () {
    var that = this;
    that.newsdata = [];
    wx.showToast({
      title: '加载中',
      duration: 13000,
      icon: 'loading',
      mask: true,
    })
    wx.request({
      url: app.serverUrl +'lost/findLostByType',
      data: {
        type: 3,
        service: that.data.tp
      },
      success: function (res) {
        wx.showToast({
          title: '加载成功',
          duration: 500,
          icon: 'success',
          mask: true,
        })
        that.setData({
          newsdata: res.data,
          page: 1,
          type: 3,
        });
        // app.globalData.newlist = that.data.newsdata;
      },
    })
  },
  qita: function () {
    var that = this;
    that.newsdata = [];
    // app.globalData.newlist = [];
    wx.showToast({
      title: '加载中',
      duration: 13000,
      icon: 'loading',
      mask: true,
    })
    wx.request({
      url: app.serverUrl +'lost/findLostByType',
      data: {
        type: 4,
        service: that.data.tp
      },
      success: function (res) {
        wx.showToast({
          title: '加载成功',
          duration: 500,
          icon: 'success',
          mask: true,
        })
        that.setData({
          newsdata: res.data,
          page: 1,
          type: 4,
        });
        // app.globalData.newlist = that.data.newsdata;
      },
    })
  },
  onLoad: function (options) {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo == null || userInfo == '' || userInfo == {}) {
      wx.redirectTo({
        url: '/pages/sign_in/sign_in_register',
      })
      return;
    }
    app.globalData.user = userInfo;
    // 为该用户添加访客记录
    wx.request({
      url: app.serverUrl + 'user/visit?studentId=' + userInfo.studentId,
      method: "POST"
    })
    wx.stopPullDownRefresh()
    var that = this;
    wx.request({
      url: app.serverUrl +'lost/findLostAll',
      data: {
        service: that.data.tp
      },
      success: function (res) {
        that.setData({
          newsdata: res.data,
          page: 1,
          type: -1,
          detail: ''
        });
      },
    })
  },
  onPullDownRefresh: function () {
    this.onLoad();
  },
  // 下拉刷新
  onReachBottom: function () {
    var that = this;
    wx.showLoading({
      title: '拼命加载中',
    })
    let page = this.data.page + 1;
    if (this.data.type >= 0) {
      wx.request({
        url: app.serverUrl +'lost/findLostByType', //此处要加page页 
        data: {
          type: that.data.type,
          service: that.data.tp,
          page: page
        },
        success: function (res) {
          if (res.data.length === 0) {
            wx.showToast({
              title: '-- 我是有底线的 --',
              duration: 1000,
              icon: 'none',
              mask: true,
            })
            return;
          }
          let newsdata = that.data.newsdata.concat(res.data);
          that.setData({
            newsdata: newsdata,
            page: page
          });
        },
        fail: function (res) {
          that.setData({
            bottomTitle: true,
            title: '-- 我没能刷新 --'
          })
        }
      })
    } else if (this.data.type === -2) {
      wx.request({
        url: app.serverUrl +'lost/findLostByDetail',
        header: { 'lost': app.globalData.user.token },
        data: {
          detail: that.data.detail,
          service: that.data.tp,
          page: page
        },
        success: function (res) {
          if (res.data.length === 0) {
            wx.showToast({
              title: '-- 我是有底线的 --',
              duration: 1000,
              icon: 'none',
              mask: true,
            })
            return;
          }
          let newsdata = that.data.newsdata.concat(res.data);
          that.setData({
            newsdata: newsdata,
            page: page
          });
        },
        fail: function (res) {
          that.setData({
            bottomTitle: true,
            title: '-- 我没能刷新 --'
          })
        }
      })
    } else {
      wx.request({
        url: app.serverUrl +'lost/findLostAll', //此处要加page页 
        data: {
          service: that.data.tp,
          page: page
        },
        success: function (res) {
          if (res.data.length === 0) {
            wx.showToast({
              title: '-- 我是有底线的 --',
              duration: 1000,
              icon: 'none',
              mask: true,
            })
            return;
          }
          let newsdata = that.data.newsdata.concat(res.data);
          that.setData({
            newsdata: newsdata,
            page: page
          });
        },
        fail: function (res) {
          that.setData({
            bottomTitle: true,
            title: '-- 我没能刷新 --'
          })
        }
      })
    }
    wx.hideLoading();
  },
  fresh: function () {
    if (this.data.tp == 0) {
      this.setData({
        tp: 1,
        page: 0,
        type: -1,
        lingColor: '#ffffff',
        zhaoColor: '#f9c828'
      })
    }
    else {
      this.setData({
        tp: 0,
        page: 0,
        type: -1,
        lingColor: '#f9c828',
        zhaoColor: '#ffffff'
      })
    }
    wx.showToast({
      title: '切换中',
      duration: 3500,
      icon: 'loading',
      mask: true,
    })
    this.onLoad()
    wx.showToast({
      title: '切换成功',
      duration: 500,
      icon: 'success',
      mask: true,
    })
  },
  // 领-找切换
  onShareAppMessage: function (res) {
    return {
      title: '河工大失物招领平台',
      path: '/pages/lost_to_show/lost_to_show',
      success: function (res) {
        //转发成功
      },
      fail: function (res) {
        //转发失败
      }
    }
  },
  // 转发
  Biu: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/lost_to_show/detail?lostDeteil=' + JSON.stringify(that.data.newsdata[index])
    })
  }
  // 进入详情页
})