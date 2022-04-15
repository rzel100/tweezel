<script setup>
import { useRoute } from 'vue-router'
import { storyData } from '@/stores/story'
import { ref } from 'vue';
const story = storyData()
const route = useRoute()
const mode = ref(true)

const theStory = route.params
function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}
function generateIFID() {
  story.story[theStory.id].ifid = uuidv4().toString().toUpperCase()
}
</script>

<template>
  <div class="h-screen flex flex-col">
    <p class="text-center flex-none">Global Story Setting</p>
    <hr>
    <div class="flex justify-center m-2 text-xs">
      <p class="text-center whitespace-nowrap self-center pr-1">Story Title</p>
      <input type="text" v-model="story.story[theStory.id].title" class="p-1 outline-none border rounded w-full"/>
    </div>
    <div class="flex justify-center m-2 text-xs">
      <p class="text-center whitespace-nowrap self-center pr-1">Story Start</p>
      <select v-model="story.story[theStory.id].startNode" class="p-1 outline-none border rounded w-full">
      <option v-for="data in story.story[theStory.id].passage" :value="data.pid">{{data.name}}</option>
      </select>
    </div>
    <div class="flex justify-center m-2 text-xs">
      <p class="text-center whitespace-nowrap self-center pr-1">IFID</p>
      <input type="text" v-model="story.story[theStory.id].ifid" disabled class="p-1 overflow-auto outline-none border rounded w-full"/>
      <button @click="generateIFID()" class="text-center whitespace-nowrap self-center pl-1">Generate New IFID</button>
    </div>
    <div class="grid grid-cols-2 place-content-stretch text-xs m-2 gap-x-2 text-white">
      <button @click="mode = true" class="bg-sky-500 grow p-2 motion-safe:hover:bg-sky-400 motion-safe:transition">Javascript</button>
      <button @click="mode = false" class="bg-green-500 grow p-2 motion-safe:hover:bg-green-400 motion-safe:transition">CSS</button>
    </div>
    <div class="p-1 outline-none border rounded w-full grow" v-if="mode">
      <textarea type="textarea" v-model="story.story[theStory.id].userScript" class="resize-none grow w-full h-full p-2"></textarea>
    </div>
    <div class="p-1 outline-none border rounded w-full grow" v-else>
      <textarea type="textarea" v-model="story.story[theStory.id].userStyle" class="resize-none grow w-full h-full p-2"></textarea>
    </div>
  </div>
</template>
