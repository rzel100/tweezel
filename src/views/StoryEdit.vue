<script setup>
import { useRoute } from 'vue-router'
import { storyData } from '@/stores/story'
import { ref } from 'vue';
import router from '../router';
const story = storyData()
const route = useRoute()

const theStory = route.params
const isDelete = ref(false)
function deletePassage() {
  var spliced = story.story[theStory.id].passage.splice(theStory.pid, 1)
  router.back()
}
</script>

<template>
  <div class="h-screen flex flex-col">
    <p class="text-center flex-none">Editing Passage</p>
    <hr>
    <div class="flex justify-center m-2">
      <p class="text-center text-sm">Passage Names</p>
      <input type="text" v-model="story.story[theStory.id].passage[theStory.pid].name" class="p-1 outline-none border rounded w-full"/>
    </div>
    <textarea type="textarea" v-model="story.story[theStory.id].passage[theStory.pid].data" class="p-1 outline-none border rounded w-full resize-none grow"></textarea>
    <div class="flex" v-if="!isDelete">
      <button @click="isDelete = true" class="grow bg-red-500 text-white p-2">Delete Passage</button>
    </div>
    <div class="flex" v-else>
      <div class="grow bg-red-500 text-white p-2">Delete Passage ?.</div>
      <button @click="deletePassage()" class="bg-red-800 text-white px-5">Yes</button>
      <button @click="isDelete = false" class="bg-sky-500 text-white px-5">No</button>
    </div>
  </div>
</template>