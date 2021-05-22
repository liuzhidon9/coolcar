import { routing } from "../../utils/routing";

interface Trip {
  id: string;
  start: string;
  end: string;
  duration: string;
  fee: string;
  distance: string;
  status: string;
}
interface mainItem {
  id: string;
  navId: string;
  navScrollId:string,
  data: Trip;
}
interface navItem {
  id: string;
  mainId: string;
  label: string;
}

interface mainItemQueryResult {
  id: string;
  top: number;
  dataset: {
    navId: string;
    navScrollId:string
  };
}
Page({
  /**
   * 页面的初始数据
   */
  scrollStates: {
    mainItems: [] as mainItemQueryResult[],
  },
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
    mainItems: [] as mainItem[],
    navItems: [] as navItem[],
    tripsHeight: 0,
    mainScroll: "",
    navScroll:"",
    navSel: "",
    navCount: 0,
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
    this.populateTrips();
  },

  populateTrips() {
    const mainItems: mainItem[] = [];
    const navItems: navItem[] = [];
    let preNavId:string = ""
    let navSel: string;
    for (let index = 0; index < 100; index++) {
      const tripID = (10001 + index).toString();
      const mainId = "main" + index;
      const navId = "nav" + index;
      if (!preNavId){
        preNavId = navId
      }
      mainItems.push({
        id: mainId,
        navId: navId,
        navScrollId:preNavId,
        data: {
          id: tripID,
          start: "东方明珠",
          end: "迪士尼",
          duration: "0时44分",
          fee: "128.0元",
          distance: "27.0公里",
          status: "已完成",
        },
      });
      navItems.push({
        id: navId,
        mainId: mainId,
        label: tripID,
      });
      if (index === 0) {
        navSel = navId;
        this.setData({
          navSel,
        });
      }
      preNavId = navId
    }
    this.setData(
      {
        mainItems,
        navItems,
      },
      () => {
        this.prepareScrollStates();
      }
    );
  },
  prepareScrollStates() {
    wx.createSelectorQuery()
      .selectAll(".main-item")
      .fields({
        id: true,
        dataset: true,
        rect: true,
      })
      .exec((res) => {
        this.scrollStates.mainItems = res[0];
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
  onMainScroll(e: any) {
    const top = e.currentTarget?.offsetTop + e.detail?.scrollTop;
    if (top === undefined) return;
    const selItem = this.scrollStates.mainItems.find((item) => item.top >= top);
    
    if (!selItem) return;
    this.setData({
      navSel: selItem.dataset.navId,
      navScroll:selItem.dataset.navScrollId
    });
  },
  onNavItemTap(e: any) {
    const mainId: string = e.currentTarget?.dataset?.mainId;
    const navId: string = e.currentTarget?.id;
    if (mainId && navId) {
      this.setData({
        mainScroll: mainId,
        navSel: navId,
      });
    }
  },
  onRegisterTap() {
    wx.navigateTo({
      url: routing.register(),
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.createSelectorQuery()
      .select("#heading")
      .boundingClientRect((rect) => {
        const sysInfo = wx.getSystemInfoSync();
        const height = sysInfo.windowHeight - rect.height;
        this.setData({
          tripsHeight: height,
          navCount: Math.round(height / 50),
        });
      })
      .exec();
  },

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
