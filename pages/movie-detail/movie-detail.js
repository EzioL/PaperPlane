Page({
    data: {
        detail: {},
        hidden: false
    },
    onLoad: function (options) {
        // 生命周期函数--监听页面加载
        console.log(options.item);
        requestData(this, options.itemId);
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

    },
    onShareAppMessage: function () {
        // 用户点击右上角分享
        return {
            title: 'title', // 分享标题
            desc: 'desc', // 分享描述
            path: 'path' // 分享路径
        }
    }
})
let item;

function requestData(that, id) {
    
    wx.request({
        url: 'http://v3.wufazhuce.com:8000/api/movie/detail/' + id,
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
            // success

            var data = res.data.data;
            // data.push("content", item.share_info.content);
            console.log(data);
            that.setData({
                hidden: true,
                detail: data

            });
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