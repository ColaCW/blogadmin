<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="data.pageNum"
    :page-sizes="[5,10,20,50,100]"
    :page-size="data.pageSize"
    layout="prev, pager, next, jumper,sizes,total"
    :total="data.total"
    @next-click="handelNext"
    @prev-click="handelPrev"
  ></el-pagination>
</template>

<script>
  export default {
    name: 'pagination',
    props: {
      data: [Object, Array],
      changeSize: Function,
      changePage: Function
    },
    methods: {
      handleSizeChange(size) {
        this.$emit('change-size', size)
      },
      handleCurrentChange(current) {
        this.$emit('change-page', current)
      },
      handelNext() {
        this.$emit('change-next', 1)
      },
      handelPrev() {
        this.$emit('change-prev', -1)
      }
    }
  }
</script>

<style scoped>
</style>
