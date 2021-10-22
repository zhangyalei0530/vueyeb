<template>
  <div>
    <el-form
      v-loading="loading"
      element-loading-text="正在登录..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :rules="rules"
      ref="loginForm"
      :model="loginForm"
      class="loginContainer"
    >
      <h3 class="loginTile">系统登录</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          auto-complete="false"
          v-model="loginForm.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          auto-complete="false"
          v-model="loginForm.password"
          placeholder="请输入密码"
          maxlength="6"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          type="text"
          auto-complete="false"
          v-model="loginForm.code"
          placeholder="点击图片更换验证码"
          style="width: 250px; margin-right: 10px"
        ></el-input>
        <img :src="captchaUrl" @click="updateCapcha" />
      </el-form-item>
      <el-checkbox v-model="checked" class="loginRemember">记住我</el-checkbox>
      <el-button
        type="primary"
        style="width: 100%"
        @click="submitLogin('loginForm')"
        >登录</el-button
      >
    </el-form>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      captchaUrl:
        "https://www.fastmock.site/mock/193583abb772ed7a66234f6fdfe6fcf3/yeb/captcha" +
        new Date(),
      loginForm: {
        username: "admin",
        password: "",
        code: "",
      },
      loading:false,
      checked: true,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          // {length:6,pattern:/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){2,5}$/,message:"请输入字母开头的1-6位密码", trigger: "blur"}
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  methods: {
    //   点击刷新验证码
    updateCapcha() {
      this.captchaUrl = "/captcha?time=" + new Date();
    },
    // 点击登录按钮
    submitLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
            this.loading =true;
        //   this.postRequest("/login", this.loginForm).then((resp) => {
        //     if (resp) {
        //         this.loading=false;
        //       const tokenStr = resp.obj.tokenHead + resp.obj.token;
        //       //   把token存放到sessionStorage中，方便api.js中获取token
        //       window.sessionStorage.setItem("tokenStr", tokenStr);
        //       //   跳转首页
        //       this.$router.replace("/home");
        //     }
        //   });
        setTimeout(() => {
            this.loading=false;
            this.$message({
              message: "登录成功",
              type: "success",
            });
            this.$router.replace("/home");
        }, 1000);
        } else {
          this.$message.error("请输入信息");
          return false;
        }
      });
    },
  },
};
</script>
<style scoped>
.loginContainer {
  width: 360px;
  background-clip: border-box;
  margin: 150px auto;
  padding: 15px 35px;
  background: #fff;
  border: 1px solid #c6c6c6;
  border-radius: 15px;
  box-shadow: 0px 0px 20px #c6c6c6;
}
.loginTile {
  margin: 0px auto 40px auto;
  padding: 5px;
}
.loginRemember {
  text-align: left;
  margin: 0px 0px 15px 0;
}
.el-form-item__content {
  display: flex;
  align-items: center;
}
</style>