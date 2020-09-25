// pages/home/home.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    user_type:'无',
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
    var userInfo = wx.getStorageSync('userInfo')
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      });
    }else{
      this.setData({
        userInfo: null
      });
    }
    if (userInfo.user_type=='Admin'){
      this.getTabBar().setData({
        list:[
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
    if (userInfo.user_type == 'User'||(!userInfo)) {
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
        selected: 1 //这个数是，tabBar从左到右的下标，从0开始
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
  onClickLogin:function(){
    
    // var openid = wx.getStorageSync('openid');
    // console.log(openid);
    wx.login({
      success:function(res) {
        wx.request({
          url: 'http://127.0.0.1:8000/api/login/',
          method: "post",
          data:{ code:res.code},
          success:function(response){
            console.log(response.data);
            // jwt 认证
            wx.setStorageSync('session_key', response.data.session_key);
            wx.setStorageSync('openid', response.data.openid);
            wx.setStorageSync('code', res.code);
          }
        })
      },
      fail:function(res){

      },
      complete:function(){

      }
    })

  },
  getUserInfoFunction:function(e){
    console.log(e.detail);
  },
  onClickCall:function(){
    wx.makePhoneCall({
      phoneNumber: '18810927236'
    })
  },
  logout:function(){
    app.logoutUserInfo();
    
    this.setData({userInfo:null});
    wx.reLaunch({
      url: '/pages/home/home',
    })
  },
  saoma:function(){
    var userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      wx.showToast({
        title: '您当前未登陆，请登录！',
        icon: 'none'
      })
      return
    }
    if(userInfo.user_type=="Admin"){
      wx.scanCode({
        success(res) {
          console.log('ssss', res)
          try {
            app.globalData.publish_mould_id = res.result
            wx.switchTab({
              url: '/pages/publish/publish',
            })
          } catch (err) {
            wx.showToast({
              title: '无法正确识别此码',
              icon: 'none'
            })
          }

          // json转数组
          // var data2 = [];            
          // for (let i in dataList) {
          //   let o = {};
          //   o[i] = dataList[i];
          //   data2.push(o)
          // }

        }

      })
    }
    if (userInfo.user_type == "User"){
      wx.scanCode({
        success(res) {
          console.log('ssss', res)
          try {
            let dataList = {
              orderID: res.result.split('&')[0].split('=')[1],
              mouldID: res.result.split('&')[1].split('=')[1],
              mouldname: res.result.split('&')[2].split('=')[1],
              index: res.result.split('&')[3].split('=')[1]
            }
            console.log('4654', dataList)
            wx.navigateTo({
              url: '/pages/mould_detail/mould_detail?' + 'dataList=' + JSON.stringify(dataList),
            })
          } catch (err) {
            wx.showToast({
              title: '无法正确识别此码',
              icon: 'none'
            })
          }
          // json转数组
          // var data2 = [];            
          // for (let i in dataList) {
          //   let o = {};
          //   o[i] = dataList[i];
          //   data2.push(o)
          // }

        }
      })
    }
  }
})