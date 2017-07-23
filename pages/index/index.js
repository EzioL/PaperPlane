//index.js
Page({
  data: {
    items: [],
    hidden: false
  },
  onLoad: function (options) {
    getIdlist(this);
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
    requestData(this, idlist[current]);
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
      "?item=" + JSON.stringify(event.currentTarget.dataset.item);
    wx.navigateTo({
      url: targetUrl
    });
  },

})
var idlist = [];
var current = 0;
var util = require('../../utils/util.js');

function getIdlist(that) {
  wx.request({
    url: 'http://v3.wufazhuce.com:8000/api/onelist/idlist/?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android 或 http://v3.wufazhuce.com:8000/api/onelist/idlist/?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android',
    data: {},
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function (res) {
      // success
      idlist = res.data.data;
      console.log(idlist);
      console.log(idlist[current]);
      requestData(that, idlist[current]);
      
    },
    fail: function (res) {
      // fail
      console.log("fail");
    },
    complete: function (res) {
      // complete
    }
  })
}

/**
 * 请求数据
 * @param that Page的对象，用其进行数据的更新
 * @param targetPage 请求的目标页码
 */
function requestData(that, targetId) {
  wx.request({
    url: 'http://v3.wufazhuce.com:8000/api/onelist/' + targetId + '/0?cchannel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android',
    data: {},
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function (res) {
      // success
      console.log(res);
      var data = res.data.data;
      that.setData({
        items: that.data.items.concat(data),
        hidden: true
      });
    },
    fail: function (res) {
      // fail
      console.log("fail");
    },
    complete: function (res) {
      current++;
      // complete
     //  console.log(that.data.items.length);
     
    }
  })
}

