<template>
  <section>
    <el-form ref="form" :rules="rules" :model="mylove" label-width="80px">
      <el-form-item label="content" prop="content">
        <el-input v-model="mylove.content" type="textarea" rows="10" />
      </el-form-item>
      <el-form-item label="photo" prop="photo">
        <el-input v-model="mylove.photo" />
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :action="config.UPLOAD_URL"
          :on-preview="handlePictureCardPreview"
          :on-success="handleUploadSuccess"
          :before-upload="handleBeforUpload"
          :data="uploadData"
        >
          <img v-if="mylove.photo" :src="mylove.photo" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="mylove.photo" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="sign" prop="sign">
        <el-input v-model="mylove.sign" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Submit</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import config from '@/config'
import { mapState } from 'vuex'
import { Message } from 'element-ui'
import isNil from 'lodash.isnil'

export default {
  data() {
    return {
      loading: false,
      isUpdate: false,
      dialogVisible: false,
      config: config,
      uploadData: {
        token: ''
      },
      mylove: {
        author: null,
        content: '',
        photo: null,
        sign: ''
      },
      rules: {
        content: [
          { required: true, message: 'need content!', trigger: 'blur' }
        ],
        photo: [{ required: true, message: 'need photo!', trigger: 'blur' }],
        sign: [{ required: true, message: 'need sign!', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  beforeRouteEnter(to, from, next) {
    const id = to.params.id
    if (!isNil(id)) {
      next(vm => {
        vm.loading = true
        vm.$api.getMylove(id).then(res => {
          if (!isNil(res.data)) {
            vm.mylove = res.data
            vm.isUpdate = true
            vm.loading = false
          }
        })
      })
    } else {
      next(vm => {
        vm.isUpdate = false
      })
    }
  },
  methods: {
    handleBeforUpload() {
      return this.$api.getUploadToken().then(res => {
        this.uploadData = {
          token: res.data
        }
      })
    },
    handleUploadSuccess(res, file) {
      this.mylove.photo = this.config.UPLOAD_BASE_URL + res.hash
    },
    handlePictureCardPreview(file) {
      this.mylove.photo = file.url
      this.dialogVisible = true
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.mylove.author = this.user
          if (this.isUpdate) {
            this.$api.updateMylove(this.mylove).then(() => {
              Message({
                message: 'Update mylove success.',
                type: 'success',
                duration: 5 * 1000
              })
            })
          } else {
            this.$api.addMylove(this.mylove).then(() => {
              Message({
                message: 'Add mylove success.',
                type: 'success',
                duration: 5 * 1000
              })
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  height: 178px;
  display: block;
}
</style>
