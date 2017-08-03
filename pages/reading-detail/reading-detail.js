Page({
    data: {
    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: red;'
      },
      children: [{
        type: 'text',
        text: 'Hello&nbsp;World!'
      }]
    }]
  },
  tap() {
    console.log('tap')
  },
    onLoad: function (options) {
        // 生命周期函数--监听页面加载
        console.log("阅读详情");
       // requestData(this, options.itemId);
        
    },
})


// function requestData(that, id) 
//     // wx.request({
//     //     url: 'http://v3.wufazhuce.com:8000/api/essay/' + id,
//     //     data: {},
//     //     method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
//     //     // header: {}, // 设置请求的 header
//     //     success: function (res) {
//     //         // success
//     //         var article = res.data.data.hp_content;
//     //       console.log( article);
//     //         //WxParse.wxParse('article', 'html', article, that, 5);
//     //     },
//     //     fail: function (res) {
//     //         // fail
//     //         console.log(res);
//     //     },
//     //     complete: function (res) {
//     //         // complete
//     //     }
//     // })
// }