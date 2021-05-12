Page({
  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    current: 0,
    images: [
      "https://img3.mukewang.com/6095193d0001071917920764.jpg",
      "https://img.mukewang.com/6094a1f50001524717920764.jpg",
      "https://img4.mukewang.com/609357d600019d4217920764.jpg",
      "https://img4.mukewang.com/609899b80001b10017920764.jpg",
    ],
    avatarUrl: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    getApp<IAppOption>()
      .getUserInfo()
      .then((userInfo) => {
        this.setData({
          avatarUrl: userInfo?.avatarUrl,
        });
      });
  },
  onGetUserProfile() {
    wx.getUserProfile({
      desc: "用户展示用户头像",
      success: (res) => {
        wx.setStorageSync("userInfo", JSON.stringify(res.userInfo));
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
        });
      },
    });
  },
  onRegisterTap() {
    wx.navigateTo({
      url: "/pages/register/register",
    });
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
