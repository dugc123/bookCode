// pages/study/study.js
import { fetch } from '../../utils/util.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    readList:"",
    isLoading:false,
    showText:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
    // console.log(options)
  },

  getData() {
    this.setData({
      isLoading: true
    })
    fetch.get(`/readList`).then(res => {
     let  p="";
     let  read= res.data

     for(let i = 0;i<read.length;i++){
       let a = read[i].title.index + 1;
       let b = read[i].title.total;
       p = (a/b)*100;
       read[i].p = p.toFixed(1);
     }
      // console.log(read)
      this.setData({
        readList: read,
        isLoading: false,
        showText: true
      })
    }).catch((err)=>{
      this.setData({
        isLoading: false,
        showText: false
      })
    })
  },
  jumpBook(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  },
 
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    fetch.get('/collection').then(res => {
      console.log(res)
      this.setData({
        books: res.data
      })
    })
    wx.stopPullDownRefresh()
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