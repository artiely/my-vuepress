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
    activeHeaderLinks: true, // 默认值：true
    // displayAllHeaders: true ,// 默认值：false
    // sidebar: 'auto',
    lastUpdated: 'Last Updated',
    nav: [
      { text: '首页', link: '/', lang: 'Home' },
      { text: '前端', link: '/fontend/', lang: 'Font End' },
      { text: '设计', link: '/desgin/', lang: 'Design' },
      // {
      //   text: '更多',
      //   items: [
      //     {
      //       text: '案例',link: '/more/case/',lang: 'Case'
      //     },
      //     { text: '规范', link: '/more/standard/', lang: 'Standard' },
      //     { text: '关于', link: '/more/about/', lang: 'About' }
      //   ]
      // },
      { text: '案例', link: '/case/', lang: 'Case' },
      { text: '规范', link: '/standard/', lang: 'Standard' },
      { text: '关于', link: '/about/', lang: 'About' }
    ],
    sidebar: [
      '/',
      {
        title: 'Group 1', // 必要的
        path: '/fontend/', // 可选的, 应该是一个绝对路径
        children: [
          { text: '指南', link: '' },
          { text: '第一', link: 'one' },
          { text: '第二', link: 'two' }
        ]
      }
    ],
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'artiely/my-vuepress',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: '查看源码',

    // 以下为可选的编辑链接选项

    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: 'artiely/my-vuepress',
    // 假如文档不是放在仓库的根目录下：
    // docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'master',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '帮助改善此内容！'
  }
}
