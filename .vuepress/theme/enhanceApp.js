// import i18n from './libs/i18n'
// import blog from './libs/blog'
// import routes from './libs/routes'
// import components from './components'
// import './styles/theme.styl'
// import Vue from 'vue'
// import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue'

export default ({ Vue, options, router, siteData }) => {
  // const { themeConfig: theme, pages } = siteData
  // Vue.use(i18n, theme.lang)
  // Vue.use(blog, { theme, pages })
  // Vue.use(routes, { router, theme })
  // Vue.use(components, theme)
  Vue.use(Vuetify)
  // Vue.use(ElementUI)
  Vue.use(Antd)
}
