<template>
  <div class="header">
    <div class="header-left">Vue3-模拟商城</div>
    <div class="header-right">
      <n-avatar
        round
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01786557e4a6fa0000018c1bf080ca.png%401280w_1l_2o_100sh.png&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663419473&t=a00ffb5c08c1e5acb1646bbd4e80f534"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { NAvatar } from 'naive-ui';

</script>

<style scoped lang="scss">
.header {
  padding: 0 30px;
  width: 100%;
  height: 60px;
  border: 1px solid #eee;
  background-color: #00a971;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &-left {
    color: white;
    font-size: 20px;
    font-weight: bold;
  }
  
  &-right {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
