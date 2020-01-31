let app = getApp();
Page({
  data: {
    newsdata:[],
    userInfo: null
  },

  findLostByType: function(){
    var that = this;

    that.newsdata = [];
    app.globalData.newlist = [];
    wx.request({
      url: 'https://www.vergessen.top/lostobj/findlostsbytype',
      data: {
        type:0,
        service: 0
      },
      success: function (res) {
        // console.log(res.data);

        // app.globalData.newsliet = res.data;
        // console.log(app.globalData.newslist);
        that.setData({
          newsdata: res.data
        });
        app.globalData.newlist = that.data.newsdata;
        // console.log(app.globalData.newlist);
      },

    })
  },
   yiwubaobao: function () {
    var that = this;

    that.newsdata = [];
    app.globalData.newlist = [];
    wx.request({
      url: 'https://www.vergessen.top/lostobj/findlostsbytype',
      data: {
        type: 1,
        service: 0
      },
      success: function (res) {
        // console.log(res.data);

        // app.globalData.newsliet = res.data;
        // console.log(app.globalData.newslist);
        that.setData({
          newsdata: res.data
        });
        app.globalData.newlist = that.data.newsdata;
        // console.log(app.globalData.newlist);
      },

    })
  },
  shuji: function () {
    var that = this;

    that.newsdata = [];
    app.globalData.newlist = [];
    wx.request({
      url: 'https://www.vergessen.top/lostobj/findlostsbytype',
      data: {
        type: 2,
        service: 0
      },
      success: function (res) {
        // console.log(res.data);

        // app.globalData.newsliet = res.data;
        // console.log(app.globalData.newslist);
        that.setData({
          newsdata: res.data
        });
        app.globalData.newlist = that.data.newsdata;
        // console.log(app.globalData.newlist);
      },

    })
  }, 
  yaoshi: function () {
    var that = this;

    that.newsdata = [];
    app.globalData.newlist = [];
    wx.request({
      url: 'https://www.vergessen.top/lostobj/findlostsbytype',
      data: {
        type: 3,
        service: 0
      },
      success: function (res) {
        // console.log(res.data);

        // app.globalData.newsliet = res.data;
        // console.log(app.globalData.newslist);
        that.setData({
          newsdata: res.data
        });
        app.globalData.newlist = that.data.newsdata;
        // console.log(app.globalData.newlist);
      },

    })
  },
   qita: function () {
    var that = this;

    that.newsdata = [];
    app.globalData.newlist = [];
    wx.request({
      url: 'https://www.vergessen.top/lostobj/findlostsbytype',
      data: {
        type: 4,
        service: 0
      },
      success: function (res) {
        // console.log(res.data);

        // app.globalData.newsliet = res.data;
        // console.log(app.globalData.newslist);
        that.setData({
          newsdata: res.data
        });
        app.globalData.newlist = that.data.newsdata;
        // console.log(app.globalData.newlist);
      },

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    
    var that = this;
      wx.request({
        url:'https://www.vergessen.top/lostobj/findlostsall',
        data:{
            service:0
        },
        success:function(res){
            that.setData({
            newsdata:res.data
           });
          app.globalData.newlist = that.data.newsdata;
        },
   })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
  return{
    title:'河工大失物招领平台',
    path:'/pages/shiwuzhanshi',
    success:function(res){
      //转发成功
    },
    fail:function(res){
      //转发失败
    }
  }
  },

  Biu: function (e) {
    // console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/shiwuzhanshi/detail/detail?id=' + e.currentTarget.dataset.id
    })
  }
})
// detail: function () {
//     wx.redirectTo({
//       url: '/pages/shiwuzhanshi/detail/detail',
//     })
//   },
// })

