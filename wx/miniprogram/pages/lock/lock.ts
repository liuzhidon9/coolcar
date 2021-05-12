import { routing } from "../../utils/routing";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    shareLocaltion: true,
    avatarUrl: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(opt: Record<"car_id", string>) {
    const o: routing.LockOpts = opt;
    console.log("unlocking car", o.car_id);

    getApp<IAppOption>()
      .getUserInfo()
      .then((userInfo) => {
        this.setData({
          avatarUrl: userInfo?.avatarUrl,
        });
      });
    this.setData({
      shareLocaltion: wx.getStorageSync("share_localtion"),
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
  onShareLocaltion(e: any) {
    console.log(e);
    wx.setStorageSync("share_localtion", e.detail.value);
    this.setData({
      shareLocaltion: e.detail.value,
    });
  },
  onUnlockTap() {
    wx.getLocation({
      type: "gcj02",
      success: (loc) => {
        console.log("start a trip", {
          longitude: loc.longitude,
          latitude: loc.latitude,
          avatarUrl: this.data.shareLocaltion ? this.data.avatarUrl : "",
        });
        wx.showLoading({
          title: "开锁中",
          mask: true,
        });
        //TODO:get tripID from server
        const tripID = "trip123";
        setTimeout(() => {
          const redirectURL = routing.driving({ trip_id: tripID });
          wx.redirectTo({
            url: redirectURL,
            complete: () => {
              wx.hideLoading();
            },
          });
        }, 2000);
      },
      fail: () => {
        wx.showToast({
          title: "请前往设置页授权位置信息",
          icon: "none",
        });
      },
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
