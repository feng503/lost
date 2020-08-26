let app = getApp();
Page({
  data: {
    fish: {},
    commentList: {},
    newComment: '',
    myid: '',
    inputHorder: '发布友善的评论',
    input: false,
    replay: false,
    replayComment: null
  },
  onLoad:function (opetios) {
    var that = this;
    let fish = JSON.parse(opetios.fishDeteil);
    this.setData({
      fish: fish,
      myid: app.globalData.user.studentId
    });
  },
  onShow: function(){
    let that = this;
    // 获取评论信息
    wx.request({
      url: app.serverUrl + 'fish/queryFishComment',
      header: { 'lost': app.globalData.user.token },
      method: "GET",
      data: {
        fishId: that.data.fish.fishId
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
  addComment: function(){
    let that = this;
    let data = this.data;
    const replay = data.replay;
    if (replay) {
      if (data.replayComment.parentId != 0)
        data.replayComment.commentId = data.replayComment.parentId
      wx.request({
        url: app.serverUrl + 'fish/addFishComment',
        header: { 'lost': app.globalData.user.token },
        method: "GET",
        data: {
          fishId: data.fish.fishId,
          commentatorId: app.globalData.user.studentId,
          toUserId: data.replayComment.commentatorId,
          parentId: data.replayComment.commentId,
          commentDetail: data.newComment
        },
        success: function (res) {
          if (res.statusCode == 200) {
            that.setData({
              commentList: res.data
            });
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
        url: app.serverUrl + 'fish/addFishComment',
        header: { 'lost': app.globalData.user.token },
        method: "GET",
        data: {
          fishId: data.fish.fishId,
          commentatorId: app.globalData.user.studentId,
          commentDetail: data.newComment
        },
        success: function (res) {
          if (res.statusCode == 200) {
            that.setData({
              commentList: res.data
            });
          }
          that.setData({
            newComment: ''
          });
        }
      })
    }
  },
  // 删除评论
  deleteComment: function(e){
    const commentId = e.currentTarget.dataset.id
    const studentId = this.data.myid
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确认删除该评论？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.serverUrl + 'fish/deleteComment?studentId='+studentId+'&commentId='+commentId,
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
  replayComment: function (e){
    let comment = e.currentTarget.dataset.comment
    this.setData({
      inputHorder: '回复 @' + comment.commentatorName,
      input: true,
      replay: true,
      replayComment: e.currentTarget.dataset.comment
    })
  },
  // 查看大图
  previewImg: function (e) {
    let that = this;
    const i = e.currentTarget.dataset.i
    let cur = that.data.fish.thumbImg[i]
    cur = cur.split('_')[0] + '.png'
    wx.previewImage({
      current: cur,
      urls: that.data.fish.imagePath
    })
  },
  input: function (e) {
    this.setData({
      newComment: e.detail.value
    })
  },
  inputBlur: function(){
    setTimeout(() => {
      this.setData({
        inputHorder: '发布友善的评论',
        replay: false
      }, 500)
    })
  }
})