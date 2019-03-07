const path = require('path')

module.exports = ({ comments = {} }, ctx) => ({
  // extend: '@vuepress/theme-default',
  layoutDir: 'layouts',
  alias() {
    const { themeConfig, siteConfig } = ctx
    // resolve algolia
    const isAlgoliaSearch =
      themeConfig.algolia ||
      Object.keys((siteConfig.locales && themeConfig.locales) || {}).some(
        base => themeConfig.locales[base].algolia
      )
    return {
      '@AlgoliaSearchBox': isAlgoliaSearch
        ? path.resolve(__dirname, 'components/AlgoliaSearchBox.vue')
        : path.resolve(__dirname, 'noopModule.js')
    }
  },
  plugins: [
    '@vuepress/active-header-links',
    '@vuepress/search',
    '@vuepress/plugin-nprogress',
    ['@vuepress/container', { type: 'tip' }],
    ['@vuepress/container', { type: 'warning' }],
    ['@vuepress/container', { type: 'danger' }],
    ['@vuepress/google-analytics'],
    ['@vuepress/back-to-top'],
    ['@vuepress/medium-zoom'],
    [
      '@vssue/vuepress-plugin-vssue',
      Object.assign(
        {
          platform: 'github'
        },
        comments
      )
    ],
    [
      '@vuepress/register-components',
      {
        componentsDir: [path.resolve(__dirname, 'components')]
      }
    ],
    [
      '@yubisaki/blog',
      {
        pageEnhancers: [
          {
            when: ({ frontmatter }) => frontmatter.layout === 'Activity',
            frontmatter: { layout: 'Activity' }
          }
        ]
      }
    ],
    ['@yubisaki/pagination'],
    'flowchart'
  ]
})
