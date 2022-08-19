<template>
  <div class="login">
    <img class="login-img" src="@/assets/svg/login.svg" />
    <div class="login-form">
      <div class="title">Vue3系统</div>
      <n-form 
        ref="formRef"
        :model="model"
        :rules="rules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging">
        <n-form-item path="username" label="用户名">
          <n-input
            placeholder="admin"
            v-model:value="model.username"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="password" label="密码">
          <n-input
            placeholder="123456"
            v-model:value="model.password"
            type="password"
            @keydown.enter.prevent
          />
        </n-form-item>
      </n-form>
      <n-button class="button" type="primary" @click="handleLogin">登录</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { NForm, NFormItem, NInput, NButton, useMessage } from 'naive-ui';
import type { FormInst, FormRules } from 'naive-ui';
import http from '@/utils/request';

interface ModelType {
  username: string;
  password: string;
}

const message = useMessage();
const router = useRouter();
const formRef = ref<FormInst | null>(null);
const model = ref<ModelType>({
  username: '',
  password: ''
});


const rules: FormRules = {
  username: {
    required: true,
    message: "请输入用户名"
  },
  password: {
    required: true,
    message: "请输入密码"
  }
}

const handleLogin = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      // http.get("/user/login").then(res => {
      //   console.log("响应值：", res);
      // });
      const { username, password } = model.value;
      if (username !== "admin" && password !== "123456" ) {
        message.warning("用户名或密码错误！");
        return;
      };
      sessionStorage.setItem("token", "1234567890");
      router.push({path: "/"});
    } else {
      console.log(errors)
      console.log('验证失败');
    }
  })
}

</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &-img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  &-form {
    padding: 20px;
    width: 400px;
    height: 300px;
    border: 1px solid #eee;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      margin: 30px 0;
      font-size: 20px;
      font-weight: bold;
    }
    .button {
      margin-top: 20px;
    }
  }
}
</style>
