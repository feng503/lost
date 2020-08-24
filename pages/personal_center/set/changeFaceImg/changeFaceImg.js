let app = getApp();
const WeCropper = require('../../../we-cropper/we-cropper.js')  //引入插件js
const device = wx.getSystemInfoSync() // 获取设备信息
const width = device.windowWidth
const system = device.system;
let height = width; // 我这里要做兼容，各位自己看需要，这里是画布的高度
if (system.indexOf('iOS') != -1) {
  height = device.windowHeight - 100
} else {
  height = device.windowHeight - 50
}
if (system.indexOf('Android') != -1) {
  height = device.windowHeight - 200
} else {
  height = device.windowHeight - 50
}
Page({
  data: {
    // 裁剪组件所需要的参数
    cropperOpt: {
      id: 'cropper',
      width,  // 画布宽度
      height, // 画布高度
      scale: 20, // 最大缩放倍数
      zoom: 10, // 缩放系数
      cut: {
        x: 50,   // 裁剪区域开始的x坐标
        y: 60,  
        width: width-100,  //裁剪框的宽度 即所需图片的宽度  自己定义
        height: width-100  
      }
    },
    chooseImg: false,
  },


  onLoad: function (options) {
    const self = this;
    const system = device.system;
    console.log(system)
    //    兼容,可不写
    if (system.indexOf('iOS') != -1) {
      this.setData({
        ios: true
      })
    };
    // 多个页面都有裁剪的需求，因此这里在跳转时传递不同的参数，来判断裁剪的是哪一个
    this.setData({
      faceType: options.type
    })
    //  裁剪实例化和配置
    const { cropperOpt } = this.data;
    new WeCropper(cropperOpt)
      .on('ready', (ctx) => {
        // 这个是为了刚开始就显示裁剪区域（ps: 我们产品提出的，看好久的源码才添加上的，各位看需要添加）
        self.wecropper.updateCanvas()
      })
      .on('beforeImageLoad', (ctx) => {
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 20000
        })
      })
      .on('imageLoad', (ctx) => {
        wx.hideToast()
      })
  },
  // 选择图片事件
  chooseImg() {
    const self = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const src = res.tempFilePaths[0]
        //  裁剪的api
        if (src) {
          self.wecropper.pushOrign(src)
          self.setData({
            chooseImg: true,
          })
        };
        wx.hideToast()
      },
      fail(res) {
        wx.hideToast()
      }
    })
  },
  //   裁剪的拖动事件
  touchStart(e) {
    this.wecropper.touchStart(e)
  },
  touchMove(e) {
    this.wecropper.touchMove(e)
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e)
  },
  // 裁剪 图片
  getCropperImage() {
    let that = this;
    if (this.data.chooseImg) {
      wx.showToast({
        title: '头像上传中',
        duration: 10000,
        mask: true,
        icon: 'loading',
      })
      this.wecropper.getCropperImage((src) => {
        let id = app.globalData.user.studentId;
          wx.uploadFile({
            url: app.serverUrl+'user/reSetImage',
            header: { 'lost': app.globalData.user.token },
            filePath: src,
            name: 'faceImg',
            method: "POST",
            formData: {
              studentId: id,
            },
            success: (res) => {
              // console.log(res.data)
              let userInfo = JSON.parse(res.data);
              app.globalData.user = userInfo;

              wx.setStorageSync('userInfo', userInfo)
              wx.showToast({
                title: '头像修改成功',
                duration: 3000,
                icon: 'success',
              })
              wx.navigateTo({
                url: 'pages/personal_center/personal_center',
              })
            },
          })
      })
      
    } else {
      wx.showToast({
        title: '您还没选择图片！',
        icon: 'none'
      })
    }
  },

  cancleCropper() {
    wx.hideToast()
    wx.navigateBack()
  },
})