/**
 * Created by ChenChao on 2016/9/27.
 */

var app = getApp();
var api = require('../../utils/api.js');
var util = require('../../utils/util.js');
var formatTime = util.formatTime;
var diffTime = util.getDateDiff;

Page({
    data: {
        enableRefresh: true, //下拉刷新开关
        tab: 'all',
        topics: [],
        page: 1,
        userInfo: {},
        isLoadMore: false,
        isRefresh: false
    },
    onLoad: function () {
        this.getTopics(1, true);
    },
    getTopics: function (page, isRefresh) {
        var _this = this;
        if(isRefresh){
            _this.setData({
                isRefresh: true
            });
        }else{
            _this.setData({
                isLoadMore: true
            });
        }
        api.getTopics({page: page, tab: _this.data.tab}, function (res) {
            var topics = isRefresh ? res.data : _this.data.topics.concat(res.data);
            console.time('transform data');
            topics.map(function(topic){
                topic.create_at = formatTime(new Date(topic.create_at));
                var last_reply_at = +new Date(topic.last_reply_at);
                topic.last_reply_at = !last_reply_at ? topic.last_reply_at : diffTime(last_reply_at);
                return topic;
            });
            console.timeEnd('transform data');
            _this.setData({
                topics: topics,
                page: page + 1,
                isLoadMore: false,
                isRefresh: false
            });
        });
    },
    upper: function () {
        this.enableRefresh && this.getTopics(1, true);
    },
    lower: function () {
        this.getTopics(this.data.page);
    },
    scroll: function () {
        //todo
    },
    viewDetail: function (event) {
        var topicId = event.target.dataset.id;
        wx.navigateTo({
            url: '../detail/detail?id=' + topicId
        });
    }
});
