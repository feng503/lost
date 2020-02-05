let app = getApp();
Page({
  data: {
    newsdata:[],
    userInfo: null,
    detail:'',
    tp:0
  },

  findLostByType: function(){
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
      url: 'https://www.vergessen.top/lostobj/findlostsbytype',
      data: {
        type:0,
        service: this.data.tp
      },
      success: function (res) {
        // console.log(res.data);
        // app.globalData.newsliet = res.data;
        // console.log(app.globalData.newslist);
        wx.showToast({
          title: '加载成功',
          duration: 500,
          icon: 'success',
          mask: true,
        })
        that.setData({
          newsdata: res.data
        });
        app.globalData.newlist = that.data.newsdata;
        // console.log(app.globalData.newlist);
      },

    })
  },
  getInput:function(e){
    this.setData({
      detail:e.detail.value
    })
  },
  queryLosts:function(){
    var that = this;
    wx.request({
      url: 'https://www.vergessen.top/lostobj/findlostsbydetail',
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
          newsdata: res.data
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
      url: 'https://www.vergessen.top/lostobj/findlostsbytype',
      data: {
        type: 1,
        service: that.data.tp
      },
      success: function (res) {     
        // console.log(res.data);

        // app.globalData.newsliet = res.data;
        // console.log(app.globalData.newslist);
        wx.showToast({
          title: '加载成功',
          duration: 500,
          icon: 'success',
          mask: true,
        })
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
    wx.showToast({
      title: '加载中',
      duration: 13000,
      icon: 'loading',
      mask: true,
    })
    wx.request({
      url: 'https://www.vergessen.top/lostobj/findlostsbytype',
      data: {
        type: 2,
        service: that.data.tp
      },
      success: function (res) {
        // console.log(res.data);

        // app.globalData.newsliet = res.data;
        // console.log(app.globalData.newslist);
        wx.showToast({
          title: '加载成功',
          duration: 500,
          icon: 'success',
          mask: true,
        })
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
    wx.showToast({
      title: '加载中',
      duration: 13000,
      icon: 'loading',
      mask: true,
    })
    wx.request({
      url: 'https://www.vergessen.top/lostobj/findlostsbytype',
      data: {
        type: 3,
        service: that.data.tp
      },
      success: function (res) {
        // console.log(res.data);

        // app.globalData.newsliet = res.data;
        // console.log(app.globalData.newslist);
        wx.showToast({
          title: '加载成功',
          duration: 500,
          icon: 'success',
          mask: true,
        })
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
     wx.showToast({
       title: '加载中',
       duration: 13000,
       icon: 'loading',
       mask: true,
     })
    wx.request({
      url: 'https://www.vergessen.top/lostobj/findlostsbytype',
      data: {
        type: 4,
        service: that.data.tp
      },
      success: function (res) {
        // console.log(res.data);

        // app.globalData.newsliet = res.data;
        // console.log(app.globalData.newslist);
        wx.showToast({
          title: '加载成功',
          duration: 500,
          icon: 'success',
          mask: true,
        })
        that.setData({
          newsdata: res.data
        });
        app.globalData.newlist = that.data.newsdata;
        // console.log(app.globalData.newlist);
      },

    })
  },
    onLoad: function(options){
      var that = this;
      wx.request({
        url: 'https://www.vergessen.top/lostobj/findlostsall',
        data: {
          service: that.data.tp
        },
        success: function (res) {
          that.setData({
            newsdata: res.data
          });
          app.globalData.newlist = that.data.newsdata;
        },
      })
    },
    fresh:function(){
      if (this.data.tp==0){
      this.data.tp =1;}
      else{
      this.data.tp =0;
      }
      wx.showToast({
        title: '加载中',
        duration: 3500,
        icon: 'loading',
        mask: true,
      })
      this.onLoad()
      wx.showToast({
        title: '加载成功',
        duration: 500,
        icon: 'success',
        mask:true,
      })
    },
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





  //插入框架
  
})

