Page({
  data: {
    items: []
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    console.log('start_reading');
    requestData(this, mCurrentPage + 1);
  },
  onPullDownRefresh: function () {
    console.log('--------下拉刷新-------')
    wx.showNavigationBarLoading() //在标题栏中显示加载
    mCurrentPage = -1;
    requestData(this, mCurrentPage + 1);
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
    requestData(this, mCurrentPage + 1);
  },
});

var mCurrentPage = -1;
var util = require('../../utils/util.js');
/**
 * 请求数据
 * @param that Page的对象，用其进行数据的更新
 * @param targetPage 请求的目标页码
 */
function requestData(that, targetPage) {

  wx.request({
    url: 'http://v3.wufazhuce.com:8000/api/channel/reading/more/0',
    data: {},
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function (res) {
      // success
      mCurrentPage = targetPage;
      console.log(res.data);
      var itemList = [];
      for (var i = 0; i < res.data.data.length; i++) {
        console.log();
        itemList.push({
          tag: '- 阅读 -',
          title: res.data.data[i].title,
          author: '文/' + res.data.data[i].author.user_name,
          img_url: res.data.data[i].img_url,
          forward: res.data.data[i].forward,
          post_date: util.computeTime(res.data.data[i].post_date)
        });

      }
      that.setData({
        items: itemList,
      });
    },
    fail: function (res) {
      // fail
      console.log("fail");
    },
    complete: function (res) {
      // complete
      console.log("complete mCurrentPage:"+mCurrentPage);
      if (mCurrentPage == 0) {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    }
  })
}

