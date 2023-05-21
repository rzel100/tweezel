<script setup>
import { useRoute } from 'vue-router'
import { storyData } from '@/stores/story'
import { ref, watch } from 'vue';
const story = storyData()
const route = useRoute()
const theIfid = route.params.id
const findIfid = (element) => element.ifid == theIfid;
const theStory = story.story.findIndex(findIfid)

const chapbook_1 = new URL('./chapbook-1-temp.txt', import.meta.url).href
const harlowe_1 = new URL('./harlowe-1-temp.txt', import.meta.url).href
const harlowe_2 = new URL('./harlowe-2-temp.txt', import.meta.url).href
const harlowe_3 = new URL('./harlowe-3-temp.txt', import.meta.url).href
const snowman_1 = new URL('./snowman-1-temp.txt', import.meta.url).href
const snowman_2 = new URL('./snowman-2-temp.txt', import.meta.url).href
const sugarcube_1 = new URL('./sugarcube-1-temp.txt', import.meta.url).href
const sugarcube_2 = new URL('./sugarcube-2-temp.txt', import.meta.url).href

const gameCode = ref('')
const play = ref(false)
const isLoading = ref(true)
sessionStorage.clear()
const errornya = ref([])
function createTheStory(data) {
  let passageDataNya = ''
  let passageDataNyaTmp = ''
  for (let i = 0;i < story.story[theStory].passage.length;i++) {
    let dataTmp = story.story[theStory].passage[i].data
    let dataTmpHtmlSafe = dataTmp.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&apos;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    passageDataNyaTmp = '<tw-passagedata pid="'+story.story[theStory].passage[i].pid+'" name="'+story.story[theStory].passage[i].name+'" tags="" position="100,100" size="100,100">'+dataTmpHtmlSafe+'</tw-passagedata>'
    passageDataNya = passageDataNya + passageDataNyaTmp
  }
  let realData = data.replace(/tweezelStoryTitle/g, story.story[theStory].title).replace(/tweezelStoryIfid/g, story.story[theStory].ifid).replace(/tweezelStoryStartNode/g, story.story[theStory].startNode).replace(/tweezelStoryUserStyle/g, story.story[theStory].userStyle).replace(/tweezelStoryUserScript/g, story.story[theStory].userScript).replace(/tweezelStoryPassage/g, passageDataNya).replace(/tweezelVersion/g, '1.2.1')
  gameCode.value = realData
}
if (story.story[theStory].passage.length == 0) {
  errornya.value.push('No Passage To Play With. Add Some Passage First.')
}
if (!story.story[theStory].storyformats) {
  errornya.value.push('Story Formats Is Not Set. Set First In Global Story Setting.')
}

if (story.story[theStory].storyformats == 'chapbook-1') {
  fetch(chapbook_1)
    .then(response => response.text())
    .then(data => {
      createTheStory(data)
    });
} else if (story.story[theStory].storyformats == 'harlowe-1') {
  fetch(harlowe_1)
    .then(response => response.text())
    .then(data => {
      createTheStory(data)
    });
} else if (story.story[theStory].storyformats == 'harlowe-2') {
  fetch(harlowe_2)
    .then(response => response.text())
    .then(data => {
      createTheStory(data)
    });
} else if (story.story[theStory].storyformats == 'harlowe-3') {
  fetch(harlowe_3)
    .then(response => response.text())
    .then(data => {
      createTheStory(data)
    });
} else if (story.story[theStory].storyformats == 'snowman-1') {
  fetch(snowman_1)
    .then(response => response.text())
    .then(data => {
      createTheStory(data)
    });
} else if (story.story[theStory].storyformats == 'snowman-2') {
  fetch(snowman_2)
    .then(response => response.text())
    .then(data => {
      createTheStory(data)
    });
} else if (story.story[theStory].storyformats == 'sugarcube-1') {
  fetch(sugarcube_1)
    .then(response => response.text())
    .then(data => {
      createTheStory(data)
    });
} else if (story.story[theStory].storyformats == 'sugarcube-2') {
  fetch(sugarcube_2)
    .then(response => response.text())
    .then(data => {
      createTheStory(data)
    });
}

function gameReady() {
  isLoading.value = false
  if (story.playState == 'play') {
    play.value = true
  }
}

watch(() => gameCode.value, (gameCode) => {
  if (gameCode.length === 0) {
    return
  }
  if (story.playState === 'export') {
    exportHTML()
  }
})

function exportHTML() {
  let element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(gameCode.value));
  element.setAttribute('download', story.story[theStory].title+'.html');
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
</script>

<template>
  <div class="flex h-screen overflow-auto flex-col" :style='{height: story.innerHeight + "px"}'>

    <div v-if="errornya.length > 0" class="p-2">
      There Is Some Error In Your Story. Here Is The Error(s) :
      <div v-for="data, index in errornya" :key='index'>
        {{index + 1}}. {{data}}
      </div>
      <span class="text-primary-content underline" @click='$router.back()'>Click Here To Go Back.</span>
    </div>

    <div v-else class="grow flex flex-col">

      <div v-show="play" class="grow flex flex-col bg-white relative">
        <div class='absolute bottom-0 left-0'>
          <label for="close-modal" tabindex="0" class="btn btn-ghost btn-square btn-xs bg-black/20">
            <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3 text-white">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </label>
        </div>
        <iframe id="storyWindow" class="grow" :srcdoc="gameCode" @load="gameReady()"></iframe>
      </div>

      <div v-show="!play" class="grow flex flex-col">
        <div class="navbar bg-primary shadow-lg text-primary-content">
          <button tabindex="0" class="btn btn-ghost btn-square" @click='$router.back()'>
            <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 self-center m-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
            </svg>
          </button>
          <div class='grow truncate'>
            <div class="normal-case text-xl truncate px-0 font-semibold">Play Story</div>
          </div>
        </div>
        <div class='p-4' v-if="isLoading">Loading The Game... Please Wait A Bit...</div>
        <div class='p-4' v-else>
          <div class="alert alert-success shadow-lg">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Export Completed...</span>
            </div>
          </div>
        </div>
      </div>

    </div>

    <input type="checkbox" id="close-modal" class="modal-toggle" />
    <div class="modal modal-bottom sm:modal-middle">
      <div class="modal-box relative">
        <label for="close-modal" class="btn btn-error btn-sm btn-circle btn-ghost absolute right-2 top-2 text-error">✕</label>
        <h3 class="font-bold text-lg mb-4">Quit Preview...???</h3>
        <div class="modal-action">
          <label for="close-modal" class="btn btn-ghost">No.</label>
          <label @click="$router.back()" for="create-modal" class="btn btn-success">Yes.</label>
        </div>
      </div>
    </div>

  </div>
</template>