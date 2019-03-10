<template>
  <div>
    <!-- <div class="s-menu">
      <input type="checkbox" id="hamburger" />
      <label class="menuicon" for="hamburger">
        <span></span>
      </label>
      <div class="menu">
        <ul>
          <li v-for="item in userLinks">{{item.text}}
            <span>{{item.lang}}</span>
          </li>
        </ul>
      </div>
    </div> -->
    <div class="v-menu">
      <a-menu :selectedKeys="current" mode="horizontal" theme="dark">
        <template v-for="(item,i) in userLinks">
          <template v-if="item.items.length">
          <a-sub-menu >
            <span slot="title" class="submenu-title-wrapper">
              <a-icon type="setting" />Navigation Three - Submenu</span>
            <a-menu-item key="setting:1">Option 1</a-menu-item>
            <a-menu-item key="setting:2">Option 2</a-menu-item>
          </a-sub-menu>
          </template>
          <template v-else>
          <a-menu-item :key="item.link"  class="a-menu-item" @click.native="linkTo(item)">
            {{item.text}}
            <!-- <span>{{item.lang}}</span> -->
          </a-menu-item>
          </template>

        </template>
      </a-menu>
    </div>
  </div>

</template>

<script>
import DropdownLink from '@theme/components/DropdownLink.vue'
import { resolveNavLinkItem, filterPath } from '../util'
import NavLink from '@theme/components/NavLink.vue'

export default {
  data() {
    return {
      // current: [0]
    }
  },
  components: { NavLink, DropdownLink },

  computed: {
    userNav() {
      return this.$themeLocaleConfig.nav || this.$site.themeConfig.nav || []
    },
    current() {
      let index = ''
      this.$themeConfig.nav.map((v, i) => {
        // let link = v.items
        if (filterPath(v.link) === filterPath(this.$route.path)) {
          index = v.link
        }
      })
      return [index]
    },
    nav() {
      const { locales } = this.$site
      if (locales && Object.keys(locales).length > 1) {
        const currentLink = this.$page.path
        const routes = this.$router.options.routes
        const themeLocales = this.$site.themeConfig.locales || {}
        const languageDropdown = {
          text: this.$themeLocaleConfig.selectText || 'Languages',
          items: Object.keys(locales).map(path => {
            const locale = locales[path]
            const text =
              (themeLocales[path] && themeLocales[path].label) || locale.lang
            let link
            // Stay on the current page
            if (locale.lang === this.$lang) {
              link = currentLink
            } else {
              // Try to stay on the same page
              link = currentLink.replace(this.$localeConfig.path, path)
              // fallback to homepage
              if (!routes.some(route => route.path === link)) {
                link = path
              }
            }
            return { text, link }
          })
        }
        return [...this.userNav, languageDropdown]
      }
      return this.userNav
    },

    userLinks() {
      return (this.nav || []).map(link => {
        return Object.assign(resolveNavLinkItem(link), {
          items: (link.items || []).map(resolveNavLinkItem)
        })
      })
    },

    repoLink() {
      const { repo } = this.$site.themeConfig
      if (repo) {
        return /^https?:/.test(repo) ? repo : `https://github.com/${repo}`
      }
    },

    repoLabel() {
      if (!this.repoLink) return
      if (this.$site.themeConfig.repoLabel) {
        return this.$site.themeConfig.repoLabel
      }

      const repoHost = this.repoLink.match(/^https?:\/\/[^/]+/)[0]
      const platforms = ['GitHub', 'GitLab', 'Bitbucket']
      for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i]
        if (new RegExp(platform, 'i').test(repoHost)) {
          return platform
        }
      }

      return 'Source'
    }
  },
  methods: {
    linkTo(item) {
      this.$router.push({ path: item.link })
    }
  }
}
</script>

<style lang="stylus">
@media screen and (max-width: 768px) {
  .v-menu {
    // display: none;
  }
}
@media screen and (min-width: 768px) {
  .s-menu {
    // display: none;
  }
}
@keyframes fadeUpIn {
  from {
    opacity: 0;
    top: 150px;
  }
  to {
    opacity: 1;
    top: 0px;
  }
}
.ant-menu-item {
  position: relative;
  letter-spacing: 6px;
  font-size: 14px;
  span {
    width: 100%;
    position: absolute;
    top: 20px;
    left: 0;
    font-size: 12px;
    letter-spacing: 2px;
    text-align: center;
    color: rgba(255, 255, 255, 0.1);
  }
}
.ant-menu {
  background: none;
  color: #fff;
  padding: 20px;
}
.ant-menu-item:active, .ant-menu-submenu-title:active {
  background: #333;
}
.ant-menu-item, .ant-menu-submenu-title {
  // background: #333;
  // color #333;
}
.ant-menu-dark .ant-menu-item, .ant-menu-dark .ant-menu-item-group-title, .ant-menu-dark .ant-menu-item > a {
  color: #f8f8f8;
  span {
    color: rgba(248, 248, 248, 0.7);
  }
}
.ant-menu.ant-menu-dark .ant-menu-item-selected, .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
  background: none;
}
.ant-menu-horizontal > .ant-menu-item:hover, .ant-menu-horizontal > .ant-menu-submenu:hover, .ant-menu-horizontal > .ant-menu-item-active, .ant-menu-horizontal > .ant-menu-submenu-active, .ant-menu-horizontal > .ant-menu-item-open, .ant-menu-horizontal > .ant-menu-submenu-open, .ant-menu-horizontal > .ant-menu-item-selected, .ant-menu-horizontal > .ant-menu-submenu-selected {
  color: rgba(44, 180, 100, 1);
  border-color: rgba(44, 180, 100, 1);
  span {
    color: rgba(44, 180, 100, 0.7);
  }
}
.ant-menu-dark.ant-menu-horizontal > .ant-menu-item, .ant-menu-dark.ant-menu-horizontal.ant-menu-submenu-open {
  span {
    position: absolute;
    top: 20px;
    left: 0;
  }
}
.ant-layout-sider-zero-width-trigger {
  top: 96px;
}
.v-menu {
  position: relative;
  height: 90px;
  width: 100%;
  line-height: 80px;
  text-align: center;
  // color: #2cb464;
  color: #f8f8f8;
  // background-color : #f8f8f8;
  background-color: #001529;
  overflow: hidden;
  background-image: url('../layouts/bg10.png');
  box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.1);
  .search {
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    input {
      height: 60px;
      border: none;
      outline: none;
      font-size: 16px;
      color: #eee;
      background: transparent;
      letter-spacing: 2px;
    }
  }
  .menu-wrapper {
    position: absolute;
    top: 0;
    width: 100%;
    line-height: inherit;
    animation: fadeUpIn 2s;
    .menu-item {
      display: inline;
      font-size: 18px;
      font-weight: 700;
      padding: 20px 20px;
      letter-spacing: 8px;
      cursor: pointer;
      position: relative;
      &:hover {
        span {
          color: rgba(44, 180, 100, 0.6);
        }
      }
      span {
        font-size: 12px;
        width: 100%;
        position: absolute;
        top: 5px;
        left: 0;
        line-height: 1;
        color: rgba(255, 255, 255, 0.2);
        transform-origin: center;
        letter-spacing: 6px;
      }
    }
  }
}
.s-menu {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
}
/* Configuration Parameters */
</style>
