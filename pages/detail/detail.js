/**
 * Created by ChenChao on 2016/9/28.
 */

var app = getApp();
var api = require('../../utils/api.js');
var util = require('../../utils/util.js');
var diffTime = util.getDateDiff;
var transformTab = util.transformTab;

Page({
    data: {
        validId: true,
        loading: false,
        article: {}
    },
    onLoad: function (params) {
        var topicId = params.id;
        if(!topicId){
            this.setData({
                validId: false
            });
            return;
        }
        this.getTopic(topicId);
    },
    getTopic: function (id) {
        var _this = this;
        _this.setData({
            loading: true
        });
        api.getTopic(id, function (res) {
            var article = res.data;
            console.time('transform data');
            article.create_at = diffTime(+new Date(article.create_at));
            article.last_reply_at = diffTime(+new Date(article.last_reply_at));
            article.tabText = transformTab(article.tab);
            article.replies.map(function(reply){
                reply.create_at = diffTime(+new Date(reply.create_at));
                return reply;
            });
            console.timeEnd('transform data');
            if(article.good){
                article.mark = '精华';
            }
            if(article.top){
                article.mark = '置顶';
            }
            _this.setData({
                loading: false,
                article: article
            });
        });
    },
    onErrorOk: function () {
        wx.navigateTo({
            url: '../index/index'
        })
    }
});