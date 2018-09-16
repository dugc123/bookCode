import { fetch, login} from '../../utils/util.js'
const app = getApp();
Page({
  /** 页面的初始数据*/
  data: {
    swiperData: [],
    mainContent:[],
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 1000,
    isLoading: false,
    pn:1,
    hasMore:true,//上拉是否有数据
    loadDone:false
  },
  onLoad(){
    login()
    Promise.all([this.getData(), this.getContent()]).then(() => {
      this.setData({
        hasMore: true,
        pn: 1,
        loadDone:true
      })
    })
  },

  // 轮播图数据
  getData() {
    return new Promise((resolve,reject)=>{
      this.setData({
        isLoading: true
      })
      fetch.get('/swiper').then(res => {
        resolve()
        this.setData({
          swiperData: res.data,
          isLoading: false
        })
      }).catch(err => {
        reject()
        this.setData({
          isLoading: false
        })
      })
    })
 
  },
  //首页图书列表
  getContent(){
    return new Promise((resolve,reject)=>{
      this.setData({
        isLoading: true
      })
      fetch.get('/category/books').then(res => {
        resolve()
        this.setData({
          mainContent: res.data,
          isLoading: false
        })
      })
    })
  },
  jumpBook(event){
    const id = event.currentTarget.dataset.id
    // console.log(id)
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  },
  getMoreContent(){
   return  new Promise(resolve=>{
     fetch.get('/category/books',{pn:this.data.pn}).then(res => {
       let newArr = [...this.data.mainContent, ...res.data]       
       this.setData({
         mainContent: newArr
       })
       resolve(res)               
     })
    })
  },
  //下拉加载
  onPullDownRefresh(){
      Promise.all([this.getData(),this.getContent()]).then(()=>{
        this.setData({
          hasMore:true,
          pn:1
        })
        wx.stopPullDownRefresh();
      })
  },
//上拉加载
onReachBottom(){
  if(this.data.hasMore){
    this.setData({
      pn:this.data.pn + 1
    })
    this.getMoreContent().then(res => {
      if (res.data.length < 2) {
        this.setData({
          hasMore: false
        })
      }
    })
  }

}
  
})