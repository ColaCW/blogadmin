<template>
  <div>
    <el-table
      :data="tableData"
      stripe
      border
      v-loading="load"
      :header-cell-style="{background:'#F3F4F7',color:'#555'}"
      :row-style="rowStyle"
      :cell-style="cellStyle"
      style="font-size: 14px"
      @selection-change="handleSelectionChange"
      empty-text="当前数据没有，请添加数据">
      <slot/>
    </el-table>
    <!-- 分页 -->
    <div class="center" style="margin-top: 10px">
      <BasePagination
        :data="page"
        @change-size="handleSizeChange"
        @change-page="handleCurrentChange"
        @change-next="handelNext"
        @change-prev="handelPrev"
      />
    </div>
  </div>
</template>
<script>
  import BasePagination from '@/components/BasePagination'

  export default{
    name: 'BaseTable',
    props:{
      rowStyle: {
        default() {
          return {height:''}
        }
      },
      cellStyle: {
        default() {
          return {"height": "28px","line-height": "28px","padding": "5px 0"}
        }
      },
    },
    data(){
      return{
        tableData:[],
        chooseArray:[],
        page: {},
        load:false
      }
    },
    methods:{
      filData(data){
        this.tableData = data.row;
        this.page = data
        return this
      },
      wait() {
        this.load = true;
        return this
      },
      complete() {
        this.load = false;
        return this
      },
      handleSelectionChange(val) {
        this.chooseArray = val;
      },
      handleSizeChange(size) {
        this.$emit('chaneg-size', size)
      },
      handleCurrentChange(current) {
        this.$emit('chaneg-page', current)
      },
      handelNext(val) {
        this.$emit('change-next', val)
      },
      handelPrev(val) {
        this.$emit('change-prev', val)
      },
    },
    components: {
      BasePagination
    },
  }
</script>
