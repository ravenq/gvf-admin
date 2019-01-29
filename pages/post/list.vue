<template>
  <div>
    <el-table
      :data="posts"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="id"
        label="id"
        width="50">
      </el-table-column>
      <el-table-column
        prop="pubTime"
        label="pubTime"
        width="95"
        :formatter="formatter">
      </el-table-column>
      <el-table-column
        prop="title"
        label="title"
        width="150">
      </el-table-column>
      <el-table-column
        prop="category.name"
        label="category"
        width="90">
      </el-table-column>
      <el-table-column
        prop="author.name"
        label="author"
        width="80">
      </el-table-column>
      <el-table-column
        prop="visit"
        label="visit"
        width="60">
      </el-table-column>
      <el-table-column
        prop="summary"
        label="summary">
      </el-table-column>
      <el-table-column
        fixed="right"
        label=""
        width="90">
        <template slot-scope="scope">
          <el-tooltip content="Editor Post" placement="top">
            <nuxt-link :to="{name:'post-add', params:{id: scope.row.id}}">
              <el-button type="text" size="small">
                <i class="el-icon-edit post-item"></i>
              </el-button>
            </nuxt-link>
          </el-tooltip>
          <el-tooltip content="Delete Post" placement="top">
            <el-button @click="handleDelete(scope.row)" type="text" size="small">
              <i class="el-icon-delete post-item"></i>
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
        layout="prev, pager, next, jumper"
        :total="postCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import { Message } from 'element-ui'
export default {
  asyncData() {
    return api.getPostList(0, 1000).then(function (response) {
      return {
        posts: response.data || []
      }
    }).catch(function (error) {
      Message({
        message: error,
        type: 'error',
        duration: 5 * 1000
      })
    })
  },
  methods: {
    handleDelete(row) {
      console.log(row);
    },
    formatter(row, column) {
      return new Date(Date.parse(row.pubTime)).format('yyyy-MM-dd');
    },
    handleSizeChange(val) {
      api.getPostList(0, val).then(response => {
        this.posts = response.data
      })
    },
    handleCurrentChange(val) {
      let offset = this.pageSize * (val - 1)
      api.getPostList(offset, val).then(response => {
        this.posts = response.data
      })
    }
  },
  mounted() {
    api.getPostCount().then(response => {
      this.postCount = response.data
    })
  },
  data() {
    return {
      currentPage: 1,
      postCount: 1,
      pageSize: 100
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

