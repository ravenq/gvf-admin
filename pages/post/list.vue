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
        width="85">
      </el-table-column>
      <el-table-column
        prop="author"
        label="author"
        width="90">
      </el-table-column>
      <el-table-column
        prop="visit"
        label="vsit"
        width="80">
      </el-table-column>
      <el-table-column
        prop="summary"
        label="summary">
      </el-table-column>
      <el-table-column
        fixed="right"
        label=""
        width="60">
        <template slot-scope="scope">
          <el-tooltip content="Editor Post" placement="top">
            <el-button @click="handleEditor(scope.row)" type="text" size="small">
              <i class="el-icon-edit"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip content="Delete Post" placement="top">
            <el-button @click="handleDelete(scope.row)" type="text" size="small">
              <i class="el-icon-delete"></i>
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from '@/api'
export default {
  asyncData() {
    return api.getPostList().then(function (response) {
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
    handleEditor(row) {
      console.log(row);
    },
    handleDelete(row) {
      console.log(row);
    },
    formatter(row, column) {
      return new Date(Date.parse(row.pubTime)).format('yyyy-MM-dd');
    }
  },
  data() {
    return {
      
    }
  }
}
</script>
