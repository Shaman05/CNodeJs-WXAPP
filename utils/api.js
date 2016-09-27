/**
 * Created by ChenChao on 2016/9/27.
 */


module.exports = {
    getTopic: function (options, callback) {
        var apiUrl = 'https://cnodejs.org/api/v1/topics?';
        if(typeof options === 'function'){
            callback = options;
            options = {};
        }
        var params = {
            page: options.page || 1,
            limit: options.limit || 10,
            type: options.type || 'ask',
            mdrender: true
        };
        apiUrl = apiUrl + serialize(params);
        fetch(apiUrl).then(function (res) {
            res.json().then(function(data){
                responseData(data, callback);
            });
        });
    }
};

function responseData(data, callback) {
    if(!data.success){
        console.log('接口调用异常！');
        return;
    }
    callback(data);
}

function serialize(object) {
    var params = [];
    for(var key in object){
        if(object.hasOwnProperty(key)){
            params.push(key + '=' + object[key]);
        }
    }
    return params.join('&');
}