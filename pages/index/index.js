
import {fetch} from '../../utils/util.js'
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperData: [],
    mainContent:[],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    isLoading: false
  },

  onLoad(){
    this.getData()
    this.getContent()
  },

  // 轮播图数据
  getData() {
    this.setData({
      isLoading:true
    })
    fetch.get('/swiper').then(res=>{
      this.setData({
        swiperData: res.data,
        isLoading: false
      })
    }).catch(err => {
      isLoading: false
    })
  },
  //首页图书数据
  getContent(){
    fetch.get('/category/books').then(res=>{
      // console.log(res)
      this.setData({
        mainContent:res.data
      })
    })
  },
  jumpBook(event){
    const id = event.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  },
  
})