<script setup>
import { ref } from 'vue';
import { storyData } from '@/stores/story'

const story = storyData()
const installPrompt = ref(null)
const storageStatus = ref(story.maxStorage < 1 ? true : false)

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

/* Check The LocalStorage... */
function getUsedSpaceOfLocalStorageInBytes() {
    // Returns the total number of used space (in Bytes) of the Local Storage
    var b = 0;
    for (var key in window.localStorage) {
        // eslint-disable-next-line no-prototype-builtins
        if (window.localStorage.hasOwnProperty(key)) {
            b += key.length + localStorage.getItem(key).length;
        }
    }
    return b;
}

function getUnusedSpaceOfLocalStorageInBytes() {
  var maxByteSize = 10485760; // 10MB
  var minByteSize = 0;
  var tryByteSize = 0;
  var testQuotaKey = 'testQuota';
  var timeout = 20000;
  var startTime = new Date().getTime();
  var unusedSpace = 0;
  let runtime = 0
  do {
    runtime = new Date().getTime() - startTime;
    try {
      tryByteSize = Math.floor((maxByteSize + minByteSize) / 2);
      //localStorage.setItem(testQuotaKey, new Array(tryByteSize).join('1'));
      
      //Recommended by @pkExec and @jrob007
      localStorage.setItem(testQuotaKey, String('1').repeat(tryByteSize));
      minByteSize = tryByteSize;
    } catch (e) {
      maxByteSize = tryByteSize - 1;
    }
  } while ((maxByteSize - minByteSize > 1) && runtime < timeout);

  localStorage.removeItem(testQuotaKey);

  if (runtime >= timeout) {
    console.log("Unused Space Calculation May Be Off Due To Timeout.");
  }

  // Compensate for the byte size of the key that was used, then subtract 1 byte because the last value of the tryByteSize threw the exception
  unusedSpace = tryByteSize + testQuotaKey.length - 1;
  return unusedSpace;
}

function getLocalStorageQuotaInBytes() {
    // Returns the total Bytes of Local Storage Space that the browser supports
    var unused = getUnusedSpaceOfLocalStorageInBytes();
    var used = getUsedSpaceOfLocalStorageInBytes();
    var quota = unused + used;
    story.currentStorage = used
    story.maxStorage = quota
    storageStatus.value = false
    return quota;
}

if (storageStatus.value) {
  getLocalStorageQuotaInBytes()
} else {
  story.currentStorage = getUsedSpaceOfLocalStorageInBytes()
}
/* End Check The LocalStorage... */
</script>

<template>
  <div class="font-sans h-screen relative" :style='{height: story.innerHeight + "px"}' :data-theme='story.theme'>
    <div v-if="installPrompt" class='absolute bottom-0 w-full flex justify-center items-center p-2 z-50'>
      <div class="alert alert-success shadow-lg">
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

  <!-- <input type="checkbox" id="create-modal" class="modal-toggle" />
  <div :class="['modal modal-bottom sm:modal-middle ', storageStatus ? 'modal-open' : '']">
    <div class="modal-box relative flex flex-col items-center">
      <h3 class="font-bold text-lg mb-4 text-center">Please Give Me A Moment. Checking LocalStorage Space. It Takes Up To 20 Sec. This Message Will Close After It's Done.</h3>
      <progress class="progress w-56"></progress>
    </div>
  </div> -->
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