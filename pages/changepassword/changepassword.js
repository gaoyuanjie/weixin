// pages/changepassword/changepassword.js

var app = getApp();

var api = require('../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    email: "975934321@qq.com",
    password1:"",
    password2:"",
    code: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      email:options.email
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

  },
  /** 
   * 点击获取短信验证码
   */
  onClickCheckCode: function (e) {
    // 判断邮箱格式是否正确
    console.log(this.data.email)
    if (this.data.email.length == 0) {
      wx.showToast({
        title: '请填写邮箱',
        icon: 'none'
      })
      return
    }
    if (this.data.password1 != this.data.password2) {
      wx.showToast({
        title: '两次输入密码不一致',
        icon: 'none'
      })
      return
    }
    wx.request({
      url: api.MsgCode,
      data: {
        change: '1',
        email: this.data.email
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
    if(this.data.password1!=this.data.password2){
      wx.showToast({
        title: '两次输入密码不一致',
        icon: 'none',
        
      })
      return
    }
    wx.request({
      url: api.Change,
      data: {
        email: this.data.email,
        password: this.data.password1,
        code: this.data.code,
      },
      method: 'POST',
      success: function (res) {
        if (res.data.status) {
          var timeOut = setTimeout(function(){
            wx.showToast({
              title: '修改密码成功！',
              icon: 'none',
            })
          })
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
  bindCodeInput: function (e) {
    this.setData({
      code: e.detail.value
    });
  },
  bindPasswordInput1: function (e) {
    this.setData({
      password1: e.detail.value
    });
  },
  bindPasswordInput2: function (e) {
    this.setData({
      password2: e.detail.value
    });
  }
})