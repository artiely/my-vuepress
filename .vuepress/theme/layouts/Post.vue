<template>
  <div class="post">
    <div>
      <div
        v-for="item in sliderBar"
        @click="linkTo(item)"
      >{{item.text}}</div>
    </div>
    <Content :custom="false" />
  </div>
</template>

<script>
export default {
  computed: {
    sliderBar () {
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

      let res = sliderBar[0] && sliderBar[0].children ? sliderBar[0].children : []
      return res
    }
  },
  methods: {
    linkTo (item) {
      this.$router.push('/guide/' + item.link)
    }
  },
  created () {
  }
}
</script>

<style>
.post {
  padding-top: 60px;
}
</style>
