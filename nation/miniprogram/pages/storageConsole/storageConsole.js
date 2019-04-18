// pages/storageConsole/storageConsole.js

const app = getApp()

Page({

  data: {
    hh:[{
      fileID: '11',
    }],
   
    cloudPath: '',
    imagePath: '',
  },

  onLoad: function (options) {

    const {
      fileID,
      cloudPath,
      imagePath,
    } = app.globalData

    this.setData({
       fileID,
      cloudPath,
      imagePath,
      
    })
    console.log(imagePath)

    // console.group('文件存储文档')
    // console.log('https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/storage.html')
    // console.groupEnd()
  },

})