Page({

  /**
   * 页面的初始数据
   */
  data:{ 
    majorArray: ['卡片', '衣物包包', '书籍', '钥匙','其他'],
    magorObjectArray: [
      { id: 0, name: '卡片' }, { id: 1, name: '衣物包包' }, { id: 2, name: '书籍' }, { id: 3, name: '钥匙' }, { id: 4, name: '其他' }
    ],
    majorIndex: 1,
    typeIndex: 0,
    detail: '',
    information:'',
    addr:'',
    tempFilePaths:null,
    userInfo: null
  },
  getLocalImage:function(e){
    this.setData({
    tempFilePaths: e.detail.value
    })
  },
  bindMajorChange: function (e) {
    this.setData({
    majorIndex: e.detail.value
    })
  },
  detailInput: function (e) {
    this.setData({
      detail: e.detail.value
    })
  },
  informationInput: function (e) {
    this.setData({
      information: e.detail.value
    })
       
  },
  addrInput: function (e) {
    this.setData({
      addr: e.detail.value
    })
  },
  orderMeeting: function () {  
    var that = this;
    var imagePath = this.data.tempFilePaths;
    console.log(imagePath)
    var type = this.data.majorIndex;
    // console.log(type)      
    var detail = this.data.detail;    
    //  console.log(detail)    
    var information = this.data.information;    
    // console.log(information)    
    var addr = this.data.addr;    
    // console.log(addr) 
  
  wx.uploadFile({
    url: 'https://www.vergessen.top/lostobj/submitimage',
    filePath: imagePath,
    formData:{
      studentId: that.data.userInfo.studentId
    },
    header: {"Context-Type": "multipart/form-data"},
    name: 'image',
      success: ()=>{
        console.log(that.data.userInfo.studentId);
        if(information.length!=0)
        {
        wx.request({
          url: 'https://www.vergessen.top/lostobj/submit',
          //  method: "POST",
          //  header:{"Content-Type": "json"},
          data: {
            //  image:imagePath,
            type: type,
            service: 0,
            detail: detail,
            information: information,
            addr: addr,
            studentId: that.data.userInfo.studentId
          }
        })
        wx.showToast({
          title: '上传成功',
          duration: 3000,
          icon: 'success',
        })
        // wx.switchTab({
        //   url: '/pages/gerenzhongxin/gerenzhongxin',
        // })
        }
        else 
        {
          wx.showToast({
            title: '上传失败，请检查后重试',
            duration: 3000,
            icon: 'none',
          })
        }
      },
  })
  },
  getLocalImage: function (e) {
    var that = this;
    console.log("1111")
    wx.chooseImage({
      success: function (e) {
        console.log(e);
        that.setData({
          tempFilePaths:e.tempFilePaths[0]
        })
      },
    })
  },


  bindMajorChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    let that = this;
    this.setData({
      majorIndex: e.detail.value
    })
     
  },
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({
          userInfo: res.data
        })
        console.log(that.data.userInfo)
      },
    })
  },

//   onUnload: function () {
//     wx.reLaunch({
//       url: '/pages/gerenzhongxin/gerenzhongxin',
//     })
//   },
 })