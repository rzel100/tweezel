<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="font-sans bg-gray-700 text-white h-screen">
    <RouterView>
    </RouterView>
  </div>
</template>

<style>
@import '@/assets/index.css';

body {
    line-height: 1.6;
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 15px;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>