<template>
  <el-container class="layout-container">
    <el-aside :width="sideWidth">
      <sidebar></sidebar>
    </el-aside>
    <el-container>
      <el-header height="50px" class="layout-header">
        <menubar></menubar>
      </el-header>
      <el-main>
         <nuxt/>
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
import { mapState } from 'vuex'
import Sidebar from '~/components/sidebar'
import Menubar from '~/components/menubar'
import 'font-awesome/css/font-awesome.css'

export default {
  components: {
    Sidebar,
    Menubar
  },
  computed: {
    sideWidth() {
      return this.isCollapseSidebar ? '64px' : '200px'
    },
    ...mapState([
      'isCollapseSidebar'
    ])
  },
  data() {
    return {
    }
  }
};
</script>

<style lang="scss">
@import "assets/main.css";
.layout-container {
  position: absolute;
  height: 100%;
  width:100%;
}

.layout-header {
  text-align: right;
  border-bottom: 1px
}
</style>
