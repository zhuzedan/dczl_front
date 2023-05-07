<template>
  <div class="sidebar-container">
    <el-scrollbar style="height:100%;">
      <el-menu>
        <SidebarItem v-for="route in routerManager" :key="route.path" :item="route" :base-path="route.path"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem'
import { mapGetters } from 'vuex'
export default {
  components: { 
    SidebarItem 
  },
  computed: {
    ...mapGetters(['routerManager'])
  },
  data () {
    return {
      msg: 'Welcome to VIXX Vue.js App',
    }
  },
  created() {

  },
  mounted() {

  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sidebar-container{
  width: 100%;
  height: 100%;
}
</style>