//app.js

App({
  onLaunch: function() {
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.globalData.userInfo = userInfo;
    }
  },
  globalData: {
    userInfo: null
  },
  initUserInfo: function(tokenInfo, userInfo) {
    console.log('rinidaba',tokenInfo)
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
  },
  logoutUserInfo:function(){
    wx.removeStorageSync('userInfo');
    this.globalData.userInfo=null;
  }
})