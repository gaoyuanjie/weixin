// pages/index/index.js
// 获取app.js 里头的全部东西
var app = getApp();
// 导入js文件，注意require是导入关键字
var api = require('../../config/api.js')

// 这是所有页面的开始，我一开始就定好规矩，后面不在讲述
// 每一个三角箭头都是跳到下一级页面的，然后得带参数，参数是for循环里头的一些数据以及存在本地全局仓库的数据
// 然后各种页面初始化函数加载，各种xxx，烦死了！！！！！！！！！！！！！

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    maxId: 0,
    minId: 0,
    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['全部订单', '一周内', '一月内', '半年内', '一年内', '更久前'], //下拉列表的数据
    index: 0, //选择的下拉列表下标
    mould_id: "",
    mould_time: "",
    // false隐藏
    filter_show: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 去数据库获取最新的数据
    this.setData({
      orderList: [],
    })
    var userInfo = wx.getStorageSync('userInfo')
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    });
    if (!userInfo) {
      wx.showToast({
        title: '您当前未登陆，请登录！',
        icon: 'none',
      })
      setTimeout(function() {
        wx.reLaunch({
          url: '/pages/home/home',
        })
      }, 1500)
    } else {
      wx.request({
        url: api.Order,
        method: 'GET',
        header: {
          Authorization: app.globalData.userInfo ? app.globalData.userInfo.token : null
        },
        dataType: 'json',
        data: {
          username: userInfo.username,
          token_type: userInfo.token_type
        },
        responseType: 'text',
        success: (res) => {
          console.log('111', res.data)
          // 返回的数据是数组时（对应python的列表），这个res.data.length才有意义！
          // console.log('111', res.data.length)
          if(!res.data.success){
            // 这里的状态码太少了！
            wx.showToast({
              title: res.data.message,
              icon: 'none'
            })
            console.log(this.data.filter_show)
            setTimeout(function () {
              wx.reLaunch({
                url: '/pages/home/home',
              })
            }, 1500)
            return
          }
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].createTime = res.data.data[i].createTime.split('T')[0]
          }
          this.setData({
            orderList: res.data.data,
            filter_show: !this.data.filter_show,
            // maxId: res.data[0].id,
            // minId: res.data[res.data.length - 1].id
          })
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    }
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
    var userInfo = wx.getStorageSync('userInfo')
    if (userInfo.user_type == 'User' || (!userInfo)) {
      console.log('rqwr')
      this.getTabBar().setData({
        list: [
          {
            "pagePath": "/pages/index/index",
            "text": "订单列表",
            "iconPath": "/static/images/tabbar/ic_menu_choice_nor.png",
            "selectedIconPath": "/static/images/tabbar/ic_menu_choice_pressed.png"
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
    // var userInfo = wx.getStorageSync('userInfo')
    // wx.request({
    //   url: api.Mould_list,
    //   header: {
    //     Authorization: app.globalData.userInfo ? app.globalData.userInfo.token : null
    //   },
    //   data: {
    //     username: userInfo.username,
    //     max_id: this.data.maxId
    //   },
    //   method: 'GET',
    //   dataType: 'json',
    //   responseType: 'text',
    //   success: (res) => {
    //     if (!res.data.length) {
    //       wx.showToast({
    //         title: '已是最新数据',
    //         icon: 'none'
    //       })
    //       wx.stopPullDownRefresh()
    //       return
    //     }
    //     var dataList = res.data.reverse();
    //     this.setData({
    //       mouldList: dataList.concat(this.data.mouldList),
    //       maxId: dataList[0].id
    //     })
    //     console.log('新数据', res.data)
    //     wx.stopPullDownRefresh()
    //   }
    // })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // var userInfo = wx.getStorageSync('userInfo')
    // wx.request({
    //   url: api.Mould_list,
    //   header: {
    //     Authorization: app.globalData.userInfo ? app.globalData.userInfo.token : null
    //   },
    //   data: {
    //     username: userInfo.username,
    //     min_id: this.data.minId
    //   },
    //   method: 'GET',
    //   dataType: 'json',
    //   responseType: 'text',
    //   success: (res) => {
    //     if (!res.data.length) {
    //       wx.showToast({
    //         title: '已到底部',
    //         icon: 'none'
    //       })
    //       return
    //     }
    //     console.log('旧数据', res.data)
    //     this.setData({
    //       mouldList: this.data.mouldList.concat(res.data),
    //       minId: res.data[res.data.length - 1].id
    //     })
    //     console.log(this.data.minId)
    //   }
    // })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
  },
  searchbytime: function(e){ 
    var userInfo = wx.getStorageSync('userInfo')  
    wx.request({
      url: api.Order,
      method: 'GET',
      header: {
        Authorization: app.globalData.userInfo ? app.globalData.userInfo.token : null
      },
      dataType: 'json',
      data: {
        username: userInfo.username,
        token_type: userInfo.token_type,
        time_option: e.currentTarget.dataset.index      
      },
      responseType: 'text',
      success: (res) => {
        if(!res.data.length){
          console.log('ok')
          this.setData({
            orderList:[],
          })
        }
        this.setData({
          orderList: res.data,
        })
        console.log('443',this.data.orderList)
      },
    })
  },
  mould_info:function(e){
    var userInfo = wx.getStorageSync('userInfo')
    let dataList = {
      orderID: e.currentTarget.dataset.orderid,
      ordername: e.currentTarget.dataset.ordername
    }
    wx.navigateTo({
      url: '/pages/mould_list/mould_list?' + 'dataList=' + JSON.stringify(dataList),
    })
    // wx.request({
    //   url: api.Mould_list,
    //   header: {
    //     Authorization: app.globalData.userInfo ? app.globalData.userInfo.token : null
    //   },
    //   dataType: 'json',
    //   data: {
    //     username: userInfo.username,
    //     user_type: userInfo.user_type,
    //     orderID: e.currentTarget.dataset.orderid
    //   },
    //   method: 'GET',
    //   dataType: 'json',
    //   responseType: 'text',
    //   success: (res) => {
    //   }
    // })
  }
})