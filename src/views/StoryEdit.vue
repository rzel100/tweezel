<script setup>
import { useRoute } from 'vue-router'
import { storyData } from '@/stores/story'
import { ref } from 'vue';
//import router from '../router';
const story = storyData()
const route = useRoute()
const theStory = route.params
const passageNames = ref(story.story[theStory.id].passage[theStory.pid].name)

function setTitle() {
  if (passageNames.value) {
    story.story[theStory.id].passage[theStory.pid].name = passageNames.value
  }
}
</script>

<template>
  <div class="h-screen flex flex-col">
    <div class="flex bg-black/25">
      <p class="text-xl grow self-center p-1">Editing Passage</p>
    </div>
    <div class="flex justify-center m-2 text-xs">
      <p class="self-center text-center">Passage Names</p>
      <input type="text" placeholder="Passage Title Must Not Empty" v-model="passageNames" class="font-mono bg-transparent p-1 outline-none border rounded w-full placeholder:italic placeholder:text-slate-300"/>
      <button @click="setTitle" class="self-center rounded bg-green-300 text-black p-2">Set</button>
    </div>
    <div class="flex justify-start m-2 text-xs">
      <button v-if="story.isWrap" @click="story.isWrap = false" class="flex flex-row rounded bg-green-300 text-black p-1">Wrap <svg class="h-4 w-4 self-center ml-1" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg></button>
      <button v-if="!story.isWrap" @click="story.isWrap = true" class="flex flex-row rounded bg-green-300 text-black p-1">Wrap <svg class="h-4 w-4 self-center ml-1" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg></button>
    </div>
    <textarea type="textarea" v-model="story.story[theStory.id].passage[theStory.pid].data" :class="[story.isWrap ? 'whitespace-pre' : '', 'text-xs font-mono bg-transparent p-1 outline-none border rounded w-full resize-none grow']"></textarea>
  </div>
</template>