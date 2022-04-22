<script setup>
import { useRoute } from 'vue-router'
import { storyData } from '@/stores/story'
import router from '../router';
import { ref } from 'vue';
const story = storyData()
const route = useRoute()
const theStory = route.params.id
const sugarcubeStory = new URL('./sugarcube-2-temp.txt', import.meta.url).href
const gameCode = ref('')
const play = ref(false)
const isLoading = ref(true)
sessionStorage.clear()
if (story.story[theStory].passage.length == 0) {
  router.back()
}
fetch(sugarcubeStory)
  .then(response => response.text())
  .then(data => {
    let passageDataNya = ''
    let passageDataNyaTmp = ''
    for (let i = 0;i < story.story[theStory].passage.length;i++) {
      let dataTmp = story.story[theStory].passage[i].data
      let dataTmpHtmlSafe = dataTmp.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&apos;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      passageDataNyaTmp = '<tw-passagedata pid="'+story.story[theStory].passage[i].pid+'" name="'+story.story[theStory].passage[i].name+'" tags="" position="100,100" size="100,100">'+dataTmpHtmlSafe+'</tw-passagedata>'
      passageDataNya = passageDataNya + passageDataNyaTmp
    }
    let realData = data.replace(/tweezelStoryTitle/g, story.story[theStory].title).replace(/tweezelStoryIfid/g, story.story[theStory].ifid).replace(/tweezelStoryStartNode/g, story.story[theStory].startNode).replace(/tweezelStoryUserStyle/g, story.story[theStory].userStyle).replace(/tweezelStoryUserScript/g, story.story[theStory].userScript).replace(/tweezelStoryPassage/g, passageDataNya)
    gameCode.value = realData
  });
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
    <div v-show="play" class="grow flex">
      <iframe id="storyWindow" class="grow" :srcdoc="gameCode" @load="gameReady()"></iframe>
    </div>
    <div v-show="!play" class="grow flex flex-col">
      <p class="grow-0 p-2 border-b-2 bg-black/20">Play Story</p>
      <div v-if="isLoading">Loading The Game... Please Wait A Bit...</div>
      <div class="grow flex flex-col m-5 gap-5" v-else>
        <button @click="play = true" class="bg-green-300 text-black p-2 rounded">Play The Story</button>
        <button @click="exportHTML()" class="bg-red-300 text-black p-2 rounded">Export The Story</button>
      </div>
    </div>
  </div>
</template>