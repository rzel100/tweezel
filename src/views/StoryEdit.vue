<script setup>
import { useRoute } from 'vue-router'
import { storyData } from '@/stores/story'
import { ref } from 'vue';
import { createToaster } from "@meforma/vue-toaster";
const story = storyData()
const route = useRoute()
const theIfid = route.params.id
const findIfid = (element) => element.ifid == theIfid;
const storyIndex = story.story.findIndex(findIfid)
const thePid = route.params.pid
const findPid = (element) => element.pid == thePid;
const passageIndex = story.story[storyIndex].passage.findIndex(findPid)
const passageNames = ref(story.story[storyIndex].passage[passageIndex].name)
const truePassageNames = ref(passageNames.value)
const dataName = ref(story.story[storyIndex].passage)

const toaster = createToaster({
  position : 'top',
  duration : 2000,
  dismissible : true
});

let nameList = dataName.value.map(function(data){
  return data.name
})

function setName(name) {
  let hasilnya = 0
  nameList.forEach(function(data){
    if (data == name) {
      hasilnya += 1
    }
  })
  if (hasilnya == 0) {
    story.story[storyIndex].passage[passageIndex].name = name
    toaster.show(`Success Changing Passage Name...`, {type : 'success'})
    passageNames.value = name
    truePassageNames.value = name
  } else {
    toaster.show(`Passage Name Is Alreadys Exist Or Empty...`, {type : 'error'})
  }
}
</script>

<template>
  <div class="h-screen flex flex-col" :style='{height: story.innerHeight + "px"}'>

    <div class="navbar bg-primary shadow-lg text-primary-content">
      <button tabindex="0" class="btn btn-ghost btn-square" @click='$router.back()'>
        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 self-center m-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
        </svg>
      </button>
      <div class='grow truncate'>
        <button class="btn btn-ghost normal-case px-0 text-xl m-1">Editing Passage</button>
      </div>
    </div>

    <div class='w-full px-2 pb-2 flex flex-col h-full'>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Passage Names</span>
        </label>
        <label class="input-group input-group-xs w-full">
          <input v-model="truePassageNames" type="text" placeholder="Passage Title Must Not Empty" class="input input-bordered input-xs grow" />
          <span v-if="passageNames != truePassageNames" @click="setName(truePassageNames)" class='cursor-pointer'>
            <span>Set</span>
          </span>
        </label>
      </div>
      <div class="flex flex-row w-full items-center gap-2">
        <div class="form-control w-fit">
          <label class="label cursor-pointer justify-start gap-2">
            <input @click="story.isWrap = !story.isWrap" type="checkbox" class="toggle toggle-primary" :checked='!story.isWrap' />
            <span class="label-text">Wrap</span> 
          </label>
        </div>
      </div>
      <img id="output"/>
      <textarea type="textarea" v-model="story.story[storyIndex].passage[passageIndex].data" :class="[story.isWrap ? 'whitespace-pre' : '', 'text-xs font-mono textarea textarea-bordered resize-none grow w-full h-full px-1']"></textarea>
    </div>

  </div>
</template>