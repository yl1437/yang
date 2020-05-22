<template>
  <div>
    <div id="login">
      <el-input placeholder="请输入用户名" prefix-icon="el-icon-user-solid" v-model="ruleForm.loginName"></el-input>
      <el-input placeholder="请输入密码" prefix-icon="el-icon-s-opportunity" v-model="ruleForm.password"></el-input>
      <el-button type="primary" sizi="mini" @click="onSubmit">sigin</el-button>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        loginName: "",
        password: ""
      }
    };
  },
  methods: {
    onSubmit() {
      if (this.ruleForm.loginName === "" || this.ruleForm.password === "") {
        alert("账号或密码不能为空");
      } else {
        this.axios({
          method: "post",
          url: "/api/operation/login",
          data: {
            loginName: this.ruleForm.loginName,
            password: this.ruleForm.password
          },
          headers:{
              'Content-Type':'application/json;charset=UTF-8',
          }
        })
          .then(res => {
              console.log(res)
            if (res.data.sts === 1) {
            // 将用户token保存到cookie中
              document.cookie='token'+'='+ res.data.response.token;
              this.$router.push("/channel");
              console.log(document.token);  
            } else {
              alert("账号或密码错误");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style scoped>
#login {
  width: 300px;
  height: 150px;
  border: 1px solid #ccc;
  position: absolute;
  overflow: hidden;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -75px;
}
.el-input {
  width: 290px;
  margin: 5px 5px;
}
.el-button {
  float: right;
  margin-right: 10px;
}
</style>