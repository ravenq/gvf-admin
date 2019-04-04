<template>
  <div>
    <el-table v-loading="loading" :data="myloveList" border style="width: 100%">
      <el-table-column fixed prop="id" label="id" width="50" />
      <el-table-column
        prop="createTime"
        label="createTime"
        width="100"
        :formatter="formatter"
      />
      <el-table-column prop="content" label="content" />
      <el-table-column prop="photo" label="photo" width="85">
        <template slot-scope="scope">
          <img :src="scope.row.photo" class="photo" />
        </template>
      </el-table-column>
      <el-table-column prop="sign" label="sign" width="90" />
      <el-table-column prop="author.name" label="author" width="90" />
      <el-table-column fixed="right" label="" width="100">
        <template slot-scope="scope">
          <nuxt-link :to="{ name: 'mylove-add', params: { id: scope.row.id } }">
            <el-button type="text" size="small">
              <i class="el-icon-edit post-item" />
            </el-button>
          </nuxt-link>
          <el-button type="text" size="small" @click="handleDelete(scope.row)">
            <i class="el-icon-delete post-item" />
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myloveList: [],
      loading: false
    }
  },
  mounted() {
    this.loading = true
    this.$api.getMyloveList().then(response => {
      this.myloveList = response.data || []
      this.loading = false
    })
  },
  methods: {
    handleEditor(row) {
      // console.log(row)
    },
    handleDelete(row) {
      // console.log(row)
    },
    formatter(row, column) {
      return new Date(Date.parse(row.createTime)).format('yyyy-MM-dd')
    }
  }
}
</script>

<style lang="scss" scoped>
.photo {
  height: 60px;
}
</style>
