<template>
  <div class="theme-container">
    <header>
      <!-- <Menu></Menu> -->
      <!-- <Navbar v-if="shouldShowNavbar" /> -->
    </header>
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
    },
    shouldShowNavbar () {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page
      if (
        frontmatter.navbar === false
        || themeConfig.navbar === false) {
        return false
      }
      return (
        this.$title
        || themeConfig.logo
        || themeConfig.repo
        || themeConfig.nav
        || this.$themeLocaleConfig.nav
      )
    },
  }
}
</script>
<style src="prismjs/themes/prism-tomorrow.css"></style>
<style lang="stylus" src="./styles/theme.styl"></style>

