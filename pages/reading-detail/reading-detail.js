Page({
    data: {
    },
    onLoad: function (options) {
        // 生命周期函数--监听页面加载
        console.log(options.item);
        requestData(this, options.itemId);
    },
})

//在使用的View中引入WxParse模块
var WxParse = require('../../wxParse/wxParse.js');

function requestData(that, id) {
    wx.request({
        url: 'http://v3.wufazhuce.com:8000/api/essay/' + id,
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
            // success
            var article = res.data.data.hp_content;
          console.log( article);
            //WxParse.wxParse('article', 'html', article, that, 5);
        },
        fail: function (res) {
            // fail
            console.log(res);
        },
        complete: function (res) {
            // complete
        }
    })
}