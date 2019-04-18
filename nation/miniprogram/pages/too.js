var util = require('../../utils/util.js');
//云数据库初始化
const db = wx.cloud.database()
const quandata = db.collection('quan_data')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    quan_data: ''
  },



  ToPublish: function (event) {
    wx.navigateTo({
      url: '../publish/publish',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },


  // 点赞
  select_zan: function (event) {
    var that = this;
    var zandata = that.data.quan_data;
    var index = event.currentTarget.dataset.index;
    for (let i in zandata) {
      if (i == index) { //根据下标找到目标
        if (zandata[i].zanst == 0) { //如果是没点赞+1
          zandata[i].zanst = 1;
        } else {
          zandata[i].zanst = 0
        }
        wx.showToast({
          title: zandata[i].zanst == 0 ? '点赞成功' : '取消点赞'
        })
      }
    }
    that.setData({
      quan_data: zandata

    })
  },

  // 收藏
  select: function (event) {
    var that = this;
    var data = that.data.quan_data;
    var index = event.currentTarget.dataset.index;
    for (let i in data) {
      if (i == index) { //根据下标找到目标
        if (data[i].like == 0) {
          data[i].like = 1;
        } else {
          data[i].like = 0
        }
        wx.showToast({
          title: data[i].like == 0 ? '收藏成功' : '取消收藏'
        })
      }
    }
    that.setData({
      quan_data: data

    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // var that=this;
    // const {
    //   filePath_p,
    // } = app.globalData
    // console.log("这是"+filePath_p)
    // that.setData({
    //   mpic: app.globalData.filePath_p
    // })

    // 获取数据库数据
    quandata.get({
      success: res => {
        console.log(res.data)
        console.log(this)
        this.setData({
          quan_data: res.data
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
                // userNickName: res.userNickName
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
      })
    }
  },




  // var time = util.formatTime(new Date())
  // //为页面中time赋值
  // this.setData({
  //   time: time
  // })
  // //打印
  // console.log(time)


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

