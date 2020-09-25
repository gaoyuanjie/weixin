// 获取app.js 里头的全部东西
var app = getApp();
Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: []
  },
  lifetimes: {
    //组件的生命周期函数
    attached() {
      this.setData({
        list: app.globalData.tabbar_list
      })
    },
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      console.log(url)
      wx.switchTab({
        url
      })
      this.setData({
        selected: data.index
      })
    }  
  }
})