<template>
  <el-container>
    <HeaderLogo />
    <el-container>
      <SideNav />
      <el-main>
        <!-- 详情 头部 -->
        <div  class="details_title">
          <i class="el-icon-s-custom"></i>
          <span type="primary "> 订单详情</span>
          <el-button size="mini" class="close" @click="closeDetails">关闭</el-button>
        </div>
        <el-divider></el-divider>
        <!-- 信息展示区 -->
        <el-collapse v-model="activeNames">
          <el-collapse-item name="1" :data="basicInfo">
            <span class="collapse_title" slot="title">基本信息</span>
            <el-row>
              <el-col :span="6">产品名称：{{basicInfo.productName}}</el-col>
              <el-col :span="6">订单号：{{basicInfo.orderNo}}</el-col>
              <el-col :span="6">保单号：{{basicInfo.policyNo}}</el-col>
              <el-col :span="6">订单时间：{{basicInfo.createdDate}}</el-col>
            </el-row>
            <el-row>
              <el-col 
                :span="6"
                >保单状态：{{basicInfo.policyStatus}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="6">支付时间：{{basicInfo.payDate}}</el-col>
              <el-col :span="6">应交保费：{{basicInfo.realPremium}}</el-col>
              <el-col :span="6">已交保费：{{basicInfo.premium}}</el-col>
              <el-col :span="6">退保金额：{{basicInfo.surrenderAmount}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="6">是否为续保保单：{{isRenewPolicy}}</el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item name="2" :data="insure">
            <span class="collapse_title" slot="title">投保人信息</span>
            <el-row>
              <el-col :span="6">投保人姓名：{{insure.name}}</el-col>
              <el-col :span="6">投保人证件类型：居民身份证</el-col>
              <el-col :span="6">投保人证件号码：{{insure.certiCode}}</el-col>
              <el-col :span="6">投保人出生日期：{{insure.birthdate}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="6">投保人性别：{{insure.sex}}</el-col>
              <el-col :span="6">联系电话：{{insure.cellphone}}</el-col>
              <el-col :span="6">联系邮箱：{{insure.email}}</el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item name="3" v-for="(item,index) in insured" :key="index">
            <span class="collapse_title" slot="title">被保人信息</span>
            <el-row>
              <el-col :span="6">被保人姓名：{{item.name}}</el-col>
              <el-col :span="6">投保人证件类型：居民身份证</el-col>
              <el-col :span="6">被保人证件号码：{{item.certiCode}}</el-col>
              <el-col :span="6">被保人出生日期：{{item.birthdate}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="6">被保人性别：{{item.sex}}</el-col>
              <el-col :span="6">子女排序：</el-col>
            </el-row>
          </el-collapse-item>  
        </el-collapse>
        <div class="button_style">
          <el-button type="warning" size="mini"  @click="dialog = true">
            <i class="el-icon-refresh-right"></i>
            <span>{{basicInfo.policyStatus=='1005'?'退保':'撤单'}}</span>
          </el-button>
          <el-button type="primary" size="mini" @click="Correction">
            <i class="el-icon-edit-outline"></i>
            <span>批改</span>
          </el-button>
        </div>
        <!-- 批改抽屉信息 -->
        <el-drawer
          :visible.sync="drawer"
          :with-header="false"
          size="550px">
          <el-form>
            <div class="title">保单信息批改</div>
              <el-form-item label="批改对象" v-model="correct"> 
                  <el-cascader
                    v-model="correctUser.value"
                    :options="correctUser"
                    @change="handleChange"
                    clearable>
                  </el-cascader>
              </el-form-item>
              <el-form-item label="批改内容">
                <el-checkbox-group  
                  v-model="checkedList" 
                  @change="handleCheckedChange">
                  <el-checkbox
                    v-model="checkedState"
                    v-for="item in checkedOptions"
                    :key="item"
                    :label="item"
                    ></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item>
                <el-row :gutter="5">
                  <el-col :span="12" 
                    v-if="correct=='被保人'"
                    >
                    <div class="before_correct">
                      <el-divider content-position="left">批改前数据</el-divider>
                      <div class="content">
                        <p>姓名：{{insuredName}}</p>
                        <p>性别：{{insuredSex}}</p>
                        <p>证件类型：居民身份证</p>
                        <p>证件号码：{{insuredCertiCode}}</p>
                        <p>手机号：</p>
                        <p>邮箱：</p>
                      </div>
                    </div>
                  </el-col>
                  <el-col 
                    :span="12" 
                    v-else>
                    <div class="before_correct">
                      <el-divider content-position="left">批改前数据</el-divider>
                      <div class="content" :data="insure"  >
                        <p>姓名：{{insure.name}}</p>
                        <p>性别：{{insure.sex}}</p>
                        <p>证件类型：居民身份证</p>
                        <p>证件号码：{{insure.certiCode}}</p>
                        <p>手机号：{{insure.cellphone}}</p>
                        <p>邮箱：{{insure.email}}</p>
                      </div>
                    </div>
                  </el-col>
                  
                  <el-col :span="12">
                    <div  class="before_correct">
                        <el-divider content-position="left">将批改成为</el-divider>
                        <el-form :inline="true" font-size="12px" 
                          v-for="item in checkedList"
                          :key="item"
                          >
                          <el-form-item label="姓名" v-if="item==='姓名'">
                            <el-input                        
                              clearable
                              size="mini"
                              v-model="afterCorrect.name"></el-input>
                          </el-form-item>
                          <el-form-item label="姓别" v-if="item==='性别'">
                            <el-radio v-model="afterCorrect.sex" label="男">男</el-radio>
                            <el-radio v-model="afterCorrect.sex" label="女">女</el-radio>
                          </el-form-item>
                          <el-form-item label="电话" v-if="item==='电话'">
                            <el-input
                              v-model="afterCorrect.cellphone"
                              clearable
                              size="mini">
                            </el-input>
                          </el-form-item>
                          <el-form-item label="邮箱" v-if="item==='邮箱'">
                            <el-input
                              v-model="afterCorrect.email"
                              clearable
                              size="mini">
                            </el-input>
                          </el-form-item>
                        </el-form>
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item class="button_correct">
                <el-button size="mini" @click="drawer = false">取消</el-button>
                <el-button type="primary" size="mini">确认修改</el-button>
              </el-form-item>
          </el-form>
        </el-drawer>
        <!-- 撤单/退保弹出框信息 -->
        <el-dialog
          title="退保确认"
          :visible.sync="dialog"
          width="500px">
          <h4>产品名称：{{basicInfo.productName}}</h4>
          <p>退保公式：  </p>
          <p>退保金=保险费 *（1-保单已过去天数/保险期间天数）*（1-退保费用0%）</p>
          <el-table size="mini" border>
            <el-table-column label="年度保费(元)"></el-table-column>
            <el-table-column label="保单经过天数"></el-table-column>
            <el-table-column label="保险期间天数"></el-table-column>
            <el-table-column label="退保金(元)"></el-table-column>
          </el-table>
          <div style="margin:10px 20px">
            <label> 退费方式 </label>
            <el-select size="mini" v-model="refund">
              <el-option value="不退费" disabled></el-option>
              <el-option value="银行卡退费"></el-option>
              <el-option value="支付宝退费"></el-option>
            </el-select>
          </div>
          <el-form :model="insure" :rules="rules" ref="ruleForm" size="mini" :inline="true">
            <el-form-item prop="name" label="开户人姓名" v-show="refund=='银行卡退费'">
              <el-input v-model="insure.name" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="银行卡卡号" prop="bankCad" v-show="refund=='银行卡退费'">
              <el-input 
                v-model="ruleForm.bankCad"
                style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="开户行" prop="bank" v-show="refund=='银行卡退费'">
              <el-select v-model="ruleForm.bank" style="width:160px">
                <el-option value="ruleForm.bank"></el-option>
              </el-select>-
              <el-select v-model="ruleForm.bank"  style="width:160px">
                <el-option value="ruleForm.bank"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="支付宝账号" prop="alipay" v-show="refund=='支付宝退费'">
              <el-input style="width:300px"></el-input>
            </el-form-item>
            <el-form-item prop="userName" label="用户名"  v-show="refund=='支付宝退费'">
              <el-input
                style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="退保时间">
              <el-date-picker
                v-model="ruleForm.date"
                prop="date"
                type="date"
                clearable
                size="mini"
                placeholder="退保时间"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
            <br/>
            <el-form-item>
              <el-checkbox label="验证码退保" v-model="verificationCode"></el-checkbox>
            </el-form-item>
            <br/>
            <el-form-item v-if="verificationCode" label="手机号">
              <el-input style="width:200px"></el-input>
              <el-button size="mini" type="primary">获取验证码</el-button>
              <span>验证码：</span>
            </el-form-item>
            <el-form-item label="退保备注">
              <el-input
                type="textarea"
                :rows="2"
                style="width:320px"  
                v-model="textarea">
              </el-input>
            </el-form-item>
            <el-form-item label="客户联系方式">
              <el-select size="small" v-model="period" style="width:290px">
                <el-option
                  v-for="item in contact"
                  :key="item.type"
                  :label="item.name"
                  :value="item.type"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="电话" v-show="period=='phone'">
              <el-input  style="width:340px"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" v-show="period=='email'">
              <el-input  style="width:340px"></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox label="不按退保公式退保" v-model="surrenderFormula"></el-checkbox>
            </el-form-item>
            <br/>
            <el-form-item v-if="surrenderFormula">
              <el-checkbox label="全额退保" checked></el-checkbox>
            </el-form-item>
            <el-form-item  label="申请原因" v-if="surrenderFormula">
              <el-input
                type="textarea"
                :rows="2"
                style="width:320px"  
                v-model="textarea">
              </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" >
            <el-button type="primary" @click="dialog = false" size="mini">确认提交</el-button>
            <el-button @click="dialog = false" size="mini">退保金试算</el-button>
            <el-button @click="dialog = false" size="mini">取消</el-button>
          </div>
        </el-dialog>
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
  name: "userDetails",
  data () {
    return {
      activeNames:['1','2','3'],//默认展开项
      drawer:false,//批改抽屉框状态
      dialog:false,//撤单/退保抽屉框状态

      policStatus: {//保单状态
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
      userSex:{//性别
        "M":"男",
        "F":"女"
      },
      
      checkedList:[],//多选框选中列表
      checkedOptions:["姓名","性别","电话","邮箱"],//多选框列表
      checkedState:false,//选中状态
      name:false,//姓名双向绑定
      sex:false,//姓别双向绑定显示隐藏
      cellphone:false,//电话双向绑定
      email:false,//邮箱双向绑定
      CorrectionTo:false,//批改成为列表默认隐藏

      orderId:this.$route.query.id,//id
      basicInfo:"",//基本信息
      insure:"",//投保人信息
      insured:"",//被保人信息
      isRenewPolicy:"",// 是否为续保保单
      policyNo:"",//保单号

      //单独取出批改页面投保人和被保人姓名/性别/证件号码
      insuredName:"",//被保人姓名
      insuredSex:"",//被保人性别
      insuredCertiCode:"",//被保人证件号码

      afterCorrect:"",//批改后信息
    
     
      correctUser:[//选择批改对象
        {
          label:"投保人",
          value:"投保人",
        },
        {
          label:"被保人",
          value:"被保人",
          children:[]
        },
      ],
      correct:"投保人",//批改对象默认展示为投保人
      verificationCode:"",//验证码退保
      textarea:"",//退保备注
      contact:[// 客户联系方式下拉
        {
          name:"电话",
          type:"phone"
        },
        {
          name:"邮箱",
          type:"email"
        },
        {
          name:"柜面",
          type:"cabinet"
        },
        {
          name:"在线",
          type:"online"
        },
      ],
      period:"",//客户联系方式 下拉默认 绑定
      refund:"银行卡退费",//退费方式默认为银行卡退费
      surrenderFormula:"",//不按退保公式退保

      ruleForm: { // 退保/撤单表单
        name: "", 
        bankCad:null,//银行卡号
        bank:"",//开户行
        alipay:"",//支付宝账号
        userName:"",//支付宝用户名
        date:"",//退保时间
      },
      rules: {  //表单验证规则
        name: [
          { required: true, message: '请输入开户人姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字', trigger: 'blur' }
        ], 
        bankCad: [
          { required: true, message: '请输入银行卡号', trigger: 'blur' },
          { min: 12, max: 19, message: '长度在 2 到 5 个字', trigger: 'blur' }
        ],
        bank: [
          { required: true, message: '请选择开户行', trigger: 'blur' },
        ],
        alipay: [
          { required: true, message: '请输入支付宝账号', trigger: 'blur' },
        ],
        userName: [
          { required: true, message: '请输入支付宝用户名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字', trigger: 'blur' }
        ],
        date: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        
      },
      
      // 时间选择处理禁选
      pickerOptions: {
        disabledDate(time) {
          return time.getTime()>Date.now() +3600 * 1000 * 24 ||time.getTime()<Date.now() -3600 * 1000 * 24 ;
        },
      },
    }
  },
  mounted () {
    
  },
  created () {
      this.axios.all([
        this.axios.post(`/api/operation/order/${this.orderId}`,{token:this.getCookie("token")}),
        // this.axios.post('/api/query/PayPeriod'),
        // this.axios.get('/coreapis/bank/getBank')
      ]) 
    .then(this.axios.spread((res,userResp)=>{
      console,log(res,userResp)
      this.basicInfo=res.data.response.basicInfo
      this.insure=res.data.response.insure
      this.insured=res.data.response.insured
      this.isRenewPolicy=res.data.response.isRenewPolicy
      //保单状态转换
      for(let keys in this.policStatus){
        if(this.basicInfo.policyStatus===keys){
          this.basicInfo.policyStatus=this.policStatus[keys]
        }
      }
      // 投保人性别转换
      for(let keys in this.userSex){
        if(this.insure.sex===keys){
          this.insure.sex=this.userSex[keys]
        }
      }
      // 循环获取下拉菜单 被保人信息
      for(let i=0;i<this.insured.length;i++){
        // 将被保人转换成对象存储
        // const obj2={
        //   name:this.insured[i].name,
        //   sex:this.insured[i].sex,
        //   certiCode:this.insured[i].certiCode,
        // }
        // console.log(obj2)
        for(let keys in this.userSex){
          if(this.insured[i].sex===keys){
            this.insured[i].sex=this.userSex[keys]
          }
        }
        this.insuredName=this.insured[i].name
        this.insuredSex=this.insured[i].sex
        this.insuredCertiCode=this.insured[i].certiCode

        // 将被保人姓名push到children中
        const obj={
          label:this.insured[i].name,
          value:this.insured[i].name
        }
        for(let keys of this.correctUser){
          if(keys.value=="被保人"){
            keys.children.push(obj)
          }
          // console.log(keys.value)
        }
      }
    }))
    
  },
  methods: {
    // 获取存储在cookie中的token
    getCookie(token) {
      var arr,
        reg = new RegExp("(^| )" + token + "=([^;]*)(;|$)");
        return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
    },
    // 点击关闭 跳转页面
    closeDetails(){
      window.location.href='/channel'
    },
    Correction(){
      this.drawer=true
    },
    // 选中批改对象改变页面信息
    handleChange(value){
      this.correct=value[0]
      this.checkedList=[]
      if(this.correct=="被保人"){
        this.checkedOptions=["姓名","性别"]
        for(let item of this.insured){
          if(item.name=value[1]){
            this.afterCorrect=item
            // console.log(item)
          }
        }
      }else{
        this.checkedOptions=["姓名","性别","电话","邮箱"]
        this.afterCorrect=this.insure
      }
      // console.log(this.afterCorrect)   
    },
    //复选框改变
    handleCheckedChange(val){
      this.checkedList=val
      
    }
    // 多选框改变显示信息
    // handleChecked(val){
    //   this.isIndeterminate=!this.isIndeterminate
    // }
  },
  components: {
    SideNav,
    HeaderLogo
  }
};
</script>

<style scoped>
.el-main {
  border: 1px solid #ccc;
  font-size: 12px;
  margin: 10px;
  float: right;
  position: relative;
  top: 60px;
}
.details_title{
  color:rgb(23, 155, 254);
  font-size: 14px;
}
.details_title span{
  margin-bottom: 5px;
  border-bottom: 2px solid rgb(23, 155, 254);
}
.close{
  float: right;
  position: relative;  
}

/* 信息展示区 */
.el-collapse{
  border: 1px solid #ccc;
}
.el-collapse-item{
  margin-left: 20px;
  font-size: 12px;
}
.collapse_title{
  flex: 1 0 90%;
  order: 1;
}
.el-collapse-item__header{
  flex: 1 0 auto;
  order: -1;
}

.el-row{
  margin-top: 10px;
  padding-left: 5px;
  font-size: 12px;
}
.button_style{
  margin-top: 40px;
  margin-bottom: 30px;
  position: relative;
  text-align: center;
}
/* 批改信息 */
.title{
  width: 100%;
  height: 50px;
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
}
.el-form-item{
  margin: 10px 10px;
}
.before_correct{
  border: 1px solid #ccc;
  height: 500px;
}
.content{
  margin-left: 5px;
}
.button_correct{
  float: right;
}
p,span{
  font-size: 12px;
}

</style>