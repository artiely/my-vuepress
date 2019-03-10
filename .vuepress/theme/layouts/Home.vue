<template>
  <div class="a-main">
    <!-- <div class="a-list">
      <div v-for="item in arr">{{item.desc}}</div>
    </div> -->
    <Menu></Menu>

    <!-- <ClientOnly>
      <vue-waterfall-easy
        :imgsArr="arr"
        :imgWidth="300"
        :maxCols="4"
        @scrollReachBottom="getData"
      >
        <div slot-scope="props">
          
          <div class="last-updated">{{props.value.lastUpdated}}</div>
          <div class="a-desc">
            <h1 class="a-title">123</h1>
            {{props.value.desc}}
          </div>
        </div>
      </vue-waterfall-easy>
    </ClientOnly> -->
    <div class="v-main">
      <a-row>
        <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8"  class="card-col" v-for="item in arr">
          <div>
            <a-card hoverable class="my-crad" >
              <div  slot="cover" class="inner">

              <!-- <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" slot="cover" /> -->
              <img alt="example" :src="item.src" slot="cover" />
              </div>
              <template class="ant-card-actions" slot="actions">
                {{item.lastUpdated}}
              </template>
              <a-card-meta :title="item.title" :description="item.desc">
                <!-- <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> -->
              </a-card-meta>
            </a-card>
            <!-- <div class="img-box">
          <img :src="item.src" alt="">
        </div>
        <div class="info-box">
          <h1>{{item.title}}</h1>
           {{item.desc}}</div>-->
          </div>
        </a-col>
      </a-row>

    </div>
    <div class="v-footer">footer</div>
  </div>

</template>
<script>
import vueWaterfallEasy from 'vue-waterfall-easy'
import Menu from '@theme/components/Menu.vue'
import axios from 'axios'
export default {
  components: {
    vueWaterfallEasy,
    Menu
  },
  data() {
    return {
      imgsArr: [],
      group: 0 // request param
    }
  },
  computed: {
    nav() {
      return this.$site.themeConfig.nav
    },
    arr() {
      let arr = this.$site.pages.map(v => {
        v.src = v.frontmatter.poster
        v.desc = v.frontmatter.description
        return v
      })
      return arr
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
    }
  },
  methods: {
    getData() {
      axios.get('./mock/data.json?group=' + this.group).then(res => {
        this.imgsArr = this.imgsArr.concat(res.data)
        this.group++
      })
    }
  },
  created() {
    console.log(this.$site)
    console.log('this,thi', this)
    this.getData()
  }
}
</script>

<style lang="stylus">
.card-col{
  padding 20px;
  .my-crad{
    margin 0 auto;
    .inner{
      height: 0;
    padding-bottom: 60%;
    overflow: hidden;
    background-color: red;}
    img{
      width 100%;
    }
  }
}
.card {
  display: flex;
  padding: 20px;
  .img-box {
    width: 200px;
    height: 100px;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  .info-box {
    padding-left: 20px;
    flex: 1;
  }
}
#app {
  background: #eee;
}
.a-list {
  background: red;
  opacity: 0;
}
.v-main {
  // width: 960px;
  margin: 0 auto;
  background: #ffffff;
  flex: 1;
}
.v-footer {
  flex: 0;
}
.a-main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #eee;
  // padding-top: 60px;
  // .vue-waterfall-easy-container {
  // height: 100%;
  // }
  // .vue-waterfall-easy-container .vue-waterfall-easy a.img-inner-box {
  // background: #fff;
  // border-radius: 0 !important;
  // overflow: hidden;
  // box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1) !important;
  // .last-updated {
  // position: absolute;
  // top: 20px;
  // right: 20px;
  // font-size: 28px;
  // color: rgba(255, 255, 255, 0.3);
  // font-family: DINPro-Medium;
  // }
  // &:hover {
  // .last-updated {
  // color: rgba(0, 0, 0, 0.3);
  // }
  // }
  // }
  // .a-title {
  // font-size: 18px;
  // font-weight: 700;
  // }
  // .a-desc {
  // padding: 10px;
  // background: #fff;
  // }
  // .a-article-card {
  // height: 300px;
  // width: 100%;
  // overflow: hidden;
  // }
  // .a-article-img {
  // width: 300px;
  // height: 150px;
  // img {
  // object-fit: cover;
  // width: 100%;
  // height: 100%;
  // }
  // }
  // .a-list {
  // margin-right: -35px;
  // padding-top: 60px;
  // background: #ddd;
  // position: absolute;
  // width: 100%;
  // top: 0;
  // bottom: 0;
  // }
  // .a-article {
  // flex: 1;
  // }
  // .a-footer {
  // flex: 0;
  // }
}
#app {
  height: 100%;
}
.theme-container {
  height: 100%;
}
.ant-layout {
  height: 100%;
}
.card-wrapper {
  padding: 20px;
  width: 400px;
  border: 1px solid #ddd;
}
.ant-layout-header {
  min-height: 60px;
  height: auto;
  background: #fff;
}
.artiely-nav {
  text-align: center;
  font-size: 14px;
  .artiely-nav-item {
    display: inline-block;
    padding: 20px;
    cursor: pointer;
    color: #999;
    &.active {
      color: #df846c;
    }
  }
}
</style>
