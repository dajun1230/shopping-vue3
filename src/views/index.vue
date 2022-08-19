<template>
  <div class="shopping-home">
    <Header />
    <div class="shopping-home-content">
      <div class="layout-left">
        <Menu />
      </div>
      <div class="layout-right">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from '@/views/layout/header.vue';
import Menu from '@/views/layout/menu.vue';
</script>

<style scoped lang="scss">
.shopping-home {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  &-content {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    .layout-left {
      max-width: 240px;
      height: 100%;
      aside {
        height: 100%;
      }
    }
    .layout-right {
      flex: 1;
      height: 100%;
      background-color: #eee;
      overflow: hidden;
    }
  }
}
</style>
