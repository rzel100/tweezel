<script setup>
import { ref } from 'vue';
import { storyData } from '@/stores/story'
import { createToaster } from "@meforma/vue-toaster";

const story = storyData()
const installPrompt = ref(null)
const toaster = createToaster({
  position : 'top',
  duration : 2000,
  dismissible : true
});

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

function cleaningStoryFormats(data){
  let result = {}
  if (data.split(`"setup": function(){`).length > 1) {
    result = data.split(`"setup": function(){`)[0].slice(0, -1) + '}'
    result = result.slice(19); 
    result = JSON.parse(result)
  } else {
    result = data.substring(data.length - 1) == ";" ? data.slice(0, -2) : data.slice(0, -1)
    result = result.slice(19); 
    result = JSON.parse(result)
  }
  return result
}

const chapbook_1 = "https://raw.githubusercontent.com/klembot/twinejs/dc8aaeae7c3c279e12f04f74093e315027b8e15d/public/story-formats/chapbook-1.2.3/format.js"
const chapbook_2 = "https://raw.githubusercontent.com/klembot/twinejs/911d18bc4994f1648137da4cacb66fced9086f6f/public/story-formats/chapbook-2.2.0/format.js"
const harlowe_1 = "https://raw.githubusercontent.com/klembot/twinejs/28074261074cf22e46779c0efc2442afe015b74c/public/story-formats/harlowe-2.1.0/format.js"
const harlowe_2 = "https://raw.githubusercontent.com/klembot/twinejs/28074261074cf22e46779c0efc2442afe015b74c/public/story-formats/harlowe-2.1.0/format.js"
const harlowe_3 = "https://raw.githubusercontent.com/klembot/twinejs/60c3cadc308ec9ceafb0406c5c1ef58eaa828d2e/public/story-formats/harlowe-3.3.9/format.js"
const snowman_1 = "https://raw.githubusercontent.com/klembot/twinejs/dd79dc7073115b1acfc82f25dace9838c241e056/public/story-formats/snowman-1.4.0/format.js"
const snowman_2 = "https://raw.githubusercontent.com/klembot/twinejs/dd79dc7073115b1acfc82f25dace9838c241e056/public/story-formats/snowman-2.0.2/format.js"
// const sugarcube_1 = "https://raw.githubusercontent.com/klembot/twinejs/c5a2c90b86bb1d3d50169b0fe3988d3434c23127/public/story-formats/sugarcube-1.0.35/format.js"
const sugarcube_2 = "https://raw.githubusercontent.com/klembot/twinejs/b2f8717bde8f0ef16ca78d9b99b6139c3bd05321/public/story-formats/sugarcube-2.37.3/format.js"
story.storyFormatList.forEach(storyList => {
  if (storyList.val == 'chapbook-1' && !storyList.finishGet) {
    fetch(chapbook_1)
      .then(response => response.text())
      .then(data => {
        let theResult = cleaningStoryFormats(data)
        storyList.finishGet = true
        storyList.data = theResult
      }).catch((error) => {
        toaster.error(`Something wrong... Check your internet connection...`)
        console.log('error', error)
      });
  }
  if (storyList.val == 'chapbook-2' && !storyList.finishGet) {
    fetch(chapbook_2)
      .then(response => response.text())
      .then(data => {
        let theResult = cleaningStoryFormats(data)
        storyList.finishGet = true
        storyList.data = theResult
      }).catch((error) => {
        toaster.error(`Something wrong... Check your internet connection...`)
        console.log('error', error)
      });
  }
  if (storyList.val == 'harlowe-1' && !storyList.finishGet) {
    fetch(harlowe_1)
      .then(response => response.text())
      .then(data => {
        let theResult = cleaningStoryFormats(data)
        storyList.finishGet = true
        storyList.data = theResult
      }).catch((error) => {
        toaster.error(`Something wrong... Check your internet connection...`)
        console.log('error', error)
      });
  }
  if (storyList.val == 'harlowe-2' && !storyList.finishGet) {
    fetch(harlowe_2)
      .then(response => response.text())
      .then(data => {
        let theResult = cleaningStoryFormats(data)
        storyList.finishGet = true
        storyList.data = theResult
      }).catch((error) => {
        toaster.error(`Something wrong... Check your internet connection...`)
        console.log('error', error)
      });
  }
  if (storyList.val == 'harlowe-3' && !storyList.finishGet) {
    fetch(harlowe_3)
      .then(response => response.text())
      .then(data => {
        let theResult = cleaningStoryFormats(data)
        storyList.finishGet = true
        storyList.data = theResult
      }).catch((error) => {
        toaster.error(`Something wrong... Check your internet connection...`)
        console.log('error', error)
      });
  }
  if (storyList.val == 'snowman-1' && !storyList.finishGet) {
    fetch(snowman_1)
      .then(response => response.text())
      .then(data => {
        let theResult = cleaningStoryFormats(data)
        storyList.finishGet = true
        storyList.data = theResult
      }).catch((error) => {
        toaster.error(`Something wrong... Check your internet connection...`)
        console.log('error', error)
      });
  }
  if (storyList.val == 'snowman-2' && !storyList.finishGet) {
    fetch(snowman_2)
      .then(response => response.text())
      .then(data => {
        let theResult = cleaningStoryFormats(data)
        storyList.finishGet = true
        storyList.data = theResult
      }).catch((error) => {
        toaster.error(`Something wrong... Check your internet connection...`)
        console.log('error', error)
      });
  }
  if (storyList.val == 'sugarcube-2' && !storyList.finishGet) {
    fetch(sugarcube_2)
      .then(response => response.text())
      .then(data => {
        let theResult = cleaningStoryFormats(data)
        storyList.finishGet = true
        storyList.data = theResult
      }).catch((error) => {
        toaster.error(`Something wrong... Check your internet connection...`)
        console.log('error', error)
      });
  }
})

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