<template>
<div>
  <el-form ref="form" :model="post" label-width="80px">
    <el-form-item label="Title">
      <el-input v-model="post.title"></el-input>
    </el-form-item>
    <el-form-item label="Category">
      <el-row>
        <el-select v-model="post.category.id" placeholder="select a category...">
          <el-option v-for="category in categories"
            :key="category.id"
            :label="category.name"
            :value="category.id"></el-option>
        </el-select>
        <el-button class="add-category"
          type="primary"
          size="mini"
          icon="el-icon-plus"
          @click="addCategoryDialogVisible = true"
          circle>
        </el-button>
      </el-row>
    </el-form-item>
    <el-form-item label="Tags">
      <div class="flex-inline">
        <div class="tag-conatiner">
          <el-tag
            :key="tag"
            v-for="tag in tagArray"
            closable
            @close="handleClose"
            :disable-transitions="false">
            {{ tag }}
          </el-tag>
        </div>
        <el-input
          class="tag-input"
          v-model="inputTag"
          placeholder="enter the tags..."
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm">
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
    <el-form-item  v-show="post.postType !== 0" label="RefUrl">
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
        placeholder="select public time...">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="Content">
      <el-input
        type="textarea"
        rows="10"
        v-model="post.content">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Submit</el-button>
    </el-form-item>
  </el-form>
  <el-dialog
    title="Add Category"
    :visible.sync="addCategoryDialogVisible"
    width="40%"
    @open="handleAddCategoryDlgOpened">
    <el-form :model="addCategory"
      ref="addCategoryForm"
      label-width="50px">
      <el-form-item
        label="name"
        prop="name"
        :rules="[{ required: true, message: 'The name can not be null!'} ]">
        <el-input v-model="addCategory.name"></el-input>
      </el-form-item>
      <el-form-item
        label="desc"
        prop="desc"
        :rules="[{ required: true, message: 'The description can not be null!'} ]">
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
import api from '@/api'
import _ from 'lodash'
import { Message } from 'element-ui'

export default {
  asyncData() {
     return api.getCategoryList().then(function (response) {
      return {
        categories: response.data || []
      }
    }).catch(function (error) {
      Message({
        message: error,
        type: 'error',
        duration: 5 * 1000
      })
    })
  },
  data() {
    return {
      post: {
        author: "ravenq",
        category: {
          id: null
        },
        title: "my first post",
        tags: "c",
        isTop: false,
        summary: "my first post summary",
        content: "my first post summary content",
        status: 0,
        postType: 0,
        refUrl: "",
        refAuthor: "",
        translator: "",
      },
      categories: [],
      inputTag: '',
      tagArray: [],
      addCategoryDialogVisible: false,
      addCategory: {
        name: '',
        desc: ''
      }
    };
  },
  methods: {
    handleClose(tag) {
      this.tagArray.splice(this.tagArray.indexOf(tag), 1)
    },
    handleInputConfirm() {
      let inputTag = this.inputTag;
      if (inputTag && !_.includes(this.tagArray, inputTag)) {
        this.tagArray.push(inputTag)
      }
      this.inputTag = ''
    },
    handleAddCategory() {
      this.$refs.addCategoryForm.validate((valid) => {
        if (valid) {
          api.addCategory(this.addCategory).then((res) => {
            this.post.Category.Id = this.addCategory.Id = res.data.Id
            this.categories.push(this.addCategory)
            this.addCategoryDialogVisible = false
          })
        }
      });
    },
    handleAddCategoryDlgOpened() {
      if (this.$refs.addCategoryForm) {
        this.$refs.addCategoryForm.resetFields();
      }
    },
    onSubmit() {
      this.post.Tags = _.join(this.tagArray, ',')
      api.addPost(this.post).then(() => {
        Message({
          message: 'Add post success.',
          type: 'success',
          duration: 5 * 1000
        })
      }).catch((res) =>{
        Message({
          message: res.message,
          type: 'error',
          duration: 5 * 1000
        })
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/mixin.scss";
.tag-container {
  margin-top: 3px;
}
.tag-input {
  width: 150px;
}
.add-category {
  margin-left: 10px;
}
</style>

