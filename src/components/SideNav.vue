<template>
    <!-- 侧边导航 -->
    <el-aside style="width:200px">
      <el-menu
        default-active="1-1"
        width="200"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>订单管理</span>
          </template>
          <el-menu-item-group>
            <router-link tag="el-menu-item" to="/channel" index="1-1">传统渠道</router-link>
            <router-link tag="el-menu-item" to="/frlist" index="1-2">58</router-link>
            <router-link tag="el-menu-item" to="/frlist" index="1-3">轻松筹项目</router-link>
            <router-link tag="el-menu-item" to="/frlist" index="1-4">医保通库存</router-link>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>报表中心</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">月度报表</el-menu-item>
            <el-menu-item index="2-2">年度报表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="3">
          <i class="el-icon-menu"></i>
          <span slot="title">在线理赔</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-menu"></i>
          <span slot="title">职员管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <!-- 侧边导航 end-->

</template>

<script>
export default {
    name:"sideNav",
};
</script>

<style scoped>

/* 侧边导航 */
.el-aside {
  height:100%;
  background-color: #545c64;
  position: relative;
  /* float: left; */
  left: 7px;
  top: 70px;
}
.el-menu-item.router-link-active{
  background-color: yellow;
}
</style>