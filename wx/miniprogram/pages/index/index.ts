// index.ts
// 获取应用实例
const app = getApp<IAppOption>();

Page({
  isPageShowing: false,
  data: {
    setting: {
      skew: 0,
      rotate: 0,
      showLocation: true,
      showScale: true,
      subKey: "",
      layerStyle: 1,
      enableZoom: true,
      enableScroll: true,
      enableRotate: false,
      showCompass: false,
      enable3D: false,
      enableOverlooking: false,
      enableSatellite: false,
      enableTraffic: false,
    },
    location: {
      longitude: 113,
      latitude: 23,
    },
    scale: 10,
    is3D: false,
    isOverLooking: true,
    markers: [
      {
        id: 0,
        longitude: 113,
        latitude: 23,
        iconPath: "/resource/car/blue.png",
        width: 30,
        height: 30,
      },
      {
        id: 1,
        longitude: 114,
        latitude: 24,
        iconPath: "/resource/car/yellow.png",
        width: 30,
        height: 30,
      },
    ],
    motto: "Hello World",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    canIUseGetUserProfile: false,
    canIUseOpenData:
      wx.canIUse("open-data.type.userAvatarUrl") &&
      wx.canIUse("open-data.type.userNickName"), // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: "../logs/logs",
    });
  },
  onMyLocationTap() {
    wx.getLocation({
      type: "gcj02",
      success: (res) => {
        this.setData({
          location: {
            longitude: res.longitude,
            latitude: res.latitude,
          },
        });
      },
      fail: () => {
        wx.showToast({
          icon: "none",
          title: "请前往设置页面授权",
        });
      },
    });
  },
  moveCar() {
    const mapCtx = wx.createMapContext("map");
    const dest = {
      longitude: this.data.location.longitude,
      latitude: this.data.location.latitude,
    };
    const moveCar = () => {
      dest.longitude += 0.1;
      dest.latitude += 0.1;
      mapCtx.translateMarker({
        destination: {
          latitude: dest.latitude,
          longitude: dest.longitude,
        },
        markerId: 0,
        autoRotate: true,
        rotate: 0,
        duration: 5000,
        animationEnd: () => {
          if (this.isPageShowing) {
            moveCar();
            return;
          }
          this.setData({
            location: {
              longitude: dest.longitude,
              latitude: dest.latitude,
            },
          });
        },
      });
    };

    moveCar();
  },
  onShow() {
    this.isPageShowing = true;
    console.log('onShow');
    
  },
  onHide() {
    this.isPageShowing = false;
    console.log("onHide");
    
  },
  onLoad() {
    // @ts-ignore
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      });
    }
  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: "展示用户信息", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
      },
    });
  },
  getUserInfo(e: any) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e);
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    });
  },
});
