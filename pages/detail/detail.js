// pages/detail/detail.js
import { fetch } from "../../utils/util.js"

Page({
  /**
   * 页面的初始数据
   */
  data: {
  bookId:"",
  booKData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log(options)
  this.setData({
    bookId:options.id
  })
  this.getData()
  },
  getData(){
    fetch.get(`/book/${this.data.bookId}`).then(res=>{
      console.log(res)
      this.setData({
        bookData:res
      })
    })
  },
  //定义跳转的方法
  jumpCatalog(){
    wx.navigateTo({
      url: `/pages/catalog/catalog?id=${this.data.bookId}`,
    })
  }
  
})