<script setup>
import { ref } from 'vue';
import { storyData } from '@/stores/story'

const story = storyData()
const installPrompt = ref(null)

window.addEventListener("beforeinstallprompt", e => {
  if (story.askInstall) {
    e.preventDefault();
    installPrompt.value = e;
  }
});

window.addEventListener("appinstalled", () => {
  installPrompt.value = null;
});

window.addEventListener("resize", () => {
  story.innerHeight = window.innerHeight
});

const neverIntall = () => {
  installPrompt.value = null
  story.askInstall = false
}

story.innerHeight = window.innerHeight
</script>

<template>
  <div class="font-sans h-screen relative" :style='{height: story.innerHeight + "px"}' :data-theme='story.theme'>
    <div v-if="installPrompt" class='absolute bottom-0 w-full flex justify-center items-center p-2 z-50'>
      <div role='alert' class="alert alert-success shadow-lg flex flex-row">
        <div>
          <span>Install TweezeL To Ur Device !. It Doesn't Take Storage And Work Offline !.</span>
        </div>
        <div class="flex-none">
          <button @click="neverIntall()" class="btn btn-sm btn-ghost">Never</button>
          <button @click="installPrompt = null" class="btn btn-sm btn-ghost">Deny</button>
          <button @click="installPrompt.prompt()" class="btn btn-sm btn-primary">Install</button>
        </div>
      </div>
    </div>
    <RouterView>
    </RouterView>
  </div>
</template>

<style>
body {
  line-height: 1.6;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 14px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>