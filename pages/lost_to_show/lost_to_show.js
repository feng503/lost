let app = getApp();
Page({
  data: {
    newsdata: [],
    userInfo: null,
    detail: '',
    tp: 0,
    page: 0,
    type: -1,
    lingColor: '#f9c828',
    zhaoColor: '#ffffff'
  },

  findLostByType: function () {
    var that = this;

    that.newsdata = [];
    app.globalData.newlist = [];
    wx.showToast({
      title: '加载中',
      duration: 13000,
      icon: 'loading',
      mask: true,
    })
    wx.request({
      url: app.serverUrl + 'findlostsbytype',
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
          page: 0,
          type: 0,
        });
        app.globalData.newlist = that.data.newsdata;
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
      url: app.serverUrl+'findlostsbydetail',
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
          page: 0,
          type: -2
        });
        app.globalData.newlist = that.data.newsdata;
      },
    })
  },
  yiwubaobao: function () {
    var that = this;

    that.newsdata = [];
    app.globalData.newlist = [];
    wx.showToast({
      title: '加载中',
      duration: 13000,
      icon: 'loading',
      mask: true,
    })
    wx.request({
      url: app.serverUrl+'findlostsbytype',
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
          page: 0,
          type: 1,
        });
        app.globalData.newlist = that.data.newsdata;
      },

    })
  },
  shuji: function () {
    var that = this;

    that.newsdata = [];
    app.globalData.newlist = [];
    wx.showToast({
      title: '加载中',
      duration: 13000,
      icon: 'loading',
      mask: true,
    })
    wx.request({
      url: app.serverUrl+'findlostsbytype',
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
          page: 0,
          type: 2,
        });
        app.globalData.newlist = that.data.newsdata;
      },

    })
  },
  yaoshi: function () {
    var that = this;

    that.newsdata = [];
    app.globalData.newlist = [];
    wx.showToast({
      title: '加载中',
      duration: 13000,
      icon: 'loading',
      mask: true,
    })
    wx.request({
      url: app.serverUrl+'findlostsbytype',
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
          page: 0,
          type: 3,
        });
        app.globalData.newlist = that.data.newsdata;
      },

    })
  },
  qita: function () {
    var that = this;

    that.newsdata = [];
    app.globalData.newlist = [];
    wx.showToast({
      title: '加载中',
      duration: 13000,
      icon: 'loading',
      mask: true,
    })
    wx.request({
      url: app.serverUrl+'findlostsbytype',
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
          page: 0,
          type: 4,
        });
        app.globalData.newlist = that.data.newsdata;
      },

    })
  },
  onLoad: function (options) {
    wx.stopPullDownRefresh()
    var that = this;
    wx.request({
      url: app.serverUrl+'findlostsall',
      data: {
        service: that.data.tp
      },
      success: function (res) {
        that.setData({
          newsdata: res.data,
          page: 0,
          type: -1,
          detail: ''
        });
        app.globalData.newlist = that.data.newsdata;
      },
    })
  },

  // 下拉刷新
  onPullDownRefresh: function () {

    this.onLoad();
  },

  // 上拉事件
  onReachBottom: function () {
    // console.log("用户拉到底部");
    var that = this;
    wx.showLoading({
      title: '拼命加载中',
    })
    let page = this.data.page + 1;
    if (this.data.type >= 0) {
      wx.request({
        url: app.serverUrl+'findlostsbytype', //此处要加page页 
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
          app.globalData.newlist = that.data.newsdata
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
        url: app.serverUrl+'findlostsbydetail',
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
          app.globalData.newlist = that.data.newsdata
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
        url: app.serverUrl+'findlostsall', //此处要加page页 
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
          app.globalData.newlist = that.data.newsdata
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
  onShareAppMessage: function (res) {
    return {
      title: '河工大失物招领平台',
      path: '/pages/shiwuzhanshi',
      success: function (res) {
        //转发成功
      },
      fail: function (res) {
        //转发失败
      }
    }
  },

  Biu: function (e) {
    wx.navigateTo({
      url: '/pages/shiwuzhanshi/detail/detail?id=' + e.currentTarget.dataset.id
    })
  }
})