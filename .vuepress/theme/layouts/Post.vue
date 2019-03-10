<template>
  <a-layout class="theme-container" :class="pageClasses">
    <a-layout>
      <a-layout>
        <a-layout-sider breakpoint="lg" collapsedWidth="0">
          <div class="nav-sider">
            <div class="sider-header">
              <h1>{{currMenuObj.text}}</h1>
              <span>{{currMenuObj.lang}}</span>
              <div class="point">
                <span v-for="i in 200"></span>
              </div>
            </div>
            <!-- {{currArr}} -->
            <div v-for="item in currArr" class="nav-item" :class="filterPath(item.path,1)==filterPath($route.path,1)?'active':''" @click="linkToArticle(item)">
              <a-icon type="file-markdown" />
              <h1>{{item.title}}</h1>
            </div>
          </div>
        </a-layout-sider>
        <a-layout-content>
          <Menu />
          <div class="my-container">

            <div class="my-content" @touchstart="onTouchStart" @touchend="onTouchEnd">
              <div style="max-width:740px;margin:0 auto;padding:40px">
               
                <div style="display:flex">
                  <div style="flex:1"> <img style="width:80%" :src="$withBase('../'+currPage.frontmatter.poster) "></div>
                  <div style="flex:1">
                     <h1>{{currPage.title}}</h1>
                     <p>{{currPage.frontmatter.createDate}} </p>
                    <p>{{currPage.lastUpdated}} </p>
                    <p>{{currPage.frontmatter.description}}</p>
                    <!-- {{currPage}} -->
                  </div>
                </div>

              </div>

              <Content :custom="false" />
              <div>
                <!-- <Home v-if="$page.frontmatter.home"/> -->
                <Page :sidebar-items="sidebarItems">
                  <slot name="page-top" slot="top" />
                  <slot name="page-bottom" slot="bottom" />
                </Page>
              </div>
            </div>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>

  </a-layout>

</template>

<script>
import { resolveSidebarItems, filterPath } from '../util'
import Sidebar from '@theme/components/Sidebar.vue'
import Menu from '@theme/components/Menu.vue'
import moment from 'dayjs'
import Page from '@theme/components/Page.vue'
// function filterPath(pathText,index=0) {
//   return pathText.split('/').filter(s => {
//     if (s) {
//       return s
//     }
//   })[index]
// }
export default {
  components: {
    Menu,
    Page
  },
  data() {
    return {
      isSidebarOpen: false,
      filterPath
    }
  },
  computed: {
    currMenuObj() {
      let arr = this.$themeConfig.nav.filter(v => {
        if (filterPath(v.link) === filterPath(this.$route.path)) {
          return v
        }
      })
      return arr[0]
    },
    currPage() {
      return this.$page
    },
    currArr() {
      let currPath = filterPath(this.$route.path)
      // 当前类目下的文章
      let arr = this.$site.pages.filter(v => {
        let vp = filterPath(v.path)
        if (currPath === vp && v.frontmatter.poster) {
          return v
        }
      })
      // 排序当前目录下文章默认以创建时间开始
      var quickSort = function(arr) {
        if (arr.length <= 1) {
          return arr
        }
        var pivotIndex = Math.floor(arr.length / 2)
        var pivot = arr.splice(pivotIndex, 1)[0]
        var left = []
        var right = []
        for (var i = 0; i < arr.length; i++) {
          let createDate = arr[i].createDate
            ? arr[i].createDate
            : arr[i].lastUpdated
          let createDate2 = pivot.createDate
            ? pivot.createDate
            : pivot.lastUpdated
          let valueOf = moment(createDate).valueOf()
          let valueOf2 = moment(createDate2).valueOf()
          if (valueOf < valueOf2) {
            left.push(arr[i])
          } else {
            right.push(arr[i])
          }
        }
        return quickSort(left).concat([pivot], quickSort(right))
      }
      let sortArr = quickSort(arr)
      console.log('sortArr', sortArr)
      return sortArr.reverse()
    },
    currLink() {
      return '/' + filterPath(this.$route.path, 1)
    },
    sidebarItems() {
      console.log(
        'this.$page,',
        this.$page,
        'this.$page.regularPath,',
        this.$page.regularPath,
        'this.$site,',
        this.$site,
        'this.$localePath',
        this.$localePath
      )
      let items = resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
      console.log('------------', items)
      return items
    },
    sliderBar() {
      let currPath = this.$route.path.split('/').filter(v => {
        if (v) {
          return v
        }
      })[0]
      let sidebar = this.$site.themeConfig.sidebar

      let sliderBar = sidebar.filter(v => {
        let path = v.path ? v.path : ''
        let pathText = path.split('/').filter(v => {
          if (v) {
            return v
          }
        })[0]

        if (pathText === currPath) {
          return v
        }
      })

      let res =
        sliderBar[0] && sliderBar[0].children ? sliderBar[0].children : []
      return res
    },
    shouldShowNavbar() {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page
      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      )
    },

    shouldShowSidebar() {
      const { frontmatter } = this.$page
      return (
        !frontmatter.home &&
        frontmatter.sidebar !== false &&
        this.sidebarItems.length
      )
    },

    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass
      return [
        {
          'no-navbar': !this.shouldShowNavbar,
          'sidebar-open': this.isSidebarOpen,
          'no-sidebar': !this.shouldShowSidebar
        },
        userPageClass
      ]
    }
  },
  methods: {
    linkToArticle(item) {
      this.$router.push({ path: item.path })
    },
    linkTo(item) {
      this.$router.push('/guide/' + item.link)
    },
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
    },
    // side swipe
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
      console.log('this.touchStart', this.touchStart)
    },

    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x
      const dy = e.changedTouches[0].clientY - this.touchStart.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true)
        } else {
          this.toggleSidebar(false)
        }
      }
    }
  },
  created() {
    console.log('>>>>>', this.$themeConfig)
    console.log('>>>>>', this.$site.pages)
    console.log('>>>>>', this.sidebarItems)
  }
}
</script>

<style lang="stylus">
.ant-layout-sider {
  // background url('bg05.png')
}
.sider-header {
  height: 100px;
  position: relative;
  padding: 0 20px;
  h1 {
    color: rgba(44, 180, 100, 1);
    font-size: 20px;
  }
  span {
    color: rgba(44, 180, 100, 0.5);
    font-size: 18px;
    font-weight: 700;
  }
  .point {
    position: absolute;
    top: 20px;
    right: 0;
    width: 50px;
    display: flex;
    flex-wrap: wrap;
    span {
      height: 2px;
      width: 2px;
      background: rgba(44, 180, 100, 0.3);
      margin: 2px;
    }
  }
}
.nav-sider {
  width: 200px;
  padding: 20px 0;
}
.nav-item {
  font-size: 14px;
  padding: 5px 20px;
  cursor: pointer;
  &.active {
    color: rgba(44, 180, 100, 1);
    h1 {
      color: rgba(44, 180, 100, 1);
    }
  }
  h1 {
    font-size: 14px;
    display: inline;
    color: #999;
    font-weight: normal;
  }
  &:hover {
    color: rgba(44, 180, 100, 1);
    h1 {
      color: rgba(44, 180, 100, 1);
    }
  }
}
.ant-layout-sider-zero-width-trigger {
  z-index: 999;
}
.ant-layout-sider {
  background-color: #f8f8f8;
}
.ant-menu-submenu.ant-menu-submenu-horizontal.ant-menu-overflowed-submenu.ant-menu-submenu-active {
}
.ant-layout-content {
  flex: 1;
  min-height: auto !important;
}
.my-container {
  display: flex;
}
.my-content {
  flex: 1;
  background: url('bg10.png');
}
@media screen and (max-width: 768px) {
  .my-anchor {
    display: none;
  }
}
.my-anchor {
  width: 200px;
  .anchor {
    width: 200px;
    position: fixed;
    top: 80px;
    right: 0;
  }
}
.post {
  padding-top: 60px;
}
</style>
