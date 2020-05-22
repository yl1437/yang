<template>
  <el-container>
    <HeaderLogo />
    <el-container class="channel_main">
      <SideNav />
      <el-main>
        <!-- 输入区 -->
        <el-form :inline="true" size="mini">
          <el-form-item label="产品名称">
            <el-select v-model="productCode" placeholder="请选择" clearable filterable>
              <el-option
                v-for="item in product"
                :key="item.index"
                :label="item.productName"
                :value="item.productCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="渠道名称">
            <el-select v-model="sourceCode" placeholder="请选择" clearable filterable>
              <el-option
                v-for="item in channel"
                :key="item.index"
                :label="item.companyName"
                :value="item.comid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单时间">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="初始日期"
                v-model="dateStart"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="结束日期"
                v-model="dateEnd"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="保单状态">
            <el-select v-model="sts" placeholder="请选择" clearable>
              <el-option v-for="(item, index) in policStatus" :key="index" :label="item" :value="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="投保险人姓名">
            <el-input v-model="insurerPersonName" placeholder="投保险人姓名"></el-input>
          </el-form-item>

          <el-form-item label="被保险人姓名">
            <el-input v-model="insuredPersonName" placeholder="被保险人姓名"></el-input>
          </el-form-item>
          <el-form-item label="投保人证件号码">
            <el-input v-model="insurerPersonCard" placeholder="投保人证件号码"></el-input>
          </el-form-item>
          <el-form-item label="被保人证件号码">
            <el-input v-model="insuredPersonCard" placeholder="被保人证件号码"></el-input>
          </el-form-item>
          <el-form-item label="保单号">
            <el-input v-model="policyNo" placeholder="保单号"></el-input>
          </el-form-item>
          <el-form-item label="是否为续保保单">
            <el-select v-model="isRenewPolicy" placeholder="请选择" clearable>
              <el-option value="是"></el-option>
              <el-option value="否"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getTableList">查询</el-button>
          </el-form-item>
        </el-form>
        <!-- 输入区 end-->

        <!-- 显示表格区 -->
        <el-table border :data="tableList" size="mini">
          <el-table-column label="序号" sortable type="index"></el-table-column>
          <el-table-column label="渠道" width="120" prop="channelName"></el-table-column>
          <el-table-column label="订单号" prop="orderNo"></el-table-column>
          <el-table-column label="保单号" prop="policyNo"></el-table-column>
          <el-table-column label="产品名称" width="120" prop="productName"></el-table-column>
          <el-table-column label="订单时间" prop="createdDate"></el-table-column>
          <el-table-column label="支付时间" prop="payDate"></el-table-column>
          <el-table-column label="应交保费" prop="realPremium"></el-table-column>
          <el-table-column label="已交保费" prop="premium"></el-table-column>
          <el-table-column label="退保金额" prop="surrenderAmount"></el-table-column>
          <el-table-column label="投保人姓名" prop="insureName"></el-table-column>
          <el-table-column label="被保人姓名" prop="insuredName"></el-table-column>
          <el-table-column label="操作" width="180" prop="status">
            <template slot-scope="scope">
              <el-button
                size="mini" 
                type="primary" 
                @click="handleEdit(scope.$index, scope.row)">查看</el-button>
              <el-button
                v-if="scope.row.status=='1005'|| scope.row.status=='2001'"
                size="mini" 
                type="warning" 
                @click="handleEdit(scope.$index, scope.row)">{{scope.row.status=='1005'?'退保':'撤单'}}</el-button>
              <el-button
                v-if="scope.row.status=='2001'|| scope.row.status=='1005'"
                size="mini"
                type="success"
                @click="handleDelete(scope.$index, scope.row)">批改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 显示表格区 end-->
        <!-- 页码 -->
        <el-footer>
          <el-pagination
            background
            :page-size="10"
            :pager-count="5"
            layout="prev, pager, next"
            :total="total"
            @current-change="changePage"
          ></el-pagination>
        </el-footer>
        <!-- 页码 end-->
      </el-main>
    </el-container>

    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </el-container>
</template>

