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
    var info = {
      nickName: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl,
      token: tokenInfo.token,
      email: tokenInfo.email,
      user_type:tokenInfo.user_type
    };
    this.globalData.userInfo = info
    wx.setStorageSync('userInfo', info);
  },
  logoutUserInfo:function(){
    wx.removeStorageSync('userInfo');
    this.globalData.userInfo=null;
  }
})