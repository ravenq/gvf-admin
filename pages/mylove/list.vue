<template>
  <div>
    <el-table
      :data="myloveList"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="id"
        label="id"
        width="50">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="createTime"
        width="100"
        :formatter="formatter">
      </el-table-column>
      <el-table-column
        prop="content"
        label="content">
      </el-table-column>
      <el-table-column
        prop="photo"
        label="photo"
        width="85">
         <template slot-scope="scope">
          <img :src="scope.row.photo" class="photo"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="sign"
        label="sign"
        width="90">
      </el-table-column>
      <el-table-column
        prop="author.name"
        label="author"
        width="90">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from '@/api'
import { message } from 'element-ui'

export default {
  asyncData() {
    return api.getMyloveList().then(function (response) {
      return {
        myloveList: response.data || []
      }
    }).catch(function (error) {
      message.error(error)
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
      return new Date(Date.parse(row.createTime)).format('yyyy-MM-dd');
    }
  },
  data() {
    return {
      myloveList: []
    }
  }
}
</script>

<style lang="scss" scoped>
  .photo {
    height: 60px;
  }
</style>

