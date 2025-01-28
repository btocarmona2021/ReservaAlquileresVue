<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import HeaderComponent from '@/components/Header/HeaderComponent.vue';
import FooterComponent from '@/components/Footer/FooterComponent.vue';


</script>
<template>
  <header-component/>
  <RouterView />
  <footer-component/>
</template>



<style scoped>

</style>
