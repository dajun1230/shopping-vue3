<template>
  <n-modal
    :show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="新增用户"
    positive-text="确定"
    negative-text="取消"
    style="width: 500px;"
    @close="closeModal"
    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
  >
    <div class="content">
      <n-form 
      ref="formRef"
      :model="model"
      :rules="rules"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging">
        <n-form-item  path="username" label="用户名">
          <n-input
            placeholder="请输入用户名"
            v-model:value="model.username"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item  path="password" label="密码">
          <n-input
            placeholder="请输入密码"
            v-model:value="model.password"
            type="password"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item  path="sex" label="性别">
          <n-radio-group v-model:value="model.sex" name="sex">
            <n-space>
              <n-radio value="0">
                男
              </n-radio>
              <n-radio value="1">
                女
              </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>
        <n-form-item  path="email" label="邮箱">
        <n-input
          placeholder="请输入邮箱"
          v-model:value="model.email"
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-form-item  path="phoneNumber" label="电话号码">
        <n-input
          placeholder="请输入电话号码"
          v-model:value="model.phoneNumber"
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-form-item  path="avatar" label="用户头像">
        <n-input
          placeholder="请输入用户头像"
          v-model:value="model.avatar"
          @keydown.enter.prevent
        />
      </n-form-item>
    </n-form>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NModal, NForm, NFormItem, NInput, NRadioGroup, NRadio, NSpace, useMessage } from 'naive-ui';
import type { FormInst, FormRules } from 'naive-ui';
import http from '@/utils/request';

interface ModelType {
  username: string;
  password: string;
  sex: number;
  email: string;
  phoneNumber: string;
  avatar: string;
}

const { showModal,  } = defineProps({
  showModal: Boolean,
});
const emits = defineEmits(["onCloseModal"]);
const formRef = ref<FormInst | null>(null);
const model = ref<ModelType>({
  username: '',
  password: '',
  sex: 0,
  email: '',
  phoneNumber: '',
  avatar: ''
});
const message = useMessage();

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

const onPositiveClick = async () => {
  formRef.value?.validate(async error => {
    if (!error?.length) {
      const res: any = await http.post("/user/add", {...model.value});
      if (res.code === 200) {
        message.success("操作成功");
        onNegativeClick();
        return;
      }
      message.error("操作失败");
    } else {
      console.log("请完善信息");
    }
  })
}

const closeModal = () => {
   emits("onCloseModal");
}

const onNegativeClick = () => {
  emits("onCloseModal", true);
}
</script>

<style scoped lang="scss">
.content{
  margin-top: 20px;
}
</style>
