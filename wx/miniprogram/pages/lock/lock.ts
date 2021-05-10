Page({
  /**
   * 页面的初始数据
   */
  data: {
    shareLocaltion:false,
    avatarUrl: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    getApp<IAppOption>().getUserInfo().then(userInfo=>{
      this.setData({
        avatarUrl:userInfo?.avatarUrl ||""
      })
      
    })
    this.setData({
      shareLocaltion: wx.getStorageSync("share_localtion")
    })
  },

  onGetUserProfile() {
   wx.getUserProfile({
     desc:"用户展示用户头像",
     success:res=>{
       wx.setStorageSync("userInfo",JSON.stringify(res.userInfo))
       this.setData({
         avatarUrl:res.userInfo.avatarUrl
       })
     }
   })
  },
  onShareLocaltion(e:any){
    console.log(e);
    wx.setStorageSync("share_localtion",e.detail.value)
    this.setData({
      shareLocaltion:e.detail.value
    })
  },  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(opts): WechatMiniprogram.Page.ICustomShareContent {
    console.log(opts.target);
    return {};
  },
});
