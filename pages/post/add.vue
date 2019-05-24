<template>
  <div v-loading="loading">
    <el-form ref="form" :model="post" label-width="80px">
      <el-form-item label="Title">
        <el-input v-model="post.title"></el-input>
      </el-form-item>
      <el-form-item label="Category">
        <el-row>
          <el-select
            v-model="post.category.id"
            placeholder="select a category..."
          >
            <el-option
              v-for="category in categories"
              :key="category.id"
              :label="category.name"
              :value="category.id"
            ></el-option>
          </el-select>
          <el-button
            class="add-category"
            type="primary"
            size="mini"
            icon="el-icon-plus"
            circle
            @click="addCategoryDialogVisible = true"
          >
          </el-button>
        </el-row>
      </el-form-item>
      <el-form-item label="Tags">
        <div class="flex-inline">
          <div class="tag-conatiner">
            <el-tag
              v-for="tag in tagArray"
              :key="tag"
              closable
              :disable-transitions="false"
              @close="handleClose"
            >
              {{ tag }}
            </el-tag>
          </div>
          <el-input
            v-model="inputTag"
            class="tag-input"
            placeholder="enter the tags..."
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
        </div>
      </el-form-item>
      <el-form-item label="IsTop">
        <el-switch v-model="post.isTop"></el-switch>
      </el-form-item>
      <el-form-item label="Summary">
        <el-input v-model="post.summary"></el-input>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="post.postType">
          <el-radio :label="0">Original</el-radio>
          <el-radio :label="1">Repost</el-radio>
          <el-radio :label="2">Translated</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-show="post.postType !== 0" label="RefUrl">
        <el-input v-model="post.RefUrl"></el-input>
      </el-form-item>
      <el-form-item v-show="post.postType !== 0" label="RefAuthor">
        <el-input v-model="post.refAuthor"></el-input>
      </el-form-item>
      <el-form-item v-show="post.postType === 2" label="RefAuthor">
        <el-input v-model="post.refAuthor"></el-input>
      </el-form-item>
      <el-form-item label="PubTime">
        <el-date-picker
          v-model="post.pubTime"
          type="datetime"
          placeholder="select public time..."
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Content">
        <el-row>
          <el-col :span="12">
            <el-input
              v-model="post.content"
              type="textarea"
              :autosize="{ minRows: 10 }"
              resize="none"
            >
            </el-input>
          </el-col>
          <el-col :span="12">
            <markdown-it-vue class="mk-view" :content="post.content" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Submit</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="Add Category"
      :visible.sync="addCategoryDialogVisible"
      width="40%"
      @open="handleAddCategoryDlgOpened"
    >
      <el-form ref="addCategoryForm" :model="addCategory" label-width="50px">
        <el-form-item
          label="name"
          prop="name"
          :rules="[{ required: true, message: 'The name can not be null!' }]"
        >
          <el-input v-model="addCategory.name"></el-input>
        </el-form-item>
        <el-form-item
          label="desc"
          prop="desc"
          :rules="[
            { required: true, message: 'The description can not be null!' }
          ]"
        >
          <el-input v-model="addCategory.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCategoryDialogVisible = false">cancel</el-button>
        <el-button type="primary" @click="handleAddCategory">ok</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import isNil from 'lodash.isnil'
import includes from 'lodash.includes'
import join from 'lodash.join'
import split from 'lodash.split'
import { Message } from 'element-ui'
import MarkdownItVue from 'markdown-it-vue'

export default {
  components: {
    MarkdownItVue
  },
  data() {
    return {
      loading: false,
      isUpdate: false,
      post: {
        author: {
          id: null
        },
        category: {
          id: null
        },
        title: '',
        tags: '',
        isTop: false,
        summary: '',
        content: '',
        status: 0,
        postType: 0,
        refUrl: '',
        refAuthor: '',
        translator: '',
        pubTime: new Date()
      },
      categories: [],
      inputTag: '',
      tagArray: [],
      addCategoryDialogVisible: false,
      addCategory: {
        name: '',
        desc: ''
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  mounted() {
    this.$api.getCategoryList(0, 100).then(response => {
      this.categories = response.data || []
    })
  },
  beforeRouteEnter(to, from, next) {
    const id = to.params.id
    if (!isNil(id)) {
      next(vm => {
        vm.loading = true
        vm.$api.getPost(id).then(res => {
          if (!isNil(res.data)) {
            vm.post = res.data
            if (!isNil(vm.post.tags)) {
              vm.tagArray = split(vm.post.tags, ',')
            }
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
    handleClose(tag) {
      this.tagArray.splice(this.tagArray.indexOf(tag), 1)
    },
    handleInputConfirm() {
      const inputTag = this.inputTag
      if (inputTag && !includes(this.tagArray, inputTag)) {
        this.tagArray.push(inputTag)
      }
      this.inputTag = ''
    },
    handleAddCategory() {
      this.$refs.addCategoryForm.validate(valid => {
        if (valid) {
          this.$api.addCategory(this.addCategory).then(res => {
            this.post.category = res.data
            this.categories.push(this.addCategory)
            this.addCategoryDialogVisible = false
          })
        }
      })
    },
    handleAddCategoryDlgOpened() {
      if (this.$refs.addCategoryForm) {
        this.$refs.addCategoryForm.resetFields()
      }
    },
    onSubmit() {
      this.post.author = this.user
      this.post.Tags = join(this.tagArray, ',')
      if (this.isUpdate) {
        this.$api
          .updatePost(this.post)
          .then(() => {
            Message({
              message: 'update post success.',
              type: 'success',
              duration: 5 * 1000
            })
          })
          .catch(res => {
            Message({
              message: res.message,
              type: 'error',
              duration: 5 * 1000
            })
          })
      } else {
        this.$api
          .addPost(this.post)
          .then(() => {
            Message({
              message: 'Add post success.',
              type: 'success',
              duration: 5 * 1000
            })
          })
          .catch(res => {
            Message({
              message: res.message,
              type: 'error',
              duration: 5 * 1000
            })
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/mixin.scss';
.tag-container {
  margin-top: 3px;
}
.tag-input {
  width: 150px;
}
.add-category {
  margin-left: 10px;
}
.mk-view {
  margin-left: 8px;
}
</style>
