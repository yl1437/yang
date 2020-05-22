<template>
  <el-header>
      <div>
        <span>众惠相互</span>
        <span>呵护向善的力量</span>
      </div>
  </el-header>
</template>

<script>
export default {
    name:"headerLogo"
}
</script>

<style scped>
/* header */
.el-header {
  width: 100%;
  background-color: #545c64;
  position: absolute;
  top: 5px;
}
.el-header div {
  margin-top: 20px;
}
.el-header div span {
  color: #fff;
  margin-left: 20px;
  font-size: 16px;
}
</style>