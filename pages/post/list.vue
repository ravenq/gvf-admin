<template>
  <div v-loading="loading">
    <el-table :data="posts" border style="width: 100%">
      <el-table-column fixed prop="id" label="id" width="50" />
      <el-table-column
        prop="pubTime"
        label="pubTime"
        width="95"
        :formatter="formatter"
      />
      <el-table-column prop="title" label="title" width="150" />
      <el-table-column prop="category.name" label="category" width="90" />
      <el-table-column prop="author.name" label="author" width="80" />
      <el-table-column prop="visit" label="visit" width="60" />
      <el-table-column prop="summary" label="summary" />
      <el-table-column fixed="right" label="" width="100">
        <template slot-scope="scope">
          <el-tooltip content="Editor Post" placement="top">
            <nuxt-link :to="{ name: 'post-add', params: { id: scope.row.id } }">
              <el-button type="text" size="small">
                <i class="el-icon-edit post-item" />
              </el-button>
            </nuxt-link>
          </el-tooltip>
          <el-tooltip content="Delete Post" placement="top">
            <el-button
              type="text"
              size="small"
              @click="handleDelete(scope.row)"
            >
              <i class="el-icon-delete post-item" />
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
        layout="prev, pager, next, jumper"
        :total="postCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      currentPage: 1,
      postCount: 1,
      pageSize: 100,
      loading: false
    }
  },
  mounted() {
    this.loading = true
    this.$api.getPostList(0, 1000).then(response => {
      this.posts = response.data || []
      this.loading = false
    })
    this.$api.getPostCount().then(response => {
      this.postCount = response.data
    })
  },
  methods: {
    handleDelete(row) {
      // console.log(row)
    },
    formatter(row, column) {
      return new Date(Date.parse(row.pubTime)).format('yyyy-MM-dd')
    },
    handleSizeChange(val) {
      this.$api.getPostList(0, val).then(response => {
        this.posts = response.data
      })
    },
    handleCurrentChange(val) {
      const offset = this.pageSize * (val - 1)
      this.$api.getPostList(offset, val).then(response => {
        this.posts = response.data
      })
    }
  }
}
</script>

<style scoped>
.post-item {
  font-size: 24px;
  margin-right: 8px;
}
</style>
