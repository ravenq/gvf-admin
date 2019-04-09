<template>
  <el-row class="full-height flex">
    <el-col :span="13" class="margin-auto">
      <div class="bars-button" @click="toggleSidebar">
        <i class="fa fa-bars" aria-hidden="true"></i>
      </div>
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">dashboard</el-breadcrumb-item>
          <el-breadcrumb-item v-for="item in breadcrumbItems" :key="item">
            {{ item }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-col>
    <el-col :span="12" class="margin-auto">
      <el-dropdown @command="handleCommand">
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="profiles">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>{{ user.name }}</span>
    </el-col>
  </el-row>
</template>

<script>
import _ from 'lodash'
import { mapMutations, mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['user']),
    breadcrumbItems() {
      return this.$route.fullPath.split('/').filter(item => {
        return !_.isEmpty(item)
      })
    }
  },
  methods: {
    ...mapMutations(['toggleSidebar']),
    handleCommand(cmd) {
      switch (cmd) {
        case 'profiles':
          break
        case 'logout':
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/mixin.scss';

.bars {
  text-align: left;
}

.breadcrumb {
  margin-left: 24px;
}

.bars-button {
  position: absolute;
  vertical-align: middle;
  margin-top: -4px;
  :hover {
    cursor: pointer;
  }
}
</style>
