<template>
  <el-container>
      <HeaderLogo/> 
        <el-container>
          <SideNav/>
          <el-main>58list
            <el-footer></el-footer>
          </el-main>
          
        </el-container>   
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </el-container>
</template>

<script>

import HeaderLogo from '../components/HeaderLogo.vue'
import SideNav from '../components/SideNav.vue'
export default {
    name:'frlist',
    components:{
      SideNav,
      HeaderLogo
    }
}
</script>

<style scoped>
.el-main {
  border: 1px solid #ccc;
  margin: 10px 10px;
  float: right;
  position: relative;
  top: 60px;
}
/* 页码 */
.el-footer {
  margin-top: 10px;
  float: right;
}
</style>