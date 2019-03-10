---
title: 指导篇
description: A very simple 
poster: img/9.png
createDate: 2019-3-10 11:24:52
---

<!-- more -->

```vue
<template>
  <div class="theme-container">
    <componen class="main-content" :is="layout" />
  </div>
</template>

<script>
import home from './layouts/Home'
import post from './layouts/Post'
export default {
  computed: {
    layout() {
      const { path } = this.$page
      if (path === '/') {
        return home
      } else {
        return post
      }
    }
  }
}
</script>
<style src="prismjs/themes/prism-tomorrow.css"></style>
<style lang="stylus" src="../styles/theme.styl"></style>
<style></style>
```


## 和原生的交互

原生的接口定义在 api 文件夹下,以扫车牌为例：
src/api/nativeApi

```js {3,7}
// 扫车牌
const LICENCE = params => {
  return sendNativeApi('licence', JSON.stringify(params))
}

// 扫车牌回调
window.cbLicence = params => {
  store.commit('LICENCE', params)
}
```

高亮行的 `licence` `cbLicence` 即为和原生约定的协议

当我们需要调用原生方法的时候 直接

```js
this.$api.LICENCE({ ...params })
```

当原生响应有返回结果时会自动调用 扫车牌回调函数 `window.cbLicence` 进入相应的逻辑,除了返回对应的结果约定的参数也会原样返回。

大致为 我们调用原生的方法 `licence` 原生响应了 调用 web 的方法 `cbLicence`

> 流程都是如此，只是结合具体的业务场景有的事情会变的很复杂，比如图片上传

## 宣传海报

```js
// 给原生传递店铺id 供原生获取店铺信息
const SEND_STOREID = params => {
  return sendNativeApi('sendStoreId', JSON.stringify(params))
}

// 调起原生海报
const POST = params => {
  return sendNativeApi('post', JSON.stringify(params))
}
```
