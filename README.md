# CNodeJs-WXAPP 微信小程序版的CNodeJs中文社区

跟着潮流玩下微信小程序，用微信官方提供的开发者工具破解版做了个 [CNodeJS中文社区](https://cnodejs.org/) 的小程序。

简单的实现了：
* 主题列表（分类查看）
* 主题详情（含回复）

接口地址：[https://cnodejs.org/api](https://cnodejs.org/api)

![image](https://github.com/Shaman05/CNodeJs-WXAPP/blob/master/docs/images/view.gif)

## 吐槽一下

不爽的地方
* 每添加一个页面需要在 package.json 里做一次配置，这个有点不爽
* 部分组建考虑的不够全面，如：toast只有打勾的效果
* 部分标签不支持，如标题 h1~6 ，其他还有什么我也不知道，自己去试吧
* 由于一些未知的标签不支持，导致富文本的显示是个问题，如本应用里的内容详情，接口支持 markdown 转化的 html, 但是直接输出将输出 html 标签

很爽的地方
* 支持模块化开发
* 数据绑定很不错，熟悉 angular/vue 的同学很容易掌握
* 组建丰富，直接拿来用，简单暴力
* 页面以单独文件夹形式的组织架构不错，进而有优先独立配置和独立 .wxss(css) 的作用域

## 总结

开发过程相对简单，官方提供的 [文档](http://wxopen.notedown.cn/) 还是很详细的，不过其中也有很多限制。期待内测中能尽可能实际中遇到的问题都解决掉，关爱我们前端工程师，不留一坑一洼！