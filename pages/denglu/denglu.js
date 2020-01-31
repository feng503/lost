let app = getApp();
var interval = null //倒计时函数
Page({
  data: {
    TopIndex:0,
    put: '',
    phoneNum: "",
    time: '获取验证码', //倒计时 
    currentTime: 60 ,
    btn:false,
    userInfo:[]
  }, 
  changstyle:function(e){
   let index=e.currentTarget.dataset.index;
   this.setData({
     TopIndex:index
   })
 },
//以上为登录与注册切换格式
onLaunch:function(){
  const userInfo = wx.getStorageSync('userInfo')
  if (userInfo!=''){
    console.log(userInfo)
    console.log('进行验证')
    wx.switchTab({
      url: '/pages/shiwuzhanshi/shiwuzhanshi',
    })
  }else{
    // 没有信息，再次登录
    console.log('再次登录')
    this.login()
  }
},
  login:(e) =>{
    let that = this;
    console.log(e);
    wx.request({
      url: 'https://www.vergessen.top/lostobj/login',
      data:{
        studentId:e.detail.value.studentId,
        password:e.detail.value.password
      },
      success:(e)=>{
        app.globalData.user = e.data;
        if(e.statusCode === 200){
          wx.setStorageSync('userInfo', e.data)
          // wx.setStorage({
          //   key: "userInfo",
          //   data: e.data
          // })
          wx.switchTab({
            url: '/pages/shiwuzhanshi/shiwuzhanshi',
          })
        }
        if (e.statusCode === 500) {
          wx.showToast({
            title:e.data.message,
            duration:3000,
            icon:'none',
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
      success:  (e)=> {
        console.log(e);
          if (e.statusCode === 201) {
            // console.log('我被执行了');
            wx.showToast({
              title: '注册成功',
              duration: 3000,
              icon: 'success',
            })
            wx.setStorage({
              key: "userInfo",
              data: e.data
            })
          } 
          if (e.statusCode === 500) {
            wx.showToast({
              title:e.data.message,
              duration: 3000,
              icon: 'none',
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
