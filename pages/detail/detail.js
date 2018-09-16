 // pages/detail/detail.js
import { fetch } from "../../utils/util.js"

Page({
  /**
   * 页面的初始数据
   */
  data: {
  bookId:"",
  booKData:{},
  isLoading: false
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
    this.setData({
      isLoading: true
    })
    fetch.get(`/book/${this.data.bookId}`).then(res=>{
      this.setData({
        bookData:res,
        isLoading: false
      })
    }).catch(err => {
      isLoading: false
    })
  },
  //定义跳转的方法
  jumpCatalog(){
    wx.navigateTo({
      url: `/pages/catalog/catalog?id=${this.data.bookId}`,
    })
  },
  //设置收藏方法
  onColletionTap() {
    fetch.post('/collection',{
      bookId:this.data.bookId
    }).then(res=>{
      if(res.code == 200){
        wx.showToast({
          title: '收藏成功',
          duration:1000
        })
        let bookData = {...this.data.bookData}
        bookData.isCollect = 1;
        this.setData({
          bookData:bookData
        })
      }
    })
  },

  onShareAppMessage(){
    return{
      title:this.data.bookData.data.title,
      path:`/pages/detail/detail?id=${this.data.bookId}`,
      imageUrl:this.data.bookData.data.img
    }
  }
  
})