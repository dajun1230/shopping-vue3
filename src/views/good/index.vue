<template>
  <div class="good-manage">
    <div class="head">
      <n-space>
        <n-button type="primary">新增商品</n-button>
        <n-button strong secondary>批量导入</n-button>
      </n-space>
    </div>
    <div class="content">
      <n-data-table
        bordered
        :columns="columns"
        :data="goodList"
        :pagination="pagination"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { h, onMounted, ref } from "vue";
import { NSpace, NButton, NDataTable, useMessage } from 'naive-ui';
import type { DataTableColumns } from 'naive-ui';

interface Good {
  
}

const goodList = ref([]);
const pagination = ref({
  page: 1,
  limit: 10,
});
const columns:  DataTableColumns<Good> = [
  {
    title: "商品名称",
    key: "name"
  },
  {
    title: "商品分类",
    key: "type"
  },
  {
    title: "数量",
    key: "count"
  },
  {
    title: "价格",
    key: "price"
  },
  {
    title: "商品图片",
    key: "image"
  },
];


</script>

<style scoped lang="scss">
.good-manage {
  box-sizing: border-box;
  padding: 20px;
  height: 100%;
  overflow: auto;
  .head {
    margin-bottom: 20px;
  }
  .content {
    padding: 20px;
    border-radius: 4px;
    background-color: #fff;
  }
}
</style>
