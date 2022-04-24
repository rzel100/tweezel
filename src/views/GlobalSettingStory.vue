<script setup>
import { useRoute } from 'vue-router'
import { storyData } from '@/stores/story'
import { ref } from 'vue';
const story = storyData()
const route = useRoute()
const mode = ref('setting')
const isWrap = ref(true)
const theStory = route.params
const storyNames = ref(story.story[theStory.id].title)

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
function setTitle() {
  if (storyNames.value) {
    story.story[theStory.id].title = storyNames.value
  }
}
</script>

<template>
  <div class="h-screen flex flex-col">
    <div class="flex bg-black/25">
      <p class="text-xl grow self-center p-1">Global Story Setting</p>
    </div>
    <div class="flex">
      <button @click="mode = 'setting'" :class="[mode == 'setting' ? 'text-green-300' : 'border-b-2 bg-black/20', 'grow']">Setting</button>
      <button @click="mode = 'css'" :class="[mode == 'css' ? 'text-green-300' : 'border-b-2 bg-black/20', 'grow']">CSS</button>
      <button @click="mode = 'js'" :class="[mode == 'js' ? 'text-green-300' : 'border-b-2 bg-black/20', 'grow']">Javascript</button>
    </div>
    <div class="p-1 w-full grow text-xs overflow-auto" v-if="mode == 'setting'">
      <p class="p-1">Story Title</p>
      <div class="flex justify-center text-xs">
        <input type="text" placeholder="Story Title Must Not Empty" v-model="storyNames" class="font-mono bg-transparent p-1 outline-none border rounded w-full placeholder:italic placeholder:text-slate-300"/>
        <button @click="setTitle" class="self-center rounded bg-green-300 text-black p-2">Set</button>
      </div>
      <p class="p-1 mt-2">Story Will Start At</p>
      <select v-model="story.story[theStory.id].startNode" class="font-mono bg-transparent p-1 outline-none border rounded w-full">
      <option class="bg-gray-700" v-for="data in story.story[theStory.id].passage" :value="data.pid">{{data.name}}</option>
      </select>
      <p class="p-1 mt-2">IFID</p>
      <input type="text" v-model="story.story[theStory.id].ifid" disabled class="font-mono bg-transparent p-1 overflow-auto outline-none border rounded w-full text-white/50"/>
      <button @click="download(story.story[theStory.id].title+'.tweezeldata', JSON.stringify(story.story[theStory.id]))" class="rounded bg-green-300 text-black p-1 mt-5">Backup This Story.</button>
    </div>
    <div class="p-1 outline-none w-full grow flex flex-col" v-if="mode == 'css'">
      <div class="flex justify-start m-2 text-xs">
        <button v-if="isWrap" @click="isWrap = false" class="flex flex-row rounded bg-green-300 text-black p-1">Wrap <svg class="h-4 w-4 self-center ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg></button>
        <button v-if="!isWrap" @click="isWrap = true" class="flex flex-row rounded bg-green-300 text-black p-1">Wrap <svg class="h-4 w-4 self-center ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg></button>
      </div>
      <textarea type="textarea" v-model="story.story[theStory.id].userStyle" :class="[isWrap ? 'whitespace-pre' : '', 'text-xs font-mono bg-transparent p-1 outline-none border rounded resize-none grow w-full']"></textarea>
    </div>
    <div class="p-1 outline-none w-full grow flex flex-col" v-if="mode == 'js'">
      <div class="flex justify-start m-2 text-xs">
        <button v-if="isWrap" @click="isWrap = false" class="flex flex-row rounded bg-green-300 text-black p-1">Wrap <svg class="h-4 w-4 self-center ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg></button>
        <button v-if="!isWrap" @click="isWrap = true" class="flex flex-row rounded bg-green-300 text-black p-1">Wrap <svg class="h-4 w-4 self-center ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg></button>
      </div>
      <textarea type="textarea" v-model="story.story[theStory.id].userScript" :class="[isWrap ? 'whitespace-pre' : '', 'text-xs font-mono bg-transparent p-1 outline-none border rounded resize-none grow w-full']"></textarea>
    </div>
  </div>
</template>
