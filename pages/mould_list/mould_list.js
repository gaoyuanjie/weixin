// pages/mould_list/mould_list.js
// 获取app.js 里头的全部东西
var app = getApp();
// 导入js文件，注意require是导入关键字
var api = require('../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mould_list: [],
    ordername:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let list = JSON.parse(options.dataList)
    var userInfo = wx.getStorageSync('userInfo')
    let that=this
    wx.request({
      url: api.Mould_list,
      data: {
        username: userInfo.username,
        token_type: userInfo.token_type,
        orderID: list.orderID
      },
      header: {
        Authorization: app.globalData.userInfo ? app.globalData.userInfo.token : null
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        if (!res.data.success) {
          wx.showToast({
            title: '获取数据失败',
            icon: 'none'
          })
          setTimeout(function () {
            wx.navigateBack({

            })
          }, 1500)
        }
        that.setData({
          mould_list: res.data.data,
          ordername:list.ordername
        })
        console.log('mould_list: ',that.data.mould_list)
        console.log('ordername: ', that.data.ordername)
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  mould_info: function (e) {
    var userInfo = wx.getStorageSync('userInfo')
    console.log('7777',e.currentTarget.dataset.mouldid, e.currentTarget.dataset.mouldname)
    let dataList = {
      mouldID: e.currentTarget.dataset.mouldid,
      mouldname: e.currentTarget.dataset.mouldname
    }
    wx.navigateTo({
      url: '/pages/mould_detail/mould_detail?' + 'dataList=' + JSON.stringify(dataList),
    })
  }
})