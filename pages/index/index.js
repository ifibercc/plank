//index.js
//获取应用实例
var app = getApp()
var page;
var beginTime;
Page({
    data: {
        time: '00:00:00',
        actionType: 'primary',
        actionText: 'Start',
        timerMin: '00',
        timerSec: '00',
        timerMs: '00',
        tickInterval: null
    },
    //事件处理函数
    handleAction: function () {
        var page = this;
        var actionStatus = this.data.actionText;
        switch (actionStatus) {
            case 'Start':
                this.setData({
                    actionType: 'warn',
                    actionText: 'Stop'
                });
                beginTime = new Date().getTime();
                this.data.tickInterval = setInterval(this.timerFunc.bind(this), 10)
                break;
            case 'Stop':
                this.setData({
                    actionType: 'default',
                    actionText: 'Reset'
                });
                clearInterval(this.data.tickInterval);
                var now = new Date().getTime() - beginTime;
                // ajax 发送至服务器
                console.log(now)
                break;
            case 'Reset':
                beginTime = new Date().getTime();
                this.setData({
                    actionType: 'primary',
                    actionText: 'Start',
                    timerMin: '00',
                    timerSec: '00',
                    timerMs: '00'
                });
                break;
            default:
                break;
        }
    },
    timerFunc: function () {
        var interval = (new Date().getTime()) - beginTime;
        var min = Math.floor(interval / 1000 / 60);
        var sec = Math.floor((interval - min * 60 * 1000) / 1000);
        var ms = interval - min * 60 * 1000 - sec * 1000;
        this.setData({
            timerMs: formatTime(ms),
            timerSec: formatTime(sec),
            timerMin: formatTime(min)
        })
    }
});

function formatTime(val) {
    return val.toString().length < 2 ? '0' + val.toString() : val.toString().substr(0, 2); 
}
