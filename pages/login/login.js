// pages/login/login.js

var app = getApp();

var api = require('../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "MCS-P001",
    password: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },  
  onClickSubmit: function (e) {
    if (!this.data.password.length) {
      wx.showToast({
        title: '请填写密码',
        icon: 'none'
      })
      return
    }
    wx.request({
      url: api.Login,
      data: {
        username: this.data.username,
        password: this.data.password
      },
      method: 'POST',
      success: function (res) {
        console.log('111',res)
        console.log(e.detail.userInfo)
        if (res.data.status) {
          app.initUserInfo(res.data.data, e.detail.userInfo);
          wx.navigateBack();
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        }
      }
    })
  },
  bindEmailInput: function (e) {
    this.setData({
      username: e.detail.value
    });
  },
  bindPasswordInput: function (e) {
    this.setData({
      password: e.detail.value
    });
  },
  
  bindForgetPassword: function (e) {
    wx.navigateTo({
      url: '/pages/changepassword/changepassword' + '?email=' + this.data.email,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})