// pages/user/user.js
import { fetch } from "../../utils/util.js"

Page({
  /**
   * 页面的初始数据*/
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    books:"",
    isLoading: false,
    showText:true
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getData()
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                canIUse:false,
                showText: false
              })
            }
          });
        }
      }
    }) 
  },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      that.setData({
        canIUse: false,
        showText: false
      })
      //授权成功后，跳转进入小程序首页
      wx.switchTab({
        url: '/pages/index/index'
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
 getData(){
   this.setData({
     isLoading: true
   })
   fetch.get('/collection/total').then((res)=>{
     this.setData({
       books:res,
       isLoading:false
     })
   }).catch(err=>{
     this.setData({
       isLoading: false
     })
   })
 },
  hadleCollection(){
    wx.navigateTo({
      url: '/pages/collection/collection',
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    fetch.get('/collection/total').then(res => {
      // console.log(res)
      this.setData({
        books: res
      })
    })
    wx.stopPullDownRefresh()
  },
  onShow: function () {
    this.getData()
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
  
  }
})
