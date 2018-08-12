<template>
  <el-container class="container">
    <el-main>
      <div class="login-box">
        <div class="login-title-container">
          <span class="login-title">Login System</span>
        </div>
        <el-form :model="user" status-icon :rules="rules" ref="form">
          <el-form-item prop="name">
            <el-input
              v-model="user.name"
              placeholder="user name or email or phone number">
              <i slot="prefix" class="prefix-icon fa fa-user" aria-hidden="true"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="user.password"
              auto-complete="off"
              placeholder="password less then 6 word">
              <i slot="prefix" class="prefix-icon fa fa-key" aria-hidden="true"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="submit-botton" type="primary" @click="login">sign in</el-button>
          </el-form-item>
        </el-form>
        <el-row>
           <router-link to="/register"><span class="small-link">Register</span></router-link>
           <router-link to="/reset-password"><span class="small-link float-right">Forget password?</span></router-link>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import api from "@/api";
import _ from 'lodash'
import { mapMutations, mapState } from "vuex";

export default {
  layout: "empty",
  data() {
    return {
      user: {
        name: "",
        password: ""
      },
      rules: {
        name: [
          { required: true, message: "need user name!", trigger: "blur" }
        ],
        password: [
          { required: true, message: "need password!", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    ...mapMutations(["setUser"]),
    login() {
      api.login({
        name: this.user.name,
        password: this.user.password
      }).then(res => {
        debugger
        let user = res.data
        this.setUser(user);
        this.$router.replace('/dashboard')
      }).catch(res => {
        if(_.isEqual(res.status, 1)) {
           this.Message({
            message: "not find user",
            type: "error",
            duration: 5 * 1000
          });
        } else if(_.isEqual(res.status, 2)) {
          this.Message({
            message: res.message,
            type: "error",
            duration: 5 * 1000
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/mixin.scss";
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

