<script setup>
//import { RouterLink, RouterView } from 'vue-router'
/*
<RouterLink to="/">Home</RouterLink>
<RouterLink to="/about">About</RouterLink>
*/

import { RouterView } from 'vue-router'
</script>

<template>
  <div font-sans>

    <RouterView />

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