<template>
  <div>
    <el-card class="box-card">
      <el-row class="title">
        <el-col :span="8">
          <div>文章总数</div>
          <div class="title-num">{{ postCount }}</div>
        </el-col>
        <el-col :span="8">
          <div>日浏览量</div>
          <div class="title-num">{{ vistCount }}</div>
        </el-col>
        <el-col :span="8">
          <div>评论总量</div>
          <div class="title-num">{{ commentCount }}</div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postCount: 0,
      vistCount: 0,
      commentCount: 0
    }
  },
  mounted() {
    this.$api.getPostCount().then(res => {
      this.postCount = res.data
    })
  }
}
</script>

<style scoped>
.title {
  text-align: center;
}
.title-num {
  font-size: 48px;
}
</style>
