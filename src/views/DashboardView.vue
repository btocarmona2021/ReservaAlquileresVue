<script setup lang="ts">
import AsideComponent from "@/components/Aside/AsideComponent.vue";
</script>

<template>
  <div class="dashboard">
    <AsideComponent class="aside--component" />

    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
}

.aside--component {
  width: 14%;
}

.content {
  width: 84%;
}
</style>
