// pages/index/index.js
var app = getApp();
var api = require('../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mouldList: [],
    maxId: 0,
    minId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // // 去数据库获取最新的10条数据
    // var userInfo = wx.getStorageSync('userInfo')
    // if (!userInfo) {
    //   wx.navigateTo({
    //     url: '/pages/login/login',
    //   })
    // }
    // else{
    //   wx.request({
    //     url: api.Mould_list,
    //     method: 'GET',
    //     dataType: 'json',
    //     responseType: 'text',
    //     success: (res) => {
    //       console.log(res.data)
    //       console.log(!res.data)
    //       if (!res.data.length) {
    //         wx.showToast({
    //           title: '没数据！',
    //           icon: 'none'
    //         })
    //         return
    //       }
    //       this.setData({
    //         mouldList: res.data,
    //         maxId: res.data[0].id,
    //         minId: res.data[res.data.length - 1].id
    //       })
    //     },
    //     fail: function (res) { },
    //     complete: function (res) { },
    //   })
    // }
 
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
    // 去数据库获取最新的8条数据
    this.setData({
      mouldList: [],
      maxId: 0,
      minId: 0
    })

    var userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      // wx.redirectTo({
      //   url: '/pages/login/login',
      // })
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
    else {
      
      wx.request({
        url: api.Mould_list,
        method: 'GET',
        data:{email:userInfo.email},
        dataType: 'json',
        responseType: 'text',
        success: (res) => {
          console.log(res.data)
          console.log(!res.data)
          if (!res.data.length) {
            wx.showToast({
              title: '没数据！',
              icon: 'none'
            })
            return
          }
          this.setData({
            mouldList: res.data,
            maxId: res.data[0].id,
            minId: res.data[res.data.length - 1].id
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }

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
    var userInfo = wx.getStorageSync('userInfo')
    wx.request({
      url: api.Mould_list,
      data: {
        email:userInfo.email,
        max_id: this.data.maxId
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {

        if (!res.data.length) {
          wx.showToast({
            title: '已是最新数据',
            icon: 'none'
          })
          wx.stopPullDownRefresh()
          return
        }
        var dataList = res.data.reverse();
        this.setData({
          mouldList: dataList.concat(this.data.mouldList),
          maxId: dataList[0].id
        })
        wx.stopPullDownRefresh()
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var userInfo = wx.getStorageSync('userInfo')
    wx.request({
      url: api.Mould_list,
      data: {
        email: userInfo.email,
        min_id: this.data.minId
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        if (!res.data.length) {
          wx.showToast({
            title: '已到底部',
            icon: 'none'
          })
          return
        }
        this.setData({
          mouldList: this.data.mouldList.concat(res.data),
          minId: res.data[res.data.length - 1].id
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})