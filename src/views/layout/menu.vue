<template>
  <n-layout has-sider>
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :collapsed="collapsed"
      show-trigger
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <n-menu
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
        :render-icon="renderMenuIcon"
        :expand-icon="expandIcon"
        :value="currMenu"
        @update-value="updateValue"
      />
    </n-layout-sider>
  </n-layout>
</template>

<script setup lang="ts">
import { ref, h } from "vue";
import { useRouter } from 'vue-router';
import { NLayout, NLayoutSider, NMenu, NIcon } from "naive-ui";
import type { MenuOption } from "naive-ui";
import { CaretDownOutlined, AccountBookOutlined, AppstoreAddOutlined, TeamOutlined } from '@vicons/antd';

const router = useRouter();
const collapsed = ref(false);
const currMenu = ref("userList");
const menuOptions = [
  {
    label: '商品管理',
    key: 'good-manage',
    icon: () => h(AppstoreAddOutlined),
    children: [
      {
        label: '商品列表',
        key: 'goodList'
      }
    ]
  },
  {
    label: '订单管理',
    key: 'order-manage',
    icon: () => h(AccountBookOutlined),
    children: [
      {
        label: '订单列表',
        key: 'orderList'
      }
    ]
  },
  {
    label: '用户管理',
    key: 'user-manage',
    icon: () => h(TeamOutlined),
    children: [
      {
        label: '用户列表',
        key: 'userList'
      }
    ]
  }
];

const updateValue = (key: string, item: MenuOption) => {
  currMenu.value = key;
  router.push({path: key});
}

const renderMenuLabel = (option: MenuOption) => {
  if ('href' in option) {
    return h(
      'a',
      { href: option.href, target: '_blank' },
      option.label as string
    )
  }
  return option.label as string;
};

const renderMenuIcon = (option: MenuOption) => {
  // 渲染图标占位符以保持缩进
  // if (option.key === 'sheep-man') return true
  // // 返回 falsy 值，不再渲染图标及占位符
  if (!option.children) return true;
  return h(NIcon, null, { default: option.icon || null })
};

const expandIcon = () => {
  return h(NIcon, null, { default: () => h(CaretDownOutlined) })
};

</script>

<style scoped lang="scss"></style>
