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
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
    
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
     requestData(this, mCurrentPage);
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
  onItemClick: function (event) {
    console.log(event);
    var targetUrl = "/pages/movie-detail/movie-detail" + 
    "?itemId=" + event.currentTarget.dataset.itemId;
    wx.navigateTo({
      url: targetUrl
    });
  },

})
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
    url: 'http://v3.wufazhuce.com:8000/api/channel/movie/more/' + targetPage,
    //url:api.MOVIE_MORE+targetPage+api.CONFIG,
    data: {},
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function (res) {
      // success
      console.log(res);
      var length = res.data.data.length;
      mCurrentPage = res.data.data[length - 1].id;
      console.log('mCurrentPage ： '+mCurrentPage);
      var data = res.data.data;
      var itemList = [];
      for (var i = 0; i < length; i++) {
        var tag = '';
        if (data[i].tag_list == 0) {
          tag = '影视'
        } else {
          tag = data[i].tag_list[0].title;
        }
        var sub = data[i].subtitle.substring(3);
        sub = '---《'+sub+'》';
        itemList.push({
          item_id: data[i].item_id,
          tag: '- ' + tag + ' -',
          title: data[i].title,
          author: '文/' + data[i].author.user_name,
          img_url: data[i].img_url,
          forward: data[i].forward,
          subtitle:sub,
          post_date: util.computeTime(data[i].post_date),
          share_info:data[i].share_info
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
