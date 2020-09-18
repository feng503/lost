let app = getApp();
Page({
  data: {
    shuju: {},
    user: {},
    commentList: {},
    showImg: false,
    newComment: '',
    myid: '',
    inputHorder: '发布友善的留言',
    input: false,
    replay: false,
    replayComment: null,
    service:false,
    phone_1:'',
    phone:''
  },
  onLoad:function (opetios) {
    var that = this;
    let lost = JSON.parse(opetios.lostDeteil);
    this.setData({
      phone_1:lost,
      shuju: lost,
      myid: app.globalData.user.studentId
    });
    this.setData({
      phone: this.data.phone_1.information.slice(1)
    })
    if (this.data.shuju.information.substr(0, 1) == '#'){
      that.setData({
        service: true
      })
    }else{
      that.setData({
        service: false
      })
    }
    wx.request({
      url: app.serverUrl + 'user/getuser?studentId=' + lost.lostUserStudentId,
      header: { 'lost': app.globalData.user.token},
      success: (res) => {
        that.setData({
          user: res.data
        })
      }
    })
  },
  onShow: function(){
    let that = this;
    // 获取评论信息
    wx.request({
      url: app.serverUrl + 'lost/queryLostComment',
      header: { 'lost': app.globalData.user.token },
      method: "GET",
      data: {
        lostId: that.data.shuju.id
      },
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({
            commentList: res.data
          });
        }
      }
    })
  },
  // 添加评论
  addComment: function () {
    let that = this;
    let data = this.data;
    const replay = data.replay;
    if (replay) {
      if (data.replayComment.parentId != 0)
        data.replayComment.commentId = data.replayComment.parentId
      wx.request({
        url: app.serverUrl + 'lost/addLostComment',
        header: { 'lost': app.globalData.user.token },
        method: "GET",
        data: {
          lostId: data.shuju.id,
          studentId: app.globalData.user.studentId,
          toUserId: data.replayComment.commentatorId,
          parentId: data.replayComment.commentId,
          commentDetail: data.newComment
        },
        success: function (res) {
          if (res.statusCode == 200) {
            that.setData({
              commentList: res.data
            });
          } else{
            wx.showToast({
              title: res.data.message,
              icon: "none",
              duration: 2000
            })
          }
          that.setData({
            newComment: '',
            replay: false,
            replayComment: null
          });
        }
      })
    } else {
      wx.request({
        url: app.serverUrl + 'lost/addLostComment',
        header: { 'lost': app.globalData.user.token },
        method: "GET",
        data: {
          lostId: data.shuju.id,
          studentId: app.globalData.user.studentId,
          commentDetail: data.newComment
        },
        success: function (res) {
          if (res.statusCode == 200) {
            that.setData({
              commentList: res.data
            });
          } else {
            wx.showToast({
              title: res.data.message,
              icon: "none",
              duration: 2000
            })
          }
          that.setData({
            newComment: ''
          });
        }
      })
    }
  },
  // 删除评论
  deleteComment: function (e) {
    const commentId = e.currentTarget.dataset.id
    const studentId = this.data.myid
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确认删除该评论？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.serverUrl + 'lost/deleteComment?studentId=' + studentId + '&commentId=' + commentId,
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
  // 回复评论
  replayComment: function (e) {
    let comment = e.currentTarget.dataset.comment
    this.setData({
      inputHorder: '回复 @' + comment.commentatorName,
      input: true,
      replay: true,
      replayComment: e.currentTarget.dataset.comment
    })
  },
  // 举报失物信息
  reportLost: function () {
    let lost = this.data.shuju
    let that = this;
    let studentId = app.globalData.user.studentId
    wx.showModal({
      title: '提示',
      content: '确认举报该动态？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.serverUrl + 'lost/report',
            data: {
              studentId: studentId,
              lostId: lost.id,
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
        } else if (res.cancel) {
        }
      }
    })
  },
  input: function (e) {
    this.setData({
      newComment: e.detail.value
    })
  },
  inputBlur: function () {
    setTimeout(() => {
      this.setData({
        inputHorder: '发布友善的评论',
        replay: false
      }, 500)
    })
  },
  previewImg: function () {
    let that = this;
    wx.previewImage({
      current: that.data.shuju.imagePathSmall,
      urls: [].concat(that.data.shuju.imagePath)
    })
  },
  showImgBtn: function(){
    this.setData({
      showImg: !this.data.showImg
    })
  },
  lost_service:function(){
    if(this.data.service === true){
      wx.makePhoneCall({
        phoneNumber: this.data.phone,
      })
    }else{
      var qqnumber = this.data.phone;
      wx.setClipboardData({
        data: qqnumber,
        success: function (res) {
          wx.showToast({
            title: '复制成功',
          })
        }
      })
    }
  },
})