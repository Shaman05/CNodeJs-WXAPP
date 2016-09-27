/**
 * Created by ChenChao on 2016/9/27.
 */

var app = getApp();
var api = require('../../utils/api.js');
var util = require('../../utils/util.js');
var formatTime = util.formatTime;

Page({
    data: {
        enableRefresh: false, //下拉刷新开关
        topics: [],
        page: 1,
        userInfo: {},
        isLoadMore: false,
        isRefresh: false
    },
    onLoad: function () {
        this.getTopics(this.data.page, true);
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
        api.getTopic({page: page}, function (res) {
            var topics = isRefresh ? res.data : _this.data.topics.concat(res.data);
            topics.map(function(topic){
                topic.create_at = formatTime(new Date(topic.create_at));
                return topic;
            });
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
    }
});
