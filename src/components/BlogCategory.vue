<template>
  <div class="container">
    <!--表格数据-->
    <div class="table">
      <div class="tableHead">
        <div class="btnGroup" v-if="rule">
            <el-button type="primary" size="medium" icon="el-icon-plus"  @click="doSearch()" >查询
            </el-button>
            <el-button type="primary" size="medium" icon="el-icon-plus"  @click="doCreate()" >新增
            </el-button>
            <el-button type="primary" size="medium" icon="el-icon-plus"  @click="doDelete()" >删除
            </el-button>
        </div>
      </div>
      <baseTable ref="table" style="width: 100%" @chaneg-size="changeSizeHandle" @chaneg-page="changePageHandle">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="name" label="姓名" min-width="150" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="age" label="年龄" min-width="150" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="sex" label="性别" min-width="150" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column label="操作" min-width="150" :show-overflow-tooltip="true" v-if="rule">
          <template slot-scope="scope">
            <el-button type="primary" size="small" icon="el-icon-plus"  @click="doUpdate(scope.row)" >编辑
            </el-button>
            <el-button type="danger" size="small" icon="el-icon-plus"  @click="doDelete(scope.row)" >删除
            </el-button>
          </template>
        </el-table-column>
      </baseTable>
    </div>
    <!--表格数据-->

    <!--新增区-->
    <el-dialog title="收货地址" :visible.sync="addDialogStatus">
      <el-form :model="addform" ref="addform">
        <el-form-item label="活动名称" >
          <el-input v-model="addform.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="addform.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogStatus = false">取 消</el-button>
        <el-button type="primary" @click="addDialogStatus = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--新增区-->

    <!--删除区-->
    <!--删除区-->

    <!--编辑区-->
    <el-dialog title="收货地址" :visible.sync="editDialogStatus">
      <el-form :model="editform" ref="addform">
        <el-form-item label="姓名" >
          <el-input v-model="editform.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" >
          <el-input v-model="editform.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" >
          <el-input v-model="editform.sex"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogStatus = false">取 消</el-button>
        <el-button type="primary" @click="addDialogStatus = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--编辑区-->

    <!--搜索区-->
    <el-dialog title="收货地址" :visible.sync="addDialogStatus">
      <el-form :model="addform" ref="addform">
        <el-form-item label="活动名称" >
          <el-input v-model="addform.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="addform.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogStatus = false">取 消</el-button>
        <el-button type="primary" @click="addDialogStatus = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--搜索区-->
  </div>
</template>

<script>
  import { Web } from "../../static/js/web.js";
  import BaseTable from '@/components/BaseTable';

  export default {
    data() {
      return {
        home:"SystemMenu",
        rule:Web.getValue("rule") == '1',
        addDialogStatus: false,
        editDialogStatus:false,
        searchDialogStatus: false,
        //查询表单
        searchform: {
          id: '',
          name: '',
          status: '',
          remark: '',
          createAt: '',
          createBy: ''
        },
        //新增表单
        addform: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        //修改表单
        editform:{},
        tableData:[],
        searchPage:{
          pageNum: 1,
          pageSize:10
        }
      }
    },
    components: {
      'baseTable': BaseTable
    },
    mounted: function () {
      window.vue = this;
      this.rule = true;
      this.init();
    },
    methods: {
      init(){
        let table = this.$refs["table"];
        table.wait();
        this.tableData = {
          row:[
            {name: 'Leo', age: 12, sex: 'man'},
            {name: 'Lei', age: 22, sex: 'women'},
            {name: 'Lei', age: 22, sex: 'women'},
            {name: 'Lei', age: 22, sex: 'women'},
            {name: 'Lei', age: 22, sex: 'women'},
            {name: 'Lei', age: 22, sex: 'women'},
            {name: 'Lei', age: 22, sex: 'women'},
            {name: 'Lei', age: 22, sex: 'women'},
            {name: 'Lei', age: 22, sex: 'women'},
            {name: 'Lii', age: 65, sex: 'men'}
          ],
          total:20,
          pageNum:1,
          pageSize:10
        };
        table.complete().filData(this.tableData);
      },
      //新增数据
      doCreate(){
        this.addform = {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        };
        this.addDialogStatus = true;
      },
      //删除数据
      doDelete(row){
        let table = this.$refs["table"];
        if(row){
          table.chooseArray = [row];
        }
        if(table.chooseArray.length > 0){
          this.$confirm('此操作将永久删除此数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            center: true,
            type: 'warning'
          }).then(() => {
            table.wait();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }else{
          this.$message.error('请选择删除项');
        }
      },
      //修改数据
      doUpdate(row){
        let table = this.$refs["table"];
        if(row){
          this.editform = row;
          this.editDialogStatus = true;
        }else{
          this.$message.error('获取数据失败');
        }
      },
      //查询数据
      doSearch() {
        let table = this.$refs["table"];
        table.wait();
        this.axios.get(Web.host + "/api/"+ this.home + "/search.do", null)
          .then(res =>{
            if(res.status){
              table.complete().filData(this.tableData);
            }
          })
          .catch(err =>{
            console.log(err);
          })
      },
      //重置表单111
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //改变条数
      changeSizeHandle(size){
        console.log(size)
        this.searchPage.pageSize = size;
        this.doSearch();
      },
      //跳转页数
      changePageHandle(page){
        console.log(page)
        this.searchPage.pageNum = page;
        this.doSearch();
      }
    }
  }
</script>
<style>
  .container {
    padding: 10px 20px;
  }
  .searchformbox {
    border: 1px solid #ddd;
    padding: 10px;
  }

</style>
