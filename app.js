//app.js
App({
  serverUrl: "https://www.takeithome.top/lost/",
  tokenUrl:"https://www.takeithome.top/lost/sys/accessToken",
  textUrl:"https://api.weixin.qq.com/wxa/msg_sec_check?access_token=",
  imgUrl:"https://api.weixin.qq.com/wxa/img_sec_check?access_token=",
  globalData: {
    newlist: [],
    id: [],
    user: [],
    access_token:''
  },
  globalData: {
    userInfo: null
  }
})