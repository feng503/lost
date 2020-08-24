import mqtt from '../../../utils/mqtt.min.js';

//连接的服务器域名，注意格式！！！
const host = 'wxs://ks6v47h.mqtt.iot.gz.baidubce.com/mqtt';
Page({
  data: {
    qRCodeMsg: '',
    client: null,
    //记录重连的次数
    reconnectCounts: 0,
    //MQTT连接的配置
    options: {
      protocolVersion: 4, //MQTT连接协议版本
      clientId: 'DeviceId-d6xc2mepy3',
      clean: true,
      password: '9apSXOrCKeo34RxE',
      username: 'ks6v47h/dreamer',
      reconnectPeriod: 1000, //1000毫秒，两次重新连接之间的间隔
      connectTimeout: 30 * 1000, //1000毫秒，两次重新连接之间的间隔
      resubscribe: true //如果连接断开并重新连接，则会再次自动订阅已订阅的主题（默认true）
    }
  },
  onClick_connect: function () {

    var that = this;
    //开始连接
    this.data.client = mqtt.connect(host, this.data.options);
    this.data.client.on('connect', function (connack) {
      wx.showToast({
        title: '连接成功'
      })
    })


    //服务器下发消息的回调
    that.data.client.on("message", function (topic, payload) {
      console.log(" 收到 topic:" + topic + " , payload :" + payload)
      wx.showModal({
        content: " 收到topic:[" + topic + "], payload :[" + payload + "]",
        showCancel: false,
      });
      let obj = JSON.parse(payload)
      console.log("指令" + obj.change)
      console.log("指令" + obj.value)
    })



    //服务器连接异常的回调
    that.data.client.on("error", function (error) {
      console.log(" 服务器 error 的回调" + error)
    })

    //服务器重连连接异常的回调
    that.data.client.on("reconnect", function () {
      console.log(" 服务器 reconnect的回调")
    })


    //服务器连接异常的回调
    that.data.client.on("offline", function (errr) {
      console.log(" 服务器offline的回调")
    })


  },
  onClick_SubOne: function () {
    if (this.data.client && this.data.client.connected) {
      //仅订阅单个主题
      this.data.client.subscribe('/light/deviceOut', function (err, granted) {
        if (!err) {
          wx.showToast({
            title: '订阅主题成功'
          })
        } else {
          wx.showToast({
            title: '订阅主题失败',
            icon: 'fail',
            duration: 2000
          })
        }
      })
    } else {
      wx.showToast({
        title: '请先连接服务器',
        icon: 'none',
        duration: 2000
      })
    }
  },
  onClick_SubMany: function () {

    if (this.data.client && this.data.client.connected) {
      //仅订阅多个主题
      this.data.client.subscribe({
        'Topic1': {
          qos: 0
        },
        'Topic2': {
          qos: 1
        }
      }, function (err, granted) {
        if (!err) {
          wx.showToast({
            title: '订阅多主题成功'
          })
        } else {
          wx.showToast({
            title: '订阅多主题失败',
            icon: 'fail',
            duration: 2000
          })
        }
      })
    } else {
      wx.showToast({
        title: '请先连接服务器',
        icon: 'none',
        duration: 2000
      })
    }
  },
  onClick_PubMsg: function () {
    console.log("我被执行了");
    let sendData = {
      code: this.data.qRCodeMsg
    }
    if (this.data.client && this.data.client.connected) {
      this.data.client.publish('/light/deviceIn', JSON.stringify(sendData));
      wx.showModal({
        title: '取物箱密码为：',
        content: this.data.qRCodeMsg.substring(1, 5), //取字符串中间几个
        showCancel: false,
      })
    } else {
      wx.showToast({
        title: '请先连接服务器',
        icon: 'none',
        duration: 2000
      })
    }
  },
  onClick_unSubOne: function () {
    if (this.data.client && this.data.client.connected) {
      this.data.client.unsubscribe('Topic1');
    } else {
      wx.showToast({
        title: '请先连接服务器',
        icon: 'none',
        duration: 2000
      })
    }
  },
  onClick_unSubMany: function () {
    if (this.data.client && this.data.client.connected) {
      this.data.client.unsubscribe(['Topic1', 'Topic2']);
    } else {
      wx.showToast({
        title: '请先连接服务器',
        icon: 'none',
        duration: 2000
      })
    }
  },

  onLoad: function () {
    // wx.setNavigationBarTitle({
    //   title: '扫一扫使用失物箱'
    // })
  },
  getQRCode: function (options) {
    var that = this;
    wx.scanCode({        //扫描API
      success: function (res) {
        console.log(res.result);    //输出回调信息
        that.setData({
          qRCodeMsg: res.result
        });
        that.onClick_PubMsg();

      }
    })
  },
})