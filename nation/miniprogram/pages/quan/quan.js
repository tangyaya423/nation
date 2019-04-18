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
    show:true,
    quan_data: '',
    pics:[],
    show_comment:false,
    cmt_name:'',
    cmt_con:''
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
    // console.log(event.currentTarget.dataset.index)
    var index = event.currentTarget.dataset.index;
    for (let i in zandata) {
      if (i == index) { //根据下标找到目标
        if (zandata[i].zanst == 1) { //如果是没点赞+1
          zandata[i].zanst = 0;
        } else {
          zandata[i].zanst = 1
        }
        wx.showToast({
          title: zandata[i].zanst == 1 ? '点赞成功' : '取消点赞'
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
        if (data[i].like == 1) {
          data[i].like = 0;
        } else {
          data[i].like = 1
        }
        wx.showToast({
          title: data[i].like == 1 ? '收藏成功' : '取消收藏'
        })
      }
    }
    that.setData({
      quan_data: data

    })
  },

  //浏览图片
  previewImage: function (e) {
    var that = this;
    var arry=[];
    var dataid = e.currentTarget.dataset.index;
   var pics = that.data.pics;
    wx.previewImage({
      current: pics[dataid], // 当前显示图片的http链接
      urls: pics // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取数据库数据
    var that = this;
    var arry = [];

    const data = quandata.orderBy('time', 'desc').get({
      success: res => {
          that.setData({
            quan_data: res.data,
            pimg_id: res.data.length
          })
        console.log(res.data.length)
        //将图片路径存放在数组里备用
         for (var i = 0; i < res.data.length; i++){
           arry.push(res.data[i].mpic) //用该方法网数组里面添值
           }
           that.setData({
             pics:arry
           })

      }
    })
   
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              app.globalData.userpic = res.userInfo.avatarUrl,
              app.globalData.username = res.userInfo.nickName,
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
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

  comment:function(e){
    // var show = this.data.show_comment;
    var cont = e.detail.value;
      console.log(cont)
    var cmt_con = this.data.cmt_con
    cmt_con.push(cont)

    this.setData({
        // show_comment:true,
      

    })
  },

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

