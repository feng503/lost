import request from '../service/networkone.js'
const app = getApp();
Page({
  data: {
    TabCur: 0,
    scrollLeft: 0,
    numList: [{
      name: '选择类别'
    }, {
      name: '完善信息'
    }, {
      name: '上传信息'
    },],
    num: 0,
    scroll: 0,
    userInfo:null,
    index: null,
    index_1:null,
    picker: ['卡片', '衣物包包', '书籍', '钥匙', '其他'],
    choose:['捡到失物','寻找失物'],
    imgList: [],
    swiperList: [],
    banners: [],
    cardCur: 0,//轮播图模块化需要
    describe:'',
    location:'',
    phone:'',
    total_phone:''
   },
  numSteps() {
    this.setData({
      num: this.data.num == this.data.numList.length - 1 ? 1 : this.data.num + 1,
      scrollLeft: this.data.num * 60,
      TabCur: this.data.num + 1
    })
  },
  //模块更改(下一步)
  numSteps_front() {
    this.setData({
      num: this.data.num == this.data.numList.length - 1 ? 1 : this.data.num - 1,
      scrollLeft: this.data.num * 60,
      TabCur: this.data.num - 1
    })
  },
  // 模块更改（上一步）
  PickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  // 选择类别
  Pickerchoose(e) {
    this.setData({
      index_1: e.detail.value
    })
  },
  // 选择类别
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  //图片查看
  ChooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
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
  submit: function (e) {
    var that = this;
    var imagePath = this.data.imgList[0];
    var type = this.data.index;  
    var detail = this.data.describe;   
    var information = this.data.total_phone + this.data.phone;  
    var addr = this.data.location;
    var index_1 = this.data.index_1;
    wx.showToast({
      title: '上传中',
      duration: 53000,
      image: '/images/geren/trundle.png',
      mask: true,
    })
    if (imagePath == null) {
      wx.request({
        url: app.serverUrl + 'lost/submit2',
        method: "POST",
        data: {
          studentId: that.data.userInfo.studentId,
          type: type,
          service: index_1,
          detail: detail,
          information: information,
          addr: addr
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'lost': app.globalData.user.token
        },
        success: res => {
          wx.hideToast();
          if (res.data != "") {
            let data = JSON.parse(res.data)
            if (data.status !== 200) {
              wx.showToast({
                title: data.message,
                icon: "none",
                duration: 2000
              })
              return
            }
          }
          wx.showToast({
            title: '上传成功',
            duration: 1000,
            icon: 'success',
            mask: true,
          })
          wx.switchTab({
            url: '/pages/personal_center/personal_center'
          })
        },
        fail: () => {
          wx.hideToast();
          wx.showToast({
            title: '上传失败',
            duration: 1000,
            icon: 'none',
            mask: true,
          })
        }
      })
    } else {
      wx.uploadFile({
        url: app.serverUrl + 'lost/submit',
        filePath: imagePath,
        formData: {
          studentId: that.data.userInfo.studentId,
          type: type,
          service: index_1,
          detail: detail,
          information: information,
          addr: addr,
        },
        header: { "Context-Type": "multipart/form-data", 'lost': app.globalData.user.token },
        name: 'image',
        success: res => {
          wx.hideToast();
          if (res.data != "") {
            let data = JSON.parse(res.data)
            if (data.status !== 200) {
              wx.showToast({
                title: data.message,
                icon: "none",
                duration: 2000
              })
              return
            }
          }
          wx.showToast({
            title: '上传成功',
            duration: 1000,
            icon: 'success',
            mask: true,
          })
          wx.switchTab({
            url: '/pages/personal_center/personal_center'
          })
        },
        fail: () => {
          wx.hideToast();
          wx.showToast({
            title: '上传失败',
            duration: 1000,
            icon: 'none',
            mask: true,
          })
        }
      })
    }
  },
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          userInfo: res.data
        })
      },
    })
    request({
      url: app.serverUrl+'lost/getimages?service=0'
    }).then(res => {
      // 取出结果
      const banners = res.data;
      let swiper = []
      for(let i = 0; i < banners.length; i++){
        swiper.push({
          id: i,
          type: 'image',
          url: banners[i]
        })
      }
      this.setData({
        banners: banners,
        swiperList: swiper
      })
    })
    this.towerSwiper('swiperList');
  },
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  get_des_value(e){
    this.setData({
      describe: e.detail.value
    })
  },
  get_loc_value(e) {
    this.setData({
      location: e.detail.value
    })
  },
  get_pho_value(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  check_service(){
    if(this.data.index_1 !== null){
      this.setData({
        num: this.data.num == this.data.numList.length - 1 ? 1 : this.data.num + 1,
        scrollLeft: this.data.num * 60,
        TabCur: this.data.num + 1
      }) 
    }else{
      wx.showToast({
        title: '请选择服务类型',
        duration: 500,
        icon: 'none',
        mask: true,
      })
    }
  },
  check_information(){
    if (this.data.index !== null && this.data.describe !== '' && this.data.phone !== '' && this.data.location !== '' && this.data.total_phone !== ''){
        this.setData({
          num: this.data.num == this.data.numList.length - 1 ? 1 : this.data.num + 1,
          scrollLeft: this.data.num * 60,
          TabCur: this.data.num + 1
        }) 
    }else{
      wx.showToast({
        title: '请完善失物信息',
        duration: 500,
        icon: 'none',
        mask: true,
      })
    }
  },
  // 联系方式选择
  SetBorderSize(e) {
    this.data.total_phone = e.detail.value 
  }
})

