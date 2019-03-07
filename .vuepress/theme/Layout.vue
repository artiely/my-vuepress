<template>
  <div class="theme-container">
    <componen
      class="main-content"
      :is="layout"
    />
  </div>
</template>

<script>
import home from './layouts/Home'
import post from './layouts/Post'
export default {
  computed: {
    layout () {
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
<style lang="stylus" src="./styles/theme.styl"></style>
<style>
</style>
