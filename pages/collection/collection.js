// pages/collection/collection.js
import {
  fetch
} from '../../utils/util.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    
    isLoading: false
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData()

  },
  getData() {
    this.setData({
      isLoading: true
    })
    fetch.get(`/collection`).then(res => {
      let read = res.data
      // console.log(read)
      this.setData({
        books: read,
        isLoading: false,  
      })
    }).catch(err=>{
      this.setData({
        isLoading: false
      })
    })

  },
  jumpBook(event) {
    const id = event.currentTarget.dataset.id
    // console.log(id)
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  },
  // //设置删除收藏方法
  deleteCollection(e) {
    // console.log(e)
    let id = e.currentTarget.dataset.id;
    let books = this.data.books.filter((item) => {
      return item._id !== id
    })
    let that = this;
    wx.showModal({
      title: '提示',
      content: '是否删除书籍',
      success: function(res) {
        if (res.confirm) {
          fetch.delete(`/collection/${id}`).then(res => {
            wx.showToast({
              title: '删除成功'
            })
            fetch.get('/collection').then(res => {
              // console.log(res)
              that.setData({
                books: res.data
              })
            })

          })
        } else if (res.cancel) {
          console.log('用户点击取消了');
          return false; 
        }
      }
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
    wx.switchTab({
      url: '/pages/collection/collection'
    })
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
    fetch.get('/collection').then(res => {
      // console.log(res)
      this.setData({
        books: res.data
      })
    })
    wx.stopPullDownRefresh()
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

  }
})