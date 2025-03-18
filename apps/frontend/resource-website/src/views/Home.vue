<script setup lang="ts">
import { onMounted } from 'vue'
onMounted(() => {
  console.log(import.meta.env.MYAPP_BASE_URL)
})
</script>

<template>
  <div class="container">
    <div class="welcome-section">
      <h1 class="title">欢迎使用 ResourceWebsite</h1>
      <p class="subtitle">您的资源管理助手</p>
    </div>
    <div class="content-section">
      <div class="card">
        <div class="card-content">
          <h2>开始使用</h2>
          <p>在这里，您可以轻松管理和组织您的资源。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  flex: 1;
  padding: 32px;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
  gap: 24px;
  cursor: default;
  @media screen and (max-width: @--first-change-width) {
    padding: 16px;
    gap: 16px;
  }
}

.welcome-section {
  text-align: center;
  animation: fadeInDown 0.6s ease-out;

  .title {
    font-size: 32px;
    color: #2c3e50;
    margin-bottom: 12px;
    font-weight: 600;

    @media screen and (max-width: @--first-change-width) {
      font-size: 24px;
      margin-bottom: 8px;
    }
  }

  .subtitle {
    font-size: 18px;
    color: #606f7b;

    @media screen and (max-width: @--first-change-width) {
      font-size: 16px;
    }
  }
}

.content-section {
  animation: fadeInUp 0.6s ease-out;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  }

  .card-content {
    padding: 24px;

    @media screen and (max-width: @--first-change-width) {
      padding: 16px;
    }

    h2 {
      font-size: 24px;
      color: #2c3e50;
      margin-bottom: 16px;

      @media screen and (max-width:@--first-change-width) {
        font-size: 20px;
        margin-bottom: 12px;
      }
    }

    p {
      color: #606f7b;
      line-height: 1.6;

      @media screen and (max-width: @--first-change-width) {
        font-size: 14px;
        line-height: 1.5;
      }
    }
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
