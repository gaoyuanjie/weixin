//app.js

App({
  onLaunch: function() {
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.globalData.userInfo = userInfo;
    }
  },
  globalData: {
    userInfo: null,
    tabbar_list: [
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
      },
    ],
    publish_mould_id: null,
  },
 
  initUserInfo: function(tokenInfo, userInfo) {
    console.log('rinidaba',tokenInfo)
    console.log('rinidaba', userInfo)
    var info = {
      nickName: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl,
      token: tokenInfo.access_token,
      order_count: tokenInfo.order_count,
      username: tokenInfo.username,
      user_type: tokenInfo.user_type,
      token_type: tokenInfo.token_type
    };
    this.globalData.userInfo = info
    wx.setStorageSync('userInfo', info);
    if (tokenInfo.user_type=="Admin"){
      console.log('333333333333333333333')
      this.globalData.tabbar_list = [
        {
          "pagePath": "/pages/publish/publish",
          "text": "添加维修信息",
          "iconPath": "/static/images/tabbar/ic_menu_sort_nor.png",
          "selectedIconPath": "/static/images/tabbar/ic_menu_sort_pressed.png.png"
        },
        {
          "pagePath": "/pages/home/home",
          "text": "我的",
          "iconPath": "/static/images/tabbar/ic_menu_me_nor.png",
          "selectedIconPath": "/static/images/tabbar/ic_menu_me_pressed.png"
        }
      ]
    }
    console.log(this.globalData.tabbar_list)
    wx.redirectTo({
      url: '/',
    })
  },
  logoutUserInfo:function(){
    wx.removeStorageSync('userInfo');
    this.globalData.userInfo=null;
  },
  
})