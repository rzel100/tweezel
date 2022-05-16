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
function setTitle() {
  if (storyNames.value) {
    story.story[theStory.id].title = storyNames.value
  }
}
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
        <input @change="setName(trueStoryNames)" type="text" placeholder="Story Title Must Not Empty" v-model="trueStoryNames" class="font-mono bg-transparent p-1 outline-none border rounded w-full placeholder:italic placeholder:text-slate-300"/>
      </div>
      <p class="p-1 mt-2">Story Formats</p>
      <select v-model="story.story[theStory.id].storyformats" class="font-mono bg-transparent p-1 outline-none border rounded w-full">
      <option class="bg-gray-700" v-for="data in listStoryFormats" :value="data.val">{{data.name}}</option>
      </select>
      <div>
        <div v-if="story.story[theStory.id].storyformats == 'chapbook-1'">
          A Twine story format emphasizing ease of authoring, multimedia, and playability on many different types of devices. Visit the <a class="text-green-300 underline" href="https://klembot.github.io/chapbook/guide/" target="_blank" rel="noopener noreferrer">guide</a> for more information.
        </div>
        <div v-if="story.story[theStory.id].storyformats == 'harlowe-3'">
          The default story format for Twine 2. Consult its <a class="text-green-300 underline" href="https://twine2.neocities.org/" target="_blank" rel="noopener noreferrer">documentation</a>.<br>
          <br>
          License: Zlib
        </div>
        <div v-if="story.story[theStory.id].storyformats == 'harlowe-2'">
          The default story format for Twine 2. See its <a class="text-green-300 underline" href="https://twine2.neocities.org/" target="_blank" rel="noopener noreferrer">documentation</a>.<br>
          <br>
          License: Zlib
        </div>
        <div v-if="story.story[theStory.id].storyformats == 'harlowe-1'">
          The default story format for Twine 2. See its <a class="text-green-300 underline" href="https://twine2.neocities.org/" target="_blank" rel="noopener noreferrer">documentation</a>.<br>
          <br>
          License: Zlib
        </div>
        <div v-if="story.story[theStory.id].storyformats == 'snowman-2'">
          A minimal story format for authors more experienced with HTML, CSS, and JavaScript. See its <a class="text-green-300 underline" href="https://videlais.github.io/snowman/2/" target="_blank" rel="noopener noreferrer">documentation</a>.
        </div>
        <div v-if="story.story[theStory.id].storyformats == 'snowman-1'">
          A minimal story format for authors more experienced with HTML, CSS, and JavaScript. See its <a class="text-green-300 underline" href="https://videlais.github.io/snowman/1/" target="_blank" rel="noopener noreferrer">documentation</a>.
        </div>
        <div v-if="story.story[theStory.id].storyformats == 'sugarcube-2'">
          A full featured, highly customizable story format. See its <a class="text-green-300 underline" href="http://www.motoslave.net/sugarcube/2/#documentation" target="_blank" rel="noopener noreferrer">documentation</a>.<br>
          <br>
          License: BSD-2-Clause
        </div>
        <div v-if="story.story[theStory.id].storyformats == 'sugarcube-1'">
          A Twine 2 port of the Twine 1 story format by the same name. See its <a class="text-green-300 underline" href="http://www.motoslave.net/sugarcube/1/#documentation" target="_blank" rel="noopener noreferrer">documentation</a>.<br>
          <br>
          License: Simplified BSD License
        </div>
        <div v-if="!story.story[theStory.id].storyformats">
          Choose Story Formats. To See It's Descriptions And Link To It's Documentations.
        </div>
      </div>
      <hr>
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
        <button v-if="story.isWrap" @click="story.isWrap = false" class="flex flex-row rounded bg-green-300 text-black p-1">Wrap <svg class="h-4 w-4 self-center ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg></button>
        <button v-if="!story.isWrap" @click="story.isWrap = true" class="flex flex-row rounded bg-green-300 text-black p-1">Wrap <svg class="h-4 w-4 self-center ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg></button>
      </div>
      <textarea type="textarea" v-model="story.story[theStory.id].userStyle" :class="[story.isWrap ? 'whitespace-pre' : '', 'text-xs font-mono bg-transparent p-1 outline-none border rounded resize-none grow w-full']"></textarea>
    </div>
    <div class="p-1 outline-none w-full grow flex flex-col" v-if="mode == 'js'">
      <div class="flex justify-start m-2 text-xs">
        <button v-if="story.isWrap" @click="story.isWrap = false" class="flex flex-row rounded bg-green-300 text-black p-1">Wrap <svg class="h-4 w-4 self-center ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg></button>
        <button v-if="!story.isWrap" @click="story.isWrap = true" class="flex flex-row rounded bg-green-300 text-black p-1">Wrap <svg class="h-4 w-4 self-center ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg></button>
      </div>
      <textarea type="textarea" v-model="story.story[theStory.id].userScript" :class="[story.isWrap ? 'whitespace-pre' : '', 'text-xs font-mono bg-transparent p-1 outline-none border rounded resize-none grow w-full']"></textarea>
    </div>
  </div>
</template>
