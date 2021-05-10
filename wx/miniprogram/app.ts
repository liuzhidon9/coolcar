// app.ts
App<IAppOption>({
  globalData: {
  
  },
  getUserInfo: () => {
    return new Promise((resolve, reject) => {
      let userInfo: WechatMiniprogram.UserInfo|undefined = getApp<IAppOption>().globalData.userInfo
      if (!userInfo?.avatarUrl) {
        userInfo = JSON.parse(wx.getStorageSync("userInfo"));
        getApp<IAppOption>().globalData.userInfo = userInfo;
      }
      resolve(userInfo)
    });
  },
  onLaunch() {
    const userInfo = wx.getStorageSync("userInfo") || {};
    this.globalData.userInfo = userInfo;
    // 登录
    wx.login({
      success: (res) => {
        console.log(res.code);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    });
  },
});
