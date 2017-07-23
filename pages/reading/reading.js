Page({
  data: {
    items: [],
    hidden: false
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    mCurrentPage = 0;
    requestData(this, mCurrentPage);
  },
  onPullDownRefresh: function () {
    console.log('--------下拉刷新-------')
    wx.showNavigationBarLoading() //在标题栏中显示加载
    items: [];
    mCurrentPage = 0;
    requestData(this, mCurrentPage);
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

    requestData(this, mCurrentPage);
  },
  onReadItemClick: function (event) {
    console.log(event);
    var targetUrl = "/pages/reading-detail/reading-detail" + "?itemId=" + event.currentTarget.dataset.itemId;
    wx.navigateTo({
      url: targetUrl
    });
  },
});

var mCurrentPage = -1;
var util = require('../../utils/util.js');
var api = require('../../utils/api.js');
/**
 * 请求数据
 * @param that Page的对象，用其进行数据的更新
 * @param targetPage 请求的目标页码
 */
function requestData(that, targetPage) {

  wx.request({
    url: 'http://v3.wufazhuce.com:8000/api/channel/reading/more/' + targetPage,
    //url:api.READING_MORE+targetPage+api.CONFIG,
    data: {},
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function (res) {
      // success
      var length = res.data.data.length;
      mCurrentPage = res.data.data[length - 1].id;
      console.log(res.data);

      var data = res.data.data;
      var itemList = [];
      for (var i = 0; i < length; i++) {
        var tag = '';
        if (data[i].tag_list == 0) {
          tag = '阅读'
        } else {
          tag = data[i].tag_list[0].title;
        }

        itemList.push({
          item_id: data[i].item_id,
          tag: '- ' + tag + ' -',
          title: data[i].title,
          author: '文/' + data[i].author.user_name,
          img_url: data[i].img_url,
          forward: data[i].forward,
          post_date: util.computeTime(data[i].post_date)
        });

      }
      that.setData({
        items: that.data.items.concat(itemList),
        hidden: true
      });

    },
    fail: function (res) {
      // fail
      console.log("fail");
    },
    complete: function (res) {
      // complete
      console.log(that.data.items.length);
      if (mCurrentPage == 0) {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    }
  })
}

