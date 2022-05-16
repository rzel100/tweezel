<script setup>
import { useRoute } from 'vue-router'
import { storyData } from '@/stores/story'
import router from '../router';
import { ref } from 'vue';
const story = storyData()
const route = useRoute()
const theStory = route.params.id

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
  let realData = data.replace(/tweezelStoryTitle/g, story.story[theStory].title).replace(/tweezelStoryIfid/g, story.story[theStory].ifid).replace(/tweezelStoryStartNode/g, story.story[theStory].startNode).replace(/tweezelStoryUserStyle/g, story.story[theStory].userStyle).replace(/tweezelStoryUserScript/g, story.story[theStory].userScript).replace(/tweezelStoryPassage/g, passageDataNya).replace(/tweezelVersion/g, '1.0.1')
  gameCode.value = realData
}
if (story.story[theStory].passage.length == 0) {
  errornya.value.push('No Passage To Play With. Add Some Passage First.')
  //router.back()
}
if (!story.story[theStory].storyformats) {
  errornya.value.push('Story Formats Is Not Set. Set First In Global Story Setting.')
  //router.back()
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
}
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
  <div class="flex h-screen overflow-auto flex-col">
    <div v-if="errornya.length > 0" class="p-2">
      There Is Some Error In Your Story. Here Is The Error(s) :
      <div v-for="data, index in errornya">
        {{index + 1}}. {{data}}
      </div>
    </div>
    <div v-else class="grow flex flex-col">
      <div v-show="play" class="grow flex bg-white">
        <iframe id="storyWindow" class="grow" :srcdoc="gameCode" @load="gameReady()"></iframe>
      </div>
      <div v-show="!play" class="grow flex flex-col">
        <p class="grow-0 p-2 border-b-2 bg-black/20">Play Story</p>
        <div v-if="isLoading">Loading The Game... Please Wait A Bit...</div>
        <div class="grow flex flex-col m-5 gap-5 text-black" v-else>
          <button @click="play = true" class="bg-green-300 p-2 rounded">Play The Story</button>
          <button @click="exportHTML()" class="bg-red-300 p-2 rounded">Export The Story</button>
        </div>
      </div>
    </div>
  </div>
</template>