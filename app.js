//app.js
App({
    onLaunch: function () {
        this.getUserInfo();
    },
    getUserInfo: function () {
        var that = this;
        if (this.globalData.userInfo !== '') {
        } else {
            wx.login({
                success: function () {
                    wx.getUserInfo({
                        withCredentials: false,
                        success: function (res) {
                            that.globalData.userInfo = res.userInfo;
                            wx.request({
                                url: 'https://ifibercc.com/api/user',
                                data: {
                                    userInfo: res.userInfo
                                },
                                header: {
                                    'content-type': 'application/json'
                                },
                                success: function (res) {
                                    // 处理异常
                                    if (res.statusCode === 200) {
                                        that.globalData.userId = res.data;
                                    }
                                }
                            })
                        }
                    })
                }
            });
        }
    },
    globalData: {
        userInfo: '',
        userId: ''
    }
})
