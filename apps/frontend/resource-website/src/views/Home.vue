<script setup lang="ts">
import { onMounted } from 'vue'
onMounted(()=>{
  console.log(import.meta.env.MYAPP_BASE_URL)
})
</script>

<template>
  <div>
    我是主页
  </div>
</template>

<style scoped></style>
