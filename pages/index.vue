<template>
  <el-container class="container">
    <el-main>
      <div class="login-box">
        <div class="login-title-container">
          <span class="login-title">Login System</span>
        </div>
        <el-form ref="form" :model="user" status-icon :rules="rules">
          <el-form-item prop="name">
            <el-input
              v-model="user.name"
              placeholder="user name or email or phone number"
            >
              <i
                slot="prefix"
                class="prefix-icon fa fa-user"
                aria-hidden="true"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="user.password"
              type="password"
              auto-complete="off"
              placeholder="password less then 6 word"
            >
              <i
                slot="prefix"
                class="prefix-icon fa fa-key"
                aria-hidden="true"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="submit-botton" type="primary" @click="login"
              >sign in</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import isEqual from 'lodash'
import { mapMutations } from 'vuex'

export default {
  layout: 'empty',
  data() {
    return {
      user: {
        name: '',
        password: ''
      },
      rules: {
        name: [{ required: true, message: 'need user name!', trigger: 'blur' }],
        password: [
          { required: true, message: 'need password!', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    login() {
      this.$api
        .login({
          name: this.user.name,
          password: this.user.password
        })
        .then(res => {
          const user = res.data
          this.setUser(user)
          this.$router.replace('/dashboard')
        })
        .catch(res => {
          if (isEqual(res.status, 1)) {
            this.$message({
              message: 'not find user',
              type: 'error',
              duration: 5 * 1000
            })
          } else if (isEqual(res.status, 2)) {
            this.$message({
              message: res.message,
              type: 'error',
              duration: 5 * 1000
            })
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/mixin.scss';
.container {
  position: absolute;
  height: 100%;
  width: 100%;
}

.login-box {
  width: 400px;
  margin: auto;
  margin-top: 160px;
}

.login-title-container {
  width: 100%;
  margin-bottom: 22px;
  text-align: center;
}

.login-title {
  margin: auto;
  font-size: 24px;
}

.submit-botton {
  width: 100%;
}

.prefix-icon {
  margin-left: 8px;
}

.small-link {
  font-size: 14px;
}

.float-right {
  float: right;
}
</style>
