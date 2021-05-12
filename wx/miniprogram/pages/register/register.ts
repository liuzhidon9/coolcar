import { routing } from "../../utils/routing";

Page({
  /**
   * 页面的初始数据
   */
  redirectURL: "",
  data: {
    name: "",
    licNo: "",
    licImgUrl: "",
    genders: ["未知", "男", "女"],
    genderIndex: 0,
    birthdate: "1990-01-01",
    state: "UNSUBMIT",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(opt: Record<"redirect", string>) {
    const o: routing.RegisterOpts = opt;
    console.log("redirect to", o.redirect);
    this.redirectURL = o.redirect;
  },
  onUploadLic() {
    wx.chooseImage({
      success: (res) => {
        this.setData({
          licImgUrl: res.tempFilePaths[0],
        });
        //TODO: upload file
        setTimeout(() => {
          this.setData({
            licNo: "12345342",
            name: "张三",
            genderIndex: 1,
            birthdate: "1998-11-22",
          });
        }, 1000);
      },
    });
  },
  onGenderPickerChange(e: any) {
    this.setData({
      genderIndex: e.detail.value,
    });
  },
  onBirthdateChange(e: any) {
    this.setData({
      birthdate: e.detail.value,
    });
  },
  onSubmit() {
    this.setData({
      state: "PENDDING",
    });
    this.onVerified();
  },
  onReSubmit() {
    this.setData({
      licImgUrl: "",
    });
  },
  onVerified() {
    setTimeout(() => {
      this.setData({
        state: "VERIFIED",
      });
      if (this.redirectURL) {
        wx.redirectTo({ url: decodeURIComponent(this.redirectURL) });
      }
    }, 3000);
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
