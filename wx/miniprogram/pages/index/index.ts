// index.ts

import { routing } from "../../utils/routing";

Page({
  isPageShowing: false,
  data: {
    avatarUrl: "",
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
  },
  // onMyTripTap 我的行程
  onMyTripTap() {
    wx.navigateTo({
      url:routing.mytrips(),
    });
  },
  //onMyLocationTap 当前定位
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

  // onScanTap 扫描租车
  onScanTap() {
    wx.scanCode({
      success: (res) => {
        console.log("scanCode", res);
        //TODO: get car id from scan
        const carID = "123";
        const redirectURL = routing.lock({
          car_id: carID,
        });
        wx.navigateTo({
          url: routing.register({ redirectURL: redirectURL }),
        });
      },
      fail: console.error,
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
    console.log("onShow");
  },
  onHide() {
    this.isPageShowing = false;
    console.log("onHide");
  },
  onLoad() {
    getApp<IAppOption>()
      .getUserInfo()
      .then((userInfo) => {
        this.setData({
          avatarUrl: userInfo?.avatarUrl,
        });
      });
  },
});
