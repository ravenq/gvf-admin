<template>
  <el-container class="container">
    <el-main>
      <div class="register-box">
        <el-form
          ref="form"
          :model="user"
          status-icon
          :rules="rules"
          label-width="140px"
        >
          <el-form-item label="name" prop="name">
            <el-input v-model="user.name" placeholder="user name"> </el-input>
          </el-form-item>
          <el-form-item label="Nick" prop="nick">
            <el-input v-model="user.nick" placeholder="nick"> </el-input>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input v-model="user.email" placeholder="you email"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input
              v-model="user.password"
              type="password"
              auto-complete="off"
              placeholder="password less then 6 word"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="Confirm Password" prop="checkPassword">
            <el-input
              v-model="user.checkPassword"
              type="password"
              auto-complete="off"
              placeholder="Confirm the password"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="submit-botton" type="primary" @click="register"
              >sign up</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  layout: 'empty',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('password less then 6 word'))
      } else {
        if (this.user.checkPassword !== '') {
          this.$refs.form.validateField('checkPassword')
        }
        callback()
      }
    }
    const validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('input the password agian!'))
      } else if (value !== this.user.password) {
        callback(new Error('the passowrd must be the same!'))
      } else {
        callback()
      }
    }
    return {
      user: {
        name: '',
        password: '',
        checkPassword: '',
        email: '',
        phone: ''
      },
      rules: {
        name: [{ required: true, message: 'need user name!', trigger: 'blur' }],
        nick: [{ required: true, message: 'need nick!', trigger: 'blur' }],
        email: [{ required: true, message: 'need email!', trigger: 'blur' }],
        password: [
          { required: true, message: 'need password!', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          {
            required: true,
            message: 'need confirm password!',
            trigger: 'blur'
          },
          { validator: validateCheckPass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    register() {
      this.$api
        .register(this.user)
        .then(res => {
          this.$api.login(this.user).then(res => {
            this.setUser(res.data)
            this.$router.replace('/dashboard')
          })
        })
        .catch(error => {
          this.Message({
            message: error,
            type: 'error',
            duration: 5 * 1000
          })
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

.register-box {
  width: 800px;
  margin: auto;
  margin-top: 160px;
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
</style>
