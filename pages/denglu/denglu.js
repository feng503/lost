
var interval = null //倒计时函数
Page({
  data: {
    TopIndex:0,
    put: '',
    phoneNum: "",
    time: '获取验证码', //倒计时 
    currentTime: 60 ,
    btn:false
  },
 
  changstyle:function(e){

   let index=e.currentTarget.dataset.index;
   this.setData({
     TopIndex:index
   })
 },

  login: function (e) {
    let that = this;
    // console.log(e);
    wx.request({
      url: 'https://www.vergessen.top/lostobj/login',
      data:{
        studentId:e.detail.value.studentId,
        password:e.detail.value.password
      },
      success: function(e){
        console.log(e); 
        if(e.statusCode === 200){
          wx.setStorage({
            key: "userInfo",
            data: e.data
          })
          wx.switchTab({
            url: '/pages/shiwuzhanshi/shiwuzhanshi',
          })
        }
        if (e.statusCode === 500) {
          wx.showToast({
            // title:e.data.message,
            title:'学号或密码错误',
            duration:3000,
            icon:'success',
            image:'/images/denglu/error.png'
          })
        }
      }
    })

  },
  mima: function (e) {
    this.setData({
      put: e.detail.value
    })
    // console.log(this.data.put)
  },

  //注册
  GoRegister: function(e){
    console.log(e);
    var userInfo = e.detail.value;
    wx.request({
      url: 'https://www.vergessen.top/lostobj/register',
      data:{
        studentId:userInfo.username,
        phoneNum: userInfo.phone,
        passwordFirst: userInfo.pwd1,
        passwordSecond: userInfo.pwd2,
        testCode: userInfo.code
      },
      success: function (e) {
        console.log(e);
        if (e.statusCode === 200) {
          wx.setStorage({
            key: "userInfo",
            data: e.data
          })
          wx.switchTab({
            url: '/pages/shiwuzhanshi/shiwuzhanshi',
          })
        }
        if (e.statusCode === 500) {
          wx.showToast({
            title:e.data.message,
            // title: '学号或密码错误',
            // duration: 3000,
            // icon: 'success',
            // image: '/images/denglu/error.png'
          })
        }
      }
    })
  },

  //保存手机号
  setPhone: function(e){
    //console.log(e);
    this.setData({
        phoneNum: e.detail.value
    })
  },

  //获取验证码
  getCode: function(e){
    this.daojishi();
    var that  = this;
    if (that.data.phoneNum != ""){
      wx.request({
        url: 'https://www.vergessen.top/lostobj/code?phoneNum=' + that.data.phoneNum,
      })
    } 
  },
  daojishi: function (options) {
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒',
        btn:true
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          btn:false,
          currentTime: 60,
          disabled: false
        })
      }
    }, 1000)
  },
})
