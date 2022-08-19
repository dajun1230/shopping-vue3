<template>
  <div class="user-manage">
    <div class="head">
      <n-space>
        <n-button type="primary" @click="showModal = true">新增用户</n-button>
        <n-button strong secondary>批量导入</n-button>
      </n-space>
    </div>
    <div class="content">
      <n-data-table
        bordered
        :columns="columns"
        :data="userList"
        :pagination="pagination"
      />
    </div>
    <AddModal :showModal="showModal" @onCloseModal="onCloseModal" />
  </div>
</template>

<script setup lang="ts">
import { h, onMounted, ref } from "vue";
import { NSpace, NButton, NDataTable, useMessage } from 'naive-ui';
import type { DataTableColumns } from 'naive-ui';
import AddModal from './add-model.vue';
import http from "@/utils/request";

  type User = {
  id: string;
  username: string;
  age: number;
  sex: 0 | 1;
  phone: string;
  email: string;
  }

  const message = useMessage();
  const showModal = ref(false);
  const userList = ref<User[]>([]);
  const pagination = ref({
    page: 1,
    limit: 10
  });

  onMounted(() => {
    initData();
  });

  const initData = async () => {
    const res: any = await http.get("/user/list", { ...pagination.value });
    const { code, data = [], msg } = res;
    if (code === 200) {
      userList.value = data;
    } else {
      message.error(msg || "请求出错");
    }
  }

  const columns: DataTableColumns<User> = [
  {
    title: '用户名',
    key: 'username'
  },
  {
    title: '性别',
    key: 'sex',
    render: (row) => {
      return h("div", null, row.sex === 0 ? "男": "女");
    }
  },
  {
    title: '手机号码',
    key: 'phoneNumber'
  },
  {
    title: '邮箱',
    key: 'email'
  },
  {
    title: '操作',
    key: 'action',
    render: (row) => {
      return h(NButton, {
              color: "red",
              strong: true,
              tertiary: true,
              size: "small",
              disabled: row.id === "1",
              onClick: () => handleDeleteUser(row.id),
            },
            { default: () => "删除" });
    }
  }
  ];


  const onCloseModal = (bol: boolean) => {
    showModal.value = false;
    bol && initData();
  }

  const handleDeleteUser = async (id: string) => {
    const res: any = await http.delete(`/user/delete/${id}`);
    const { code, msg } = res;
    if (code === 200) {
       message.success("操作成功");
       initData();
    } else {
      message.error(msg || "请求出错");
    }
  }

</script>

<style scoped lang="scss">
.user-manage {
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
