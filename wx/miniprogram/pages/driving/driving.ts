import { routing } from "../../utils/routing";

const centPerSec = 0.5;
const formatTime = (sec: number) => {
  const padStr = (n: number) => {
    return n < 10 ? "0" + n : n;
  };
  const h = Math.floor(sec / 3600);
  sec -= h * 3600;
  const m = Math.floor(sec / 60);
  sec -= m * 60;
  const s = Math.floor(sec);
  return `${padStr(h)}:${padStr(m)}:${padStr(s)}`;
};
const formatFee = (cent: number) => {
  return (cent / 100).toFixed(2);
};
Page({
  /**
   * 页面的初始数据
   */
  timer: undefined as number | undefined,
  data: {
    location: {
      longitude: 116.46,
      latitude: 39.92,
    },
    scale: 14,
    elapsed: "00:00:00",
    fee: "00.00",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(opt:Record<"trip_id",string>) {
    const o:routing.DrivingOpts = opt
    console.log("get tripID",o.trip_id);
    this.setupLocationUpdator();
    this.setupTimer();
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    wx.stopLocationUpdate();
    if (this.timer) clearInterval(this.timer);
  },

  setupLocationUpdator() {
    wx.startLocationUpdate({
      fail: console.error,
    });
    wx.onLocationChange((loc) => {
      console.log("loction", loc);
      this.setData({
        location: {
          longitude: loc.longitude,
          latitude: loc.latitude,
        },
      });
    });
  },

  setupTimer() {
    let elapsedSec = 0;
    let cents = 0;
    this.timer = setInterval(() => {
      elapsedSec++;
      cents += centPerSec;
      this.setData({
        elapsed: formatTime(elapsedSec),
        fee: formatFee(cents),
      });
    }, 1000);
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
