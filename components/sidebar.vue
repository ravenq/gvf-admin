<template>
  <el-menu
    class="full-height"
    :collapse="isCollapseSidebar"
    default-active="1"
    background-color="#545c64"
    text-color="#fff"
    router
    active-text-color="#ffd04b"
  >
    <el-menu-item index="/dashboard">
      <i class="fa fa-dashboard fa-1x menu-icon"></i>
      <span slot="title">dashboard</span>
    </el-menu-item>
    <el-submenu index="post">
      <template slot="title">
        <i class="el-icon-document"></i>
        <span>post</span>
      </template>
      <el-menu-item index="/post/list">list</el-menu-item>
      <el-menu-item index="/post/add">add</el-menu-item>
    </el-submenu>
    <el-submenu index="mylove">
      <template slot="title">
        <i class="el-icon-document"></i>
        <span>mylove</span>
      </template>
      <el-menu-item index="/mylove/list">list</el-menu-item>
      <el-menu-item index="/mylove/add">add</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['isCollapseSidebar'])
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/mixin.scss';
.menu-icon {
  font-size: 18px;
  margin-right: 7px;
  margin-left: 4px;
}
</style>
