<template>
  <div class="container">
    <!--表格数据-->
    <div class="table">
      <div class="tableHead">
        <div class="btnGroup" v-if="rule">
          <el-button type="primary" size="medium" icon="el-icon-search"  @click="searchDialogStatus = true" >查询
          </el-button>
          <el-button type="primary" size="medium" icon="el-icon-plus"  @click="goAddHtml('')" >新增
          </el-button>
          <el-button type="primary" size="medium" icon="el-icon-delete"  @click="doDelete()" >删除
          </el-button>
        </div>
      </div>
      <baseTable ref="table" style="width: 100%" @chaneg-size="changeSizeHandle" @chaneg-page="changePageHandle" @cell-dblclick="copyCellData">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="ID" min-width="150" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="name" label="标题" min-width="150" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="blogCategoryObj.name" label="分类" min-width="80" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="viewNum" label="观看数" min-width="80" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="likeNum" label="点赞数" min-width="80" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="status" label="发布状态" min-width="150" align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-text="已发布"
              inactive-text="未发布"
              active-value="2"
              inactive-value="0"
              @change="changeStatus($event,scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="createAt" label="发布时间" min-width="150" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作" min-width="150" :show-overflow-tooltip="true" align="center" v-if="rule">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit-outline"  @click="goAddHtml(scope.row)" >编辑
            </el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete"  @click="doDelete(scope.row)" >删除
            </el-button>
          </template>
        </el-table-column>
      </baseTable>
    </div>
    <!--表格数据-->

    <!--搜索区-->
    <el-dialog :title="'搜索'+homeName" :visible.sync="searchDialogStatus" width="505px">
      <el-form :inline="true" :model="searchform" ref="searchform">
        <el-form-item label="ID">
          <el-input v-model="searchform.id"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="searchform.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="searchDialogStatus = false">取 消</el-button>
        <el-button type="primary" @click="doSearch();searchDialogStatus = false">确 定</el-button>
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
        home:"Blog",
        homeName:"博客",
        token:Web.getToken(),
        rule:Web.getValue("rule") == '1',
        searchDialogStatus: false,
        //查询表单
        searchform: {
          id: '',
          name: '',
          page:1,
          pageSize:10
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
      }
    },
    components: {
      'baseTable': BaseTable
    },
    mounted: function () {
      let that = this;
      window.vue = that;
      that.rule = true;
      that.init();
    },
    methods: {
      init(){
        let that = this;
        that.doSearch();
      },
      //新增数据
      doCreate(){
        let that = this;
        that.addform = {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        };
        that.addDialogStatus = true;
      },
      //删除数据
      doDelete(row){
        let that = this;
        let table = that.$refs["table"];
        if(row){
          table.chooseArray = [row];
        }
        if(table.chooseArray.length > 0){
          that.$confirm('确定删除这'+ table.chooseArray.length +'条数据?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            center: true,
            type: 'warning'
          }).then(() => {
            var id = "";
            for(let i = 0;i<table.chooseArray.length;i++){
              if(i > 0){
                id+=","
              }
              id+=table.chooseArray[i].id
            }
            var data = {
              token:that.token,
              id:id
            };
            that.axios.post(Web.host + "/api/"+ that.home + "/delete.do", data)
              .then(function (res) {
                if(res.data.status){
                  that.$message({
                    type: 'success',
                    message: '删除成功'
                  });
                  that.searchform.page = 1;
                  that.doSearch();
                }else{
                  that.$message({
                    showClose: true,
                    message: '删除失败,请联系管理员',
                    type: 'error'
                  });
                }
              })
          }).catch(() => {})
        }else{
          that.$message({
            showClose: true,
            message: '请选择删除项',
            type: 'error'
          });
        }
      },
      //前往编辑页面
      goAddHtml(row){
        window.open("static/addBlog.html?id="+row.id);
      },
      //查询数据
      doSearch() {
        let that = this;
        let table = that.$refs["table"];
        table.wait();
        that.axios.post(Web.host + "/api/"+ that.home + "/search.do", that.searchform)
          .then(function (res) {
            if(res.data.status){
              table.complete().filData(res.data.data);
            }else{
              that.$message({
                showClose: true,
                message: '查询失败,请联系管理员',
                type: 'error'
              });
            }

          })
      },
      //切换发布状态
      changeStatus(status,obj){
        let that = this;
        let table = that.$refs["table"];
        table.wait();
        obj.status = status;
        let data = {
          obj:obj,
          token:that.token
        };
        that.axios.post(Web.host + "/api/"+ that.home + "/update.do", data)
          .then(function (res) {
            table.complete();
            if(res.data.status){
              that.$message({
                showClose: true,
                message: '切换成功',
                type: 'success'
              });
            }else{
              that.$message({
                showClose: true,
                message: '切换失败',
                type: 'error'
              });
            }
          })
      },
      //双击表格复制文本
      copyCellData(row, column, cell, event){
        let that = this;
        let text = $(cell).children(".cell").html();
        if(window.clipboardData){
          window.clipboardData.setData('text',text);
        }else{
          (function(s){
            document.oncopy=function(e){
              e.clipboardData.setData('text',text);
              e.preventDefault();
              document.oncopy=null;
            }
          })(text);
          document.execCommand('Copy');
        }
        that.$message({
          showClose: true,
          message: '复制成功',
          type: 'success'
        });
      },
      //重置表单
      resetForm(formName) {
        let that = this;
        that.$refs[formName].resetFields();
      },
      //改变条数
      changeSizeHandle(size){
        let that = this;
        that.searchform.pageSize = size;
        that.doSearch();
      },
      //跳转页数
      changePageHandle(page){
        let that = this;
        that.searchform.page = page;
        that.doSearch();
      }
    }
  }
</script>
<style>
  .container {
    padding: 10px 20px;
  }
</style>
