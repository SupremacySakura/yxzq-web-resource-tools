<script setup lang="ts">
import yxzqUtils from '@yxzq-web-resource-tools/yxzq-utils-browser'
import { ref, onMounted } from 'vue'
const fileList = ref<string[]>([])
const uploadFile = ref<File>()
const setFile = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files) {
    uploadFile.value = target.files[0]
  }
}
const handleUploadFile = () => {
  if (uploadFile.value) {
    yxzqUtils.uploadResource(uploadFile.value).then((res) => {
      console.log(res)
    })
  }
}
onMounted(() => {
  yxzqUtils.getFilePath({
    extNameConfig: 'all'
  }).then((res) => {
    console.log(res)
    fileList.value = res.files
  })
})
</script>

<template>
  <div>
    我是home
    <ul>
      <li v-for="(item, index) of fileList" :key="item + index">
        <a :href="item">{{ item }}</a>
      </li>
    </ul>
    <input type="file" @change="setFile">
    <button @click="handleUploadFile">上传</button>
  </div>
</template>

<style scoped></style>
