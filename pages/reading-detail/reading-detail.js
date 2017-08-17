Page({
    data: {
    
  },

  onLoad: function (options) {
        // 生命周期函数--监听页面加载
      console.log("阅读详情");
      requestData(this, options.itemId);
        
  },
})

var WxParse = require('../../wxParse/wxParse.js');
function requestData(that, id) {
      wx.request({
          url: 'http://v3.wufazhuce.com:8000/api/essay/' + id+'?channel=wdj&source=channel_reading&source_id=9264&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android',
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {}, // 设置请求的 header
          success: function (res) {
              // success
              var article = res.data.data.hp_content;
              console.log( article);
              WxParse.wxParse('article', 'html', article, that, 10);
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