<script setup>
import { useRoute } from 'vue-router'
import { storyData } from '@/stores/story'
import { ref } from 'vue';
import { createToaster } from "@meforma/vue-toaster";
import { Codemirror } from 'vue-codemirror'
import { oneDark } from '@codemirror/theme-one-dark'

const extensions = [oneDark]

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

// Opening Modal...
const openAdditionalModal = () => {
  document.getElementById("additional-modal").showModal()
}
</script>

<template>
  <div class="h-screen flex flex-col overflow-auto" :style='{height: story.innerHeight + "px"}'>

    <div class="navbar bg-primary shadow-lg text-primary-content">
      <button tabindex="0" class="btn btn-ghost btn-square" @click='$router.back()'>
        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 self-center m-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
        </svg>
      </button>
      <div class='grow truncate'>
        <button class="btn btn-ghost normal-case px-0 text-xl m-1">Editing Passage</button>
      </div>
      <button @click='openAdditionalModal()' tabindex="0" class="btn btn-ghost btn-square m-1">
        <svg class="h-5 w-5 self-center m-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <div class='w-full px-2 pb-2 flex flex-col gap-2 grow h-0'>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Passage Names</span>
        </label>
        <label class="join w-full">
          <input v-model="truePassageNames" type="text" placeholder="Passage Title Must Not Empty" class="input input-bordered input-xs grow join-item" />
          <span v-if="passageNames != truePassageNames" @click="setName(truePassageNames)" class='cursor-pointer btn btn-xs join-item'>
            <span>Set</span>
          </span>
        </label>
      </div>
      <div class="overflow-auto grow">
        <codemirror
          v-model="story.story[storyIndex].passage[passageIndex].data"
          placeholder="Write The Code Here..."
          :style="{ 'flex-grow' : '1', 'background-color' : story.codeDarkTheme ? '' : 'white', 'color' : story.codeDarkTheme ? '' : 'black'}"
          :autofocus="true"
          :indent-with-tab="true"
          :tab-size="2"
          :extensions="story.codeDarkTheme ? extensions : []"
        />
      </div>
    </div>

  </div>

  <dialog id="additional-modal" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box relative">
      <form method="dialog">
        <button class="btn btn-error btn-sm btn-circle btn-ghost absolute right-2 top-2 text-error">✕</button>
      </form>
      <h3 class='text-xl'>Tags</h3>
      <p class='py-1'>Write Tags To The Story Passage. Seperated By Space(s).</p>
      <input  v-model="story.story[storyIndex].passage[passageIndex].tags" type="text" placeholder="" class="input input-bordered w-full" />
    </div>
  </dialog>
</template>