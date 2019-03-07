---
title: YAML Front Matter
description: A very simple way to add structured data to a page.
poster: img/1.png
---

![An image](img/96.png)

<!-- more -->

# 首页

```js {6-12}
var express = require('express')
var app = express()
app.use(express.static(__dirname + '/dist'))
var proxy = require('http-proxy-middleware')
var localhost = require('address').ip()
var opn = require('opn')
var port = 3099
var options = {
  // target: 'http://192.168.2.116:8089', // 目标主机
  target: 'http://192.168.2.118:8089', // 张金俊
  // target: 'http://192.168.2.243:7070', // 测试
  // target: 'http://www.51chebian.com', // 线上
  changeOrigin: true, // 需要虚拟主机站点
  pathRewrite: {
    // '^/ns-index': ''
  }
}
var exampleProxy = proxy(options) // 开启代理功能，并加载配置
// app.use('/', exampleProxy) // 对地址为’/‘的请求全部转发
app.use('/ns-index', exampleProxy) // 对地址为’/‘的请求全部转发
app.listen(port, () => {
  var uri = `http://${localhost}:${port}`
  opn(uri)
})
```

# 456
