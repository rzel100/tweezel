<script setup>
import { useRoute } from 'vue-router'
import { storyData } from '@/stores/story'
import { ref } from 'vue';
const story = storyData()
const route = useRoute()
const mode = ref('setting')
const theStory = route.params
const storyNames = ref(story.story[theStory.id].title)
const trueStoryNames = storyNames.value
const dataName = ref(story.story)
const listStoryFormats = ref([
  {
    name : 'Chapbook 1.2.1',
    val : 'chapbook-1'
  },
  {
    name : 'Harlowe 3.2.3',
    val : 'harlowe-3'
  },
  {
    name : 'Harlowe 2.1.0',
    val : 'harlowe-2'
  },
  {
    name : 'Harlowe 1.2.4',
    val : 'harlowe-1'
  },
  {
    name : 'Snowman 2.0.2',
    val : 'snowman-2'
  },
  {
    name : 'Snowman 1.4.0',
    val : 'snowman-1'
  },
  {
    name : 'SugarCube 2.36.1',
    val : 'sugarcube-2'
  },
  {
    name : 'SugarCube 1.0.35',
    val : 'sugarcube-1'
  },
])

let nameList = dataName.value.map(function(data){
  return data.title
})

function setName(name) {
  let hasilnya = 0
  nameList.forEach(function(data){
    if (data == name) {
      hasilnya += 1
    }
  })
  if (hasilnya == 0) {
    story.story[theStory.id].title = name
  }
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
</script>

<template>
  <div class="h-screen flex flex-col">

    <div class="navbar bg-primary shadow-lg">
      <button tabindex="0" class="btn btn-ghost btn-square" @click='$router.back()'>
        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 self-center m-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
        </svg>
      </button>
      <div class='grow truncate'>
        <button class="btn btn-ghost normal-case px-0 text-xl m-1">Story Setting</button>
      </div>
    </div>

    <div class="tabs tabs-boxed m-2">
      <button @click="mode = 'setting'" :class="[mode == 'setting' ? 'tab-active' : '', 'tab grow']">Setting</button> 
      <button @click="mode = 'css'" :class="[mode == 'css' ? 'tab-active' : '', 'tab grow']">CSS</button> 
      <button @click="mode = 'js'" :class="[mode == 'js' ? 'tab-active' : '', 'tab grow']">Javascript</button>
    </div>

    <div class="p-1 w-full grow overflow-auto px-2" v-if="mode == 'setting'">
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Story Title</span>
        </label>
        <input @change="setName(trueStoryNames)" v-model="trueStoryNames" type="text" placeholder="Story Title Must Not Empty" class="input input-bordered w-full" />
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Story Formats</span>
        </label>
        <select v-model="story.story[theStory.id].storyformats" class="select select-bordered w-full">
          <option v-for="data, index in listStoryFormats" :value="data.val" :key='index'>{{data.name}}</option>
        </select>
      </div>
      <div class='p-2'>
        <div v-if="story.story[theStory.id].storyformats == 'chapbook-1'">
          A Twine story format emphasizing ease of authoring, multimedia, and playability on many different types of devices. Visit the <a class="text-primary underline" href="https://klembot.github.io/chapbook/guide/" target="_blank" rel="noopener noreferrer">guide</a> for more information.
        </div>
        <div v-if="story.story[theStory.id].storyformats == 'harlowe-3'">
          The default story format for Twine 2. Consult its <a class="text-primary underline" href="https://twine2.neocities.org/" target="_blank" rel="noopener noreferrer">documentation</a>.<br>
          <br>
          License: Zlib
        </div>
        <div v-if="story.story[theStory.id].storyformats == 'harlowe-2'">
          The default story format for Twine 2. See its <a class="text-primary underline" href="https://twine2.neocities.org/" target="_blank" rel="noopener noreferrer">documentation</a>.<br>
          <br>
          License: Zlib
        </div>
        <div v-if="story.story[theStory.id].storyformats == 'harlowe-1'">
          The default story format for Twine 2. See its <a class="text-primary underline" href="https://twine2.neocities.org/" target="_blank" rel="noopener noreferrer">documentation</a>.<br>
          <br>
          License: Zlib
        </div>
        <div v-if="story.story[theStory.id].storyformats == 'snowman-2'">
          A minimal story format for authors more experienced with HTML, CSS, and JavaScript. See its <a class="text-primary underline" href="https://videlais.github.io/snowman/2/" target="_blank" rel="noopener noreferrer">documentation</a>.
        </div>
        <div v-if="story.story[theStory.id].storyformats == 'snowman-1'">
          A minimal story format for authors more experienced with HTML, CSS, and JavaScript. See its <a class="text-primary underline" href="https://videlais.github.io/snowman/1/" target="_blank" rel="noopener noreferrer">documentation</a>.
        </div>
        <div v-if="story.story[theStory.id].storyformats == 'sugarcube-2'">
          A full featured, highly customizable story format. See its <a class="text-primary underline" href="http://www.motoslave.net/sugarcube/2/#documentation" target="_blank" rel="noopener noreferrer">documentation</a>.<br>
          <br>
          License: BSD-2-Clause
        </div>
        <div v-if="story.story[theStory.id].storyformats == 'sugarcube-1'">
          A Twine 2 port of the Twine 1 story format by the same name. See its <a class="text-primary underline" href="http://www.motoslave.net/sugarcube/1/#documentation" target="_blank" rel="noopener noreferrer">documentation</a>.<br>
          <br>
          License: Simplified BSD License
        </div>
        <div v-if="!story.story[theStory.id].storyformats">
          Choose Story Formats. To See It's Descriptions And Link To It's Documentations.
        </div>
      </div>
      <div class='divider m-0'></div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Story Will Start At : </span>
        </label>
        <select  v-model="story.story[theStory.id].startNode" class="select select-bordered w-full">
          <option v-for="data, index in story.story[theStory.id].passage" :value="data.pid" :key='index'>{{data.name}}</option>
        </select>
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">IFID</span>
        </label>
        <input v-model="story.story[theStory.id].ifid" disabled type="text" class="input input-disabled input-bordered w-full" />
      </div>
      <button @click="download(story.story[theStory.id].title+'.tweezeldata', JSON.stringify(story.story[theStory.id]))" class="btn btn-primary btn-block my-3">Backup This Story.</button>
    </div>

    <div class="p-1 outline-none w-full grow flex flex-col" v-if="mode == 'css'">
      <div class="form-control">
        <label class="label cursor-pointer justify-start gap-2">
          <input @click="story.isWrap = !story.isWrap" type="checkbox" class="toggle toggle-primary" :checked='!story.isWrap' />
          <span class="label-text">Wrap</span> 
        </label>
      </div>
      <textarea type="textarea" v-model="story.story[theStory.id].userStyle" :class="[story.isWrap ? 'whitespace-pre' : '', 'text-xs font-mono textarea textarea-bordered resize-none grow w-full p-1']"></textarea>
    </div>
    
    <div class="p-1 outline-none w-full grow flex flex-col" v-if="mode == 'js'">
      <div class="form-control">
        <label class="label cursor-pointer justify-start gap-2">
          <input @click="story.isWrap = !story.isWrap" type="checkbox" class="toggle toggle-primary" :checked='!story.isWrap' />
          <span class="label-text">Wrap</span> 
        </label>
      </div>
      <textarea type="textarea" v-model="story.story[theStory.id].userScript" :class="[story.isWrap ? 'whitespace-pre' : '', 'text-xs font-mono textarea textarea-bordered resize-none grow w-full p-1']"></textarea>
    </div>
  </div>
</template>
