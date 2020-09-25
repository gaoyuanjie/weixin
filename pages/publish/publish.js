// pages/publish/publish.js

// 获取app.js 里头的全部东西
var app = getApp();
// 导入js文件，注意require是导入关键字
var api = require('../../config/api.js')
var userInfo = wx.getStorageSync('userInfo')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // MJ202007052005030002
    MouldID: '',
    UserID: userInfo.username,
    RepairName:"",
    MaintenanceRecord:"",
    ErrorRecord:"",
    RetirementTime:"",
    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    partData: [{partID:'',partName:''}], //下拉列表的数据
    index: 0, //选择的下拉列表下标
  },
  bindMouldID: function (e) {
    var that = this
    this.setData({
      MouldID: e.detail.value
    });
    wx.request({
      url: api.Mould_error,
      method: 'get',
      header: {
        Authorization: app.globalData.userInfo ? app.globalData.userInfo.token : null
      },
      dataType: 'json',
      data: {
        username: userInfo.username,
        token_type: userInfo.token_type,
        MouldID: this.data.MouldID,
      },
      responseType: 'text',
      success: (res) => {
        if (res.data.success) {
          that.setData({
            partData: res.data.data
          })
        }else{
          if (!e.detail.value.length) {
            this.setData({
              partData: [{ partID: '', partName: '' }]
            })
          }else{
            that.setData({
              partData: [{ partID: '', partName: '无此模具ID对应的零件信息' }]
            })
          }
        }
      },
    })
  },
  bindUserID: function (e) {
    this.setData({
      UserID: e.detail.value
    });
  },
  bindRepairName: function (e) {
    this.setData({
      RepairName: e.detail.value
    });
  },
  bindMaintenanceRecord: function (e) {
    this.setData({
      MaintenanceRecord: e.detail.value
    });
  },
  bindErrorRecord: function (e) {
    this.setData({
      ErrorRecord: e.detail.value
    });
  },
  bindRetirementTime: function (e) {
    this.setData({
      RetirementTime: e.detail.value
    });
  },


  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  
  optionTap(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    });
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
    this.setData({
      MouldID: app.globalData.publish_mould_id
    })
    console.log('MouldID', this.data.MouldID)
    var userInfo = app.globalData.userInfo
    var that = this
    wx.request({
      url: api.Mould_error,
      method: 'get',
      header: {
        Authorization: app.globalData.userInfo ? app.globalData.userInfo.token : null
      },
      dataType: 'json',
      data: {
        username: userInfo.username,
        token_type: userInfo.token_type,
        MouldID: this.data.MouldID,
      },
      responseType: 'text',
      success: (res) => {
        if (res.data.success) {
          that.setData({
            partData: res.data.data
          })
        } else {
          if (!e.detail.value.length) {
            this.setData({
              partData: [{ partID: '', partName: '' }]
            })
          } else {
            that.setData({
              partData: [{ partID: '', partName: '无此模具ID对应的零件信息' }]
            })
          }
        }
      },
    })


    var userInfo = wx.getStorageSync('userInfo')
    if (userInfo.user_type == 'Admin') {
      this.getTabBar().setData({
        list: [
          {
            "pagePath": "/pages/publish/publish",
            "text": "添加维修信息",
            "iconPath": "/static/images/tabbar/ic_menu_sort_nor.png",
            "selectedIconPath": "/static/images/tabbar/ic_menu_sort_pressed.png"
          },
          {
            "pagePath": "/pages/home/home",
            "text": "我的",
            "iconPath": "/static/images/tabbar/ic_menu_me_nor.png",
            "selectedIconPath": "/static/images/tabbar/ic_menu_me_pressed.png"
          }
        ]
      })
    }
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0 //这个数是，tabBar从左到右的下标，从0开始
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

  bindCommit:function(){
    var userInfo = wx.getStorageSync('userInfo')
    var that = this
    console.log('?', this.data.MaintenanceRecord)
    wx.request({
      url: api.Mould_error,
      method: 'post',
      header: {
        Authorization: app.globalData.userInfo ? app.globalData.userInfo.token : null
      },
      dataType: 'json',
      data: {
        username: userInfo.username,
        token_type: userInfo.token_type,
        MouldID: that.data.MouldID,
        PartID: that.data.partData[that.data.index].partID,
        UserID: that.data.UserID,
        RepairName: that.data.RepairName,
        MaintenanceRecord: that.data.MaintenanceRecord,
        ErrorRecord: that.data.ErrorRecord,
        RetirementTime: that.data.RetirementTime
      },
      responseType: 'text',
      success: (res) => {
        console.log(res)
        if(res.data.success){
          wx.showToast({
            title: '提交成功',
          })
        }else{
          wx.showToast({
            title: '提交失败',
            icon:'none'
          })
        }
        wx.switchTab({
          url: '/pages/publish/publish',
        })
  
      },

    })
  }
})