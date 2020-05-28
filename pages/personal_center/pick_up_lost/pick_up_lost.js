import request from '../service/networkone.js'
const app = getApp();
Page({
  data: {
    TabCur: 0,
    scrollLeft: 0,
    numList: [{
      name: '开始'
    }, {
      name: '继续'
    }, {
      name: '加油'
    }, {
      name: '完成'
    },],
    num: 0,
    scroll: 0,
    index: null,
    picker: ['卡片', '衣物包包', '书籍', '钥匙', '其他'],
    imgList: [],
    swiperList: [{
      id: 0,
      type: 'image',
      url: ''
    }, {
      id: 1,
      type: 'image',
      url: '',
    }, {
      id: 2,
      type: 'image',
      url: ''
    }, {
      id: 3,
      type: 'image',
      url: ''
    }],
    banners: [],
    cardCur: 0,//轮播图模块化需要
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
      num: this.data.num == this.data.numList.length - 1 ? 2 : this.data.num - 1,
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
  submit: function () {
    wx.showToast({
      title: '等待中',
      image: '/images/geren/trundle.png',
      duration: 2000
    })
    wx.navigateTo({
      url: '',
    })
  },
  // 提交弹窗等待
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
      url: 'https://www.vergessen.top/lostobj/getimages'
    }).then(res => {
      // 取出结果
      const banners = res.data;
      this.setData({
        banners: banners,
        swiperList: [{
          id: 0,
          type: 'image',
          url: 'https://a1.qpic.cn/psc?/V10JXMix0CQf9J/UAKsoihnbkr0XNkArJGSugpRiCkIsEfB2JhbgGkC6Hok5yp0F32NfRqT6CmBpPjPiO.Px8hjWESHBxnzztoA4A!!/m&ek=1&kp=1&pt=0&bo=VQhABlUIQAYRECc!&t=5&tl=3&vuin=644960080&tm=1587715200&sce=60-4-3&rf=0-0'
        }, {
          id: 1,
          type: 'image',
          url: banners[0],
        }, {
          id: 2,
          type: 'image',
          url: banners[1]
        }, {
          id: 3,
          type: 'image',
          url: banners[2]
        }],
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
  // 轮播图
})