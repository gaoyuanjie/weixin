// pages/mould_detail/mould_detail.js

// 获取app.js 里头的全部东西
var app = getApp();
// 导入js文件，注意require是导入关键字
var api = require('../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mould_weixiu: [],
    mould_zhizao: [],
    mouldname:'',
    currtab: 0,
    swipertab: [{ name: '模具制造信息', index: 0 }, { name: '模具维护信息', index: 1 }],
    focus: false,
    inputValue: '',
    list: {},
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 接收那边传过来的参数
    let list = JSON.parse(options.dataList)
    // 拿全局仓库的数据
    var userInfo = wx.getStorageSync('userInfo')
    let that = this
    console.log('list.index',list.index)
    // console.log(list.mouldID)
    // console.log(list.mouldname)
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight-1,
          clientHeight2: res.windowHeight
        });
      }
    })
    wx.request({
      url: api.Mould_detail,
      data: {
        username: userInfo.username,
        token_type: userInfo.token_type,
        mouldID: list.mouldID
      },
      header: {
        Authorization: app.globalData.userInfo ? app.globalData.userInfo.token : null
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log('weixiuxinxi', res)
        if (!res.data.success) {
          wx.showToast({
            title: '获取数据失败，检查是否登录超时',
            icon: 'none'
          })
          setTimeout(function() {
            wx.navigateBack({

            })
          }, 1500)
        }
        that.setData({
          mould_weixiu: res.data.data,
          mouldname: list.mouldname
        })
        console.log('mould_weixiu: ', that.data.mould_weixiu)
        console.log('mouldname: ', that.data.mouldname)
      },
    })
    console.log('list.orderID',list.orderID)
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
      success: function (res) {
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
        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].createTime = res.data.data[i].createTime.split(' ')[0]
        }
        that.setData({
          mould_zhizao: [res.data.data[list.index]],
          ordername: list.ordername
        })
        console.log('mould_zhizao:', that.data.mould_zhizao)
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
 // * 选项卡点击切换
 tabSwitch: function (e) {
  var that = this
  if (this.data.currtab === e.target.dataset.current) {
    return false
  } else {
    that.setData({
      currtab: e.target.dataset.current
    })
  }
},
/**/ 

bindButtonTap: function () {
  this.setData({
  focus: true
 })
},

/**/ 
tabChange: function (e) {

},

orderShow: function () {
  let that = this
  switch (this.data.currtab) {
    case 0:
      that.mfinfor()
      break
    case 1:
      that.fixinfor()
      break
  }
},
mfinfor: function(){
  this.setData({
    mould_weixiu: res.data.data,
    mould_zhizao: [res.data.data[list.index]],
    ordername: list.ordername,
  })
},
fixinfor: function(){
  this.setData({
    mould_weixiu: res.data.data,
    mould_zhizao: [res.data.data[list.index]],
    ordername: list.ordername
  })
},
/*切换栏动态*/
})