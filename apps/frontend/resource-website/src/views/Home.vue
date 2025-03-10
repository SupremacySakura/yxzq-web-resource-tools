<script setup lang="ts">
import yxzqUtils from 'yxzq-utils-browser'
import { ref, onMounted } from 'vue'
const fileList = ref<string[]>([])
onMounted(() => {
  yxzqUtils.getFilePath().then((res) => {
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
        <img :src="item" alt="">
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
