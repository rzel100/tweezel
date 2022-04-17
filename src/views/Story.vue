<script setup>
import { useRoute, RouterLink } from 'vue-router'
import { storyData } from '@/stores/story'
import router from '../router';
import { ref } from 'vue';

const story = storyData()
const route = useRoute()

const theStory = route.params.id
story.storyId = theStory
function addPassage() {
  let nowPid = 1
  let arrPid = []
  for (let i = 0;i < story.story[theStory].passage.length;i++) {
    arrPid.push(story.story[theStory].passage[i].pid)
  }
  arrPid.sort(function(a, b) {
    return a - b;
  });
  for (let i = 0;i < arrPid.length;i++) {
    if (arrPid[i] == nowPid) {
      nowPid++
    }
  }
  story.story[theStory].passage.push({
    name : 'passage-name-'+nowPid,
    pid : nowPid.toString(),
    data : `Edit Your New Passage...`
  })
}
const playStats = ref('Play The Story')
function playStory() {
  if (story.story[theStory].passage.length < 1) {
    playStats.value = "Can't Play If There Is No Passage."
  } else {
    router.push(`/story/${theStory}/play`)
  }
}
</script>

<template>
  <div class="h-screen flex flex-col">
    <p class="text-center text-xl flex-none">Edit Passage</p>
    <button @click="addPassage()" class="bg-green-500 p-1 text-white motion-safe:hover:bg-green-400 motion-safe:transition">Add New Passage +</button>
    <hr>
    <div class="overflow-auto grow">
      <div class="bg-white p-2 container mx-auto">
        <router-link :to="`/story/${theStory}/global`">
          <div class="bg-sky-500 rounded text-white motion-safe:hover:bg-sky-400 motion-safe:transition p-0.5">
            <div class="overflow-hidden whitespace-nowrap p-2">Story Global Setting</div>
          </div>
        </router-link>
      </div>
      <div class="bg-white p-2 container mx-auto" v-for="(item, index) in story.story[theStory].passage">
        <router-link :to="`/story/${theStory}/edit/${index}`">
          <div class="bg-sky-500 rounded text-white motion-safe:hover:bg-sky-400 motion-safe:transition p-0.5">
            <div class="overflow-hidden whitespace-nowrap p-2">{{item.name}}</div>
            <div class="overflow-hidden whitespace-nowrap p-2 text-black bg-white">{{item.data}}</div>
          </div>
        </router-link>
      </div>
    </div>
    <button @click="playStory()" class="bg-green-500 p-2 text-white">{{playStats}}</button>
  </div>
</template>
