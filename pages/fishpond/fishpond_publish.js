let app = getApp();
Page({
  data: {
    faceImage: [],
    nickname: '',
    talk: '',
    id: '',
    ig: 0,
    sucimgNum: 0,
    imgList: []
  },
  onShow: function (options) {
    this.setData({
      nickname: app.globalData.user.nickname,
      faceImage: app.globalData.user.faceImage,
      id: app.globalData.user.studentId
    })
    // console.log(app.globalData.user)
  },
  onLoad: function (options) {

  },
  input: function (e) {
    this.setData({
      talk: e.detail.value

    })
    // console.log(e.detail.value)
  },
  ViewImage(e) {
    console.log(e)
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  //图片查看
  ChooseImage() {
    wx.chooseImage({
      count: 3, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  //选择图片
  DelImg(e) {
    wx.showModal({
      title: '客官',
      content: '确定要删除这张照片吗？',
      confirmText: '确定',
      cancelText: '取消',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  //删除图片
  send: function () {
    var that = this;
    var user_id = that.data.id
    wx.showToast({
      title: '正在上传',
      duration: 33000,
      icon: 'loading',
      mask: true,
    })
    that.img_upload();
  },
  //发布按钮事件
  img_upload: function () {
    let that = this;
    let img_url = that.data.imgList;
    let img_url_ok = [];
    var studentId = app.globalData.user.studentId;
    var talk = that.data.talk;
    //由于图片只能一张一张地上传，所以用循环
    // console.log(img_url.length);
    if (img_url.length === 0) {
      wx.request({
        url: app.serverUrl+'fish/addFish',
        header: { 'lost': app.globalData.user.token },
        method: "GET",
        data: {
          studentId: studentId,
          // image: img_url_ok,
          talk: talk,
        },
        success: function (res) {
          if (res.statusCode === 201) {
            wx.hideToast();
            wx.showModal({
              title: '发布成功',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.navigateBack({})
                }
              }
            })
          } else {
            wx.hideToast();
            wx.showToast({
              title: res.data.message,
              duration: 3000,
              icon: 'none',
            })
          }
        }
      })
    } else {
      for (let i = 0; i < img_url.length; i++) {
        wx.uploadFile({
          url: app.serverUrl+'fish/addFishImg',
          header: { 'lost': app.globalData.user.token },
          filePath: img_url[i],
          method: "POST",
          name: 'image',
          formData: {
            studentId: studentId
          },
          success: function (res) {
            that.setData({
              sucimgNum: that.data.sucimgNum + 1
            })
            //如果全部传完，则可以将图片路径保存到数据库
            if (that.data.sucimgNum == img_url.length) {
              that.setData({
                sucimgNum: 0
              })
              var studentId = app.globalData.user.studentId;
              var talk = that.data.talk;
              wx.request({
                url: app.serverUrl+'fish/addFish',
                header: { 'lost': app.globalData.user.token },
                method: "GET",
                data: {
                  studentId: studentId,
                  // image: img_url_ok,
                  talk: talk,
                },
                success: function (res) {
                  if (res.statusCode == 201) {
                    wx.hideToast();
                    wx.showModal({
                      title: '发布成功',
                      showCancel: false,
                      success: function (res) {
                        if (res.confirm) {
                          wx.navigateBack({})
                        } 
                      }
                    })
                  } else {
                    wx.hideToast();
                    wx.showToast({
                      title: res.data.message,
                      duration: 3000,
                      icon: 'none',
                    })
                  }
                }
              })
            }
          },
          fail: function (res) {
            that.setData({
              imgList: []
            })
          }
        })
      }
    }
  }
    //图片上传
})