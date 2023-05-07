<template>
  <div class="user-container">
    <Header/>
    <router-view/>
  </div>
</template>
<script>
import Header from '../common/header.vue';
export default {
  components: {
    Header
  },
  data () {
    return {
      msg: 'Welcome to VIXX Vue.js App'
    }
  },
  mounted() {

  },
  methods: {
    
  }
}
</script>
<style lang="scss" scoped>
</style>