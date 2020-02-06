let app = getApp();
Page({
  data: {
    faceImage:[],
    nickname:'',
    img_url: [],
    talk: '',
    id:'',
    ig:0
  },
  onShow: function (options) {
    this.setData({
      nickname: app.globalData.user.nickname,
      faceImage: app.globalData.user.faceImage,
      id: app.globalData.user.studentId
    })
    console.log(app.globalData.user)
  },





  onLoad: function (options) {

  },
  input: function (e) {
    this.setData({
      talk: e.detail.value
      
    })
    // console.log(e.detail.value)
  },
  chooseimage: function () {
    var that = this;
    wx.chooseImage({
      count: 9, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        console.log(res.tempFilePaths)
        that.data.ig++
        console.log(that.data.ig)
        if (that.data.ig > 0) {

          //图如果满了9张，不显示加图
          if (that.data.ig == 9) {
            that.setData({
              hideAdd: 1
            })
          } else {
            that.setData({
              hideAdd: 0
            })
          }

          //把每次选择的图push进数组
          let img_url = that.data.img_url;
          for (let i = 0; i < res.tempFilePaths.length; i++) {
            img_url.push(res.tempFilePaths[i])
          }
          that.setData({
            img_url: img_url
          })

        }

      }
    })
  },
  //发布按钮事件
  send: function () {
    var that = this;
    var user_id = that.data.id
    wx.showLoading({
      title: '正在上传',
    })
    that.img_upload()
  },
  //图片上传
  img_upload: function () {
    let that = this;
    let img_url = that.data.img_url;
    let img_url_ok = [];
    //由于图片只能一张一张地上传，所以用循环
    console.log(img_url.length);
    for (let i = 0; i < img_url.length; i++) {
      wx.uploadFile({
        url: 'https://www.vergessen.top/lostobj/addFishImg',
        filePath: img_url[i],
        method: "GET",
        name: 'image',
        formData: {
          studentId:that.data.id
        },
        success: function (res) {
          console.log('上传成功');
          console.log(res);
          //把上传成功的图片的地址放入数组中
          img_url_ok.push(res.data)
          //如果全部传完，则可以将图片路径保存到数据库
          if (img_url_ok.length == img_url.length) {
            var studentId = app.globalData.user.studentId;
            var talk = that.data.talk;
            wx.request({
              url: 'https://www.vergessen.top/lostobj/addFish',
              method: "GET",
              data: {
                studentId: studentId,
                image: img_url_ok,
                talk: talk,
              },
              success: function (res) {
                if (res.data.status == 1) {
                  wx.hideLoading()
                  wx.showModal({
                    title: '提交成功',
                    showCancel: false,
                    success: function (res) {
                      if (res.confirm) {
                        wx.navigateTo({
                          url: '/pages/my_moments/my_moments',
                        })
                      }
                    }
                  })
                }
              }
            })
          }
        },
        fail: function (res) {
          console.log('上传失败')
        }
      })
    }
  }
})