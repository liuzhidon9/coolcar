/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
   
  }
  getUserInfo:()=>Promise<WechatMiniprogram.UserInfo|undefined>,
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
  
}