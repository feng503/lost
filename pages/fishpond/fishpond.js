let app = getApp();
Page({
  data: {
    list: [],
    maxtime: '',
    loadingHidden: false,
    faceImage: [],
    nickname: '',
    newsdata: [],
    images: [],
    id: '',
    index: '',
    imgs: [],
    page: 1
  },
  onShareAppMessage: function (res) {
    return {
      title: '河工大失物招领平台',
      path: '/pages/fishpond/fishpond',
      success: function (res) {
        //转发成功
      },
      fail: function (res) {
        //转发失败
      }
    }
  },
  onLoad: function (options) {
    wx.stopPullDownRefresh();
    this.setData({
      nickname: app.globalData.user.nickname,
      faceImage: app.globalData.user.faceImage,
      page: 1
    })
    var that = this;
    wx.request({
      url: app.serverUrl+'fish/queryFishes',
      data: {
      },
      success: function (res) {
        that.setData({
          newsdata: res.data
        });
      },
    })
  },
  // 查看鱼塘详情
  showDetail: function(e){
    let that = this;
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/fishpond/fishdetail?fishDeteil=' + JSON.stringify(that.data.newsdata[index])
    })
  },
  // 举报鱼塘
  reportFish: function(e){
    let fish = e.currentTarget.dataset.fish
    let that = this;
    let studentId = fish.publisherId
    wx.showModal({
      title: '提示',
      content: '确认举报该动态？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.serverUrl + 'fish/report',
            data:{
              studentId: studentId,
              fishId: fish.fishId,
              detail: '不良信息'
            },
            header: { 'lost': app.globalData.user.token },
            success: (res) => {
              wx.showToast({
                title: res.data,
                duration: 2000,
                icon: 'none',
                mask: true,
              })
            }
          })
        }
      }
    })
  },
  onPullDownRefresh: function () {
    this.onLoad();
    wx.showToast({
      title: '加载完成~',
      duration: 500,
      icon: 'success',
      mask: true,
    })
  },
  onReachBottom: function () {
    var that = this;
    wx.showLoading({
      title: '拼命加载中'
    })
    let page = this.data.page + 1;
    wx.request({
      url: app.serverUrl+'fish/queryFishes', //此处要加page页 
      data: {
        page: page
      },
      success: function (res) {
        wx.hideLoading()
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
        wx.showToast({
          title: '加载完成~',
          duration: 500,
          icon: 'success',
          mask: true,
        })
      },
      fail: function (res) {
        that.setData({
          bottomTitle: true,
          title: '-- 我是有底线的 --'
        })
        wx.hideLoading()
      }
    })
  },
  liujiayu: function () {
    wx.navigateTo({
      url: '/pages/fishpond/fishpond_publish',
    })
  },
  previewImg: function (e) {
    let that = this;
    const index = e.currentTarget.dataset.index
    const i = e.currentTarget.dataset.i
    let cur = that.data.newsdata[index].thumbImg[i]
    cur = cur.split('_')[0] + '.png'
    wx.previewImage({
      current: cur,
      urls: that.data.newsdata[index].imagePath
    })
  },
})