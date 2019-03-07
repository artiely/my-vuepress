const path = require('path')
module.exports = {
  title: 'App3.0文档',
  description: '人生除了眼前的苟且，还有未知的bug和看不懂的code',
  markdown: {
    lineNumbers: true
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': 'img'
      }
    }
  },
  themeConfig: {
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Ui', link: '/ui/' },
      { text: 'External', link: 'https://google.com' }
    ],
    sidebar: [
      '/',
      {
        title: 'Group 1', // 必要的
        path: '/guide/', // 可选的, 应该是一个绝对路径
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: ['/']
      },
      ['/page-b', 'Explicit link text']
    ]
  }
}