<script>
import HeaderLogo from "../components/HeaderLogo.vue";
import SideNav from "../components/SideNav.vue";
export default {
  name: "channel",
  data() {
    return {
      product: [],//产品名称
      channel: [],//渠道名称
      ////保单状态
      policStatus: {
        "1001": "核保成功，待支付",
        "1002": "支付成功，待承保",
        "1003": "承保成功",
        "1005": "已生效 ",
        "2001": "未支付失效",
        "3001": "自核通过，待人核",
        "3002": "人核拒保",
        "1007": "撤单",
        "1008": "退保",
        "1009": "保单满期",
        "3003": "已续期",
        "1006": "保单终止",
        "2002": "承保失败"
      },
      insurerPersonName: "", //投保人姓名
      insuredPersonName: "", //被保人姓名
      insurerPersonCard: "", //投保人证件号
      insuredPersonCard: "", //被保人证件号
      policyNo: "", //保单号
      sts: "", //保单状态
      dateStart: "", //保单时间（初始日期）
      dateEnd: "", //保单时间（结束日期）
      sourceCode: "", //渠道名称（如果没选择的的话默认是全部）
      productCode: "", //产品名称
      isRenewPolicy: "", //是否为续保保单（是‘1’，否‘0’，默认是‘all’）
      coStart: "", //是否为签约状态（这个可以不用管，请求的时候直接为空字符就好）
      pageIndex: 1, //分页（当前页码）
      pageSize: 10, //分页（当前展示多少页）
      token: this.getCookie("token"), //登录成功过后的储存在cookie里面的

      tableList:[],//列表数组
      total:null, //数据条数

      status:"",//按钮状态

      allSourceCode:[],//全部渠道名称

      orderId:"",//个人用户id

    };
  },
  
  methods: {
    // 获取存储在cookie中的token
    getCookie(token) {
      var arr,
        reg = new RegExp("(^| )" + token + "=([^;]*)(;|$)");
        return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
    },
    // 根据选择 获取列表数据
    getTableList() {
      // console.log(this.insurerPersonName)
      this.axios({
        method: "post",
        url: "/api/operation/jdorders",
        data: {
          insurerPersonName: this.insurerPersonName, //投保人姓名
          insuredPersonName: this.insuredPersonName, //被保人姓名
          insurerPersonCard: this.insurerPersonCard, //投保人证件号
          insuredPersonCard: this.insuredPersonCard, //被保人证件号
          policyNo: this.policyNo, //保单号
          sts: this.sts, //保单状态
          dateStart: this.dateStart, //保单时间（初始日期）
          dateEnd: this.dateEnd, //保单时间（结束日期）
          sourceCode: this.sourceCode==""?this.allSourceCode.join(","):this.sourceCode, //渠道名称（如果没选择的的话默认是全部）
          productCode: this.productCode, //产品名称
          isRenewPolicy: this.isRenewPolicy, //是否为续保保单（是‘1’，否‘0’，默认是‘all’）
          coStart: "", //是否为签约状态（这个可以不用管，请求的时候直接为空字符就好）
          pageIndex: 1, //分页（当前页码）
          pageSize: 10, //分页（当前展示多少页）
          token: this.getCookie("token"),//登录成功过后的储存在cookie里面的
        }
      }).then(res => {
        this.tableList=res.data.response.list;
        this.total=res.data.response.total;
        this.orderId=res.data.response.list.orderId;
        
        
      });
    },
    // 改变页码 数据更新
    changePage(val){
      this.axios({
        method: "post",
        url: "/api/operation/jdorders",
        data: {
          insurerPersonName: this.insurerPersonName, //投保人姓名
          insuredPersonName: this.insuredPersonName, //被保人姓名
          insurerPersonCard: this.insurerPersonCard, //投保人证件号
          insuredPersonCard: this.insuredPersonCard, //被保人证件号
          policyNo: this.policyNo, //保单号
          sts: this.sts, //保单状态
          dateStart: this.dateStart, //保单时间（初始日期）
          dateEnd: this.dateEnd, //保单时间（结束日期）
          sourceCode: this.sourceCode==""?this.allSourceCode.join(","):this.sourceCode, //渠道名称（如果没选择的的话默认是全部）
          productCode: this.productCode, //产品名称
          isRenewPolicy: this.isRenewPolicy, //是否为续保保单（是‘1’，否‘0’，默认是‘all’）
          coStart: "", //是否为签约状态（这个可以不用管，请求的时候直接为空字符就好）
          pageIndex: val, //分页（当前页码）
          pageSize: 10, //分页（当前展示多少页）
          token: this.getCookie("token") //登录成功过后的储存在cookie里面的
        }
      }).then(res => {
        this.tableList=res.data.response.list
        this.total=res.data.response.total
      })
    },
    // 点击查看页面跳转到订单详情页
    handleEdit(index,row){  
      let id=row.orderId
      this.$router.push(
        {path:'/userDetails',query:{id}});
    }
  },

  mounted() {
    this.axios
      .post("/api/operation/productAndChannel?channelSort=01")
      .then(res => {
        this.product = res.data.response.product;
        this.channel = res.data.response.channel;
        for(var i=0;i<this.channel.length;i++){
          this.allSourceCode.push(this.channel[i].comid)
        }
        // console.log(this.allSourceCode)
      })
      .catch(err => {
        console.log(err);
      });
     
  },

  components: {
    SideNav,
    HeaderLogo
  }
};
</script>

<style scoped>
/* 输入区 */
/* .channel_main{
  position: relative;
} */
.el-main {
  border: 1px solid #ccc;
  margin: 10px;
  float: right;
  position: relative;
  top: 60px;
}
.el-form{
  border: 1px solid #ccc;
  margin-bottom: 8px;
}
.el-form-item {
  margin-left: 15px;
  margin-top: 10px;
}

/* 表格 */
.el-button{
  margin: 2px;
  padding: 5px 10px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
/* 页码 */
.el-footer {
  margin-top: 10px;
  float: right;
}
</style>