<script setup lang="ts">
import { RouterView } from 'vue-router'
import SideBar from '../components/SideBar.vue'
</script>

<template>
  <div class="main">
    <SideBar></SideBar>
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
.main {
  width: 100vw;
  height: 100vh;
  display: flex;
}
</style>
