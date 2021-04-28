Page({
  data: {
    name: "",
    licNo: "",
    licImgUrl: "",
    genders: ["未知", "男", "女"],
    genderIndex: 0,
    birthdate: '1990-01-01',
    state: "UNSUBMIT"
  },
  onUploadLic() {
    wx.chooseImage({
      success: (res) => {
        this.setData({
          licImgUrl: res.tempFilePaths[0]
        })
        //TODO: upload file
        setTimeout(() => {
          this.setData({
            licNo: "12345342",
            name: "张三",
            genderIndex: 1,
            birthdate: "1998-11-22"
          })
        }, 1000)
      }
    })
  },
  onGenderPickerChange(e: any) {
    this.setData({
      genderIndex: e.detail.value
    })
  },
  onBirthdateChange(e: any) {
    this.setData({
      birthdate: e.detail.value
    })
  },
  onSubmit() {
    this.setData({
      state: "PENDDING"
    })
    this.onVerified()
  },
  onReSubmit() {
    this.setData({
      licImgUrl: ""
    })
  },
  onVerified() {
    setTimeout(() => {
      this.setData({
        state: "VERIFIED"
      })
    }, 3000)
  }
})