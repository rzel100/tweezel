<script setup>
import { useRoute, RouterLink } from 'vue-router'
import { storyData } from '@/stores/story'
import router from '../router';
import { ref } from 'vue';
import draggable from 'vuedraggable'

const story = storyData()
const route = useRoute()
const isNew = ref(false)
const isDelete = ref('999999999')
const passageName = ref('')
const placePassageName = ref('Passage Name...')

const theStory = route.params.id
story.storyId = theStory
const passageList = ref(story.story[theStory].passage)
function sameName(data) {
  var nameSame = false
  for (let i = 0;i < story.story[theStory].passage.length;i++) {
    if (story.story[theStory].passage[i].name == data) {
      nameSame = true
    }
  }
  return nameSame
}
function addPassage() {
  if (passageName.value.length < 1) {
    placePassageName.value = "Passage Name Is Required..."
  } else if (sameName(passageName.value)){
    passageName.value = ''
    placePassageName.value = "Passage Name Already Exist..."
  } else {
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
      name : passageName.value,
      pid : nowPid.toString(),
      data : `Edit Your New Passage...`
    })
    isNew.value = false
  }
}
function deletePassage(index) {
  var spliced = story.story[theStory].passage.splice(index, 1)
  isDelete.value = '999999999'
}
const playStats = ref('Play The Story')
function playStory() {
  if (story.story[theStory].passage.length < 1) {
    playStats.value = "Can't Play If There Is No Passage."
  } else {
    router.push(`/story/${theStory}/play`)
  }
}
function setIndex(val) {
  if (isDelete.value == val) {
    isDelete.value = '999999999'
  } else {
    isDelete.value = val
  }
}
</script>

<template>
  <div class="h-screen flex flex-col text-xs">
    <div class="flex bg-black/25">
      <p class="text-xl grow self-center p-1 truncate">{{story.story[theStory].title}}</p>
      <router-link :to="`/story/${theStory}/play`">
        <svg class="h-5 w-5 self-center m-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
        </svg>
      </router-link>
      <router-link :to="`/story/${theStory}/global`">
        <svg class="h-5 w-5 self-center m-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
        </svg>
      </router-link>
    </div>
    <div class="flex justify-center m-2 text-xs" v-if="!isNew">
      <div class="w-full p-1">Passage List...</div>
      <button @click="isNew = true; passageName = ''; placePassageName = 'Passage Name...'" class="ml-2 whitespace-nowrap bg-green-300 text-black px-2 rounded">Create New Passage</button>
    </div>
    <div class="flex justify-center m-2 text-xs" v-else>
      <input type="text" v-model="passageName" :placeholder="placePassageName" class="text-white p-1 bg-transparent w-full outline-none outline-green-300 rounded placeholder:italic placeholder:text-slate-300"/>
      <button @click="addPassage()" class="ml-2 whitespace-nowrap bg-green-300 text-black px-2 rounded">Create !</button>
      <button @click="isNew = false" class="ml-2 whitespace-nowrap bg-red-300 text-black px-2 rounded">Cancel</button>
    </div>
    <hr>
    <div class="grow overflow-auto">
      <draggable
        :list="passageList"
        handle=".handle"
        item-key="pid"
      >
        <template #item="{element, index}">
          <div class="flex motion-safe:hover:bg-black/20 motion-safe:transition">
            <div class="handle self-center pl-1">
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <router-link :to="`/story/${theStory}/edit/${index}`" class="grow mx-2 py-2 truncate">
              <div class="w-full">{{element.name}}</div>
            </router-link>
            <div class="flex mx-2">
              <div class="relative inline-block self-center">
                <button @click="setIndex(index)" :class="[isDelete == index ? 'rotate-90' : '', 'p-0.5 motion-safe:transition']">
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
                <div :class="[isDelete == index ? 'block' : 'hidden', 'absolute right-0 z-10']">
                  <button @click="deletePassage(index)" class="bg-red-400 self-center text-xs p-1 text-black shadow-2xl">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>
