// pages/login/login.js

var app = getApp();

var api = require('../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    email: "975934321@qq.com",
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
  /** 
   * 点击获取短信验证码
   */
  onClickCheckCode: function (e) {
    // 判断邮箱格式是否正确
    if (!this.data.email.length) {
      wx.showToast({
        title: '请填写邮箱',
        icon: 'none'
      })
      return
    }
    var myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
    if (!myReg.test(this.data.email)) {
      wx.showToast({
        title: '邮箱格式不对',
        icon: 'none'
      })
      return
    }
    wx.request({
      url: api.MsgCode,
      data: {
       email: this.data.phone
      },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      }
    })

  },
  onClickSubmit: function (e) {
    // 判断邮箱格式是否正确
    if (!this.data.email.length) {
      wx.showToast({
        title: '请填写邮箱',
        icon: 'none'
      })
      return
    }
    var myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
    if (!myReg.test(this.data.email)) {
      wx.showToast({
        title: '邮箱格式不对',
        icon: 'none'
      })
      return
    }
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
        email: this.data.email,
        password: this.data.password
      },
      method: 'POST',
      success: function (res) {
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
      email: e.detail.value
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