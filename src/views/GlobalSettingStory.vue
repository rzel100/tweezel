<script setup>
import { useRoute } from 'vue-router'
import { storyData } from '@/stores/story'
import { ref, computed } from 'vue';
import { Codemirror } from 'vue-codemirror'
import { oneDark } from '@codemirror/theme-one-dark'
import {css} from '@codemirror/lang-css'
import {javascript} from '@codemirror/lang-javascript'
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({
  position : 'top',
  duration : 2000,
  dismissible : true
});

const story = storyData()
const route = useRoute()
const mode = ref('setting')
const theIfid = route.params.id
const findIfid = (element) => element.ifid == theIfid;
const theStory = story.story.findIndex(findIfid)
const extensionsCss = [css()]
const extensionsJavascript = [javascript()]

if (story.codeDarkTheme) {
  extensionsCss.push(oneDark)
  extensionsJavascript.push(oneDark)
}
// const storyNames = ref(story.story[theStory].title)
// const trueStoryNames = storyNames.value
// const dataName = ref(story.story)
// const listStoryFormats = ref([
//   {
//     name : 'Chapbook 1.2.1',
//     val : 'chapbook-1'
//   },
//   {
//     name : 'Chapbook 2.2.0',
//     val : 'chapbook-2'
//   },
//   {
//     name : 'Harlowe 3.2.3',
//     val : 'harlowe-3'
//   },
//   {
//     name : 'Harlowe 2.1.0',
//     val : 'harlowe-2'
//   },
//   {
//     name : 'Harlowe 1.2.4',
//     val : 'harlowe-1'
//   },
//   {
//     name : 'Snowman 2.0.2',
//     val : 'snowman-2'
//   },
//   {
//     name : 'Snowman 1.4.0',
//     val : 'snowman-1'
//   },
//   // {
//   //   name : 'SugarCube 1.0.35',
//   //   val : 'sugarcube-1'
//   // },
//   {
//     name : 'SugarCube 2.36.1',
//     val : 'sugarcube-2'
//   },
//   {
//     name : 'Custom',
//     val : 'custom'
//   },
// ])
  
// let nameList = dataName.value.map(function(data){
//   return data.title
// })

// function setName(name) {
//   let hasilnya = 0
//   nameList.forEach(function(data){
//     if (data == name) {
//       hasilnya += 1
//     }
//   })
//   if (hasilnya == 0) {
//     story.story[theStory].title = name
//   }
// }

const cleaningString = (text) => {
  const str = text
  const replaced = str.replace(/[^a-z0-9]/gi, '_');
  return replaced
}

// const writeFile = async (blob, filename, original_filename) => {
//   write_blob({
//     path: "Backup/"+original_filename+"/"+filename,
//     directory: Directory.External,
//     blob: blob,
//     recursive: true,
//     on_fallback() {
//       toaster.error(`Failed...`)
//     }
//   }).then(function () {
//     toaster.success(`Done...`)
//   });
// };

let filteredStoryFormat = computed(() =>
  story.story[theStory].storyformats === ''
    ? story.story[theStory].storyformats
    : story.storyFormatList.filter((storyFormat) =>
      {return (storyFormat.val
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(story.story[theStory].storyformats.toLowerCase().replace(/\s+/g, '')))}
      )
)

function downloadAsTwee(filename, storyData) {
  // const new_filename = cleaningString(filename) + '.twee'
  let theXPos = 0
  let theYPos = 0
  let theTwee = ''
  let storyIfid = storyData.ifid
  let storyName = filteredStoryFormat.value[0].data.name
  let storyVersion = filteredStoryFormat.value[0].data.version
  let storyStart = storyData.passage.filter((onePassage) =>
      {return (onePassage.pid
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(storyData.startNode.toLowerCase().replace(/\s+/g, '')))}
      )[0].name
  theTwee += `:: StoryTitle\n${storyData.title}\n\n\n`
  theTwee += `:: StoryData\n{\n  "ifid": "${storyIfid}",\n  "format": "${storyName}",\n  "format-version": "${storyVersion}",\n  "start": "${storyStart}",\n  "zoom": 1\n}\n\n\n`
  storyData.passage.forEach(onePassage => {
    let dataTmp = onePassage.data
    let findImagePath = dataTmp.match(/%img%[\s\S]*?%/gi)
    if (findImagePath && findImagePath.length > 0) {
      findImagePath.map((e) => {
        let oldSrc = e.split("%img%").join("").slice(0, -1).trim()
        const found = story.story[theStory].imageList.find(image => image.name.trim() == oldSrc);
        if (found) {
          dataTmp = dataTmp.replace(e, found.src)
        }
      })
    }
    theTwee += `:: ${onePassage.name} ${onePassage.tags && onePassage.tags.length > 0 ? ' [' + onePassage.tags + '] ' : ''}{"position":"${theXPos},${theYPos}","size":"100,100"}\n${dataTmp}\n\n\n`
    if (theXPos == 2000) {
      theXPos = 0
      theYPos += 100
    } else {
      theXPos += 100
    }
  });
  theTwee += `:: StoryScript [script]\n${storyData.userScript}\n\n\n`
  theTwee += `:: StoryStylesheet [stylesheet]\n${storyData.userStyle}\n\n\n`
  download(filename, theTwee, 'twee')
}

function download(filename, text, extention) {
  const new_filename = cleaningString(filename)
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const d = new Date();
  const fileName = new_filename+'_'+d.getDate()+'_'+months[d.getMonth()]+'_'+d.getFullYear()+'.'+(extention ? extention : 'tweezeldata')
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', fileName);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  toaster.success(`Done...`)
  // const new_filename = cleaningString(filename)
  // const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  // const d = new Date();
  // const blob = new Blob([text], { type : 'plain/text' });
  // writeFile(blob, fileName, new_filename)
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
        <input v-model="story.story[theStory].title" type="text" placeholder="Story Title Must Not Empty" class="input input-bordered w-full" />
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Story Formats</span>
        </label>
        <select v-model="story.story[theStory].storyformats" class="select select-bordered w-full">
          <option v-for="data, index in story.storyFormatList" :value="data.val" :key='index'>{{data.name}}</option>
        </select>
      </div>
      <div class='p-2'>
        by <span class='font-bold' v-html='filteredStoryFormat[0].data ? (
          filteredStoryFormat[0].data.author
        ) : ""'>
        </span><br />
        <span v-html='filteredStoryFormat[0].data ? (
          filteredStoryFormat[0].data.description
        ) : ""'>
        </span>
        <!-- {{ story.storyFormatList.forEach(storyFormat => {
          return storyFormat.data.description
        }) }} -->
        <!-- <div v-if="story.story[theStory].storyformats == 'chapbook-1'">
          A Twine story format emphasizing ease of authoring, multimedia, and playability on many different types of devices. Visit the <a class="text-primary underline" href="https://klembot.github.io/chapbook/guide/" target="_blank" rel="noopener noreferrer">guide</a> for more information.
        </div>
        <div v-if="story.story[theStory].storyformats == 'chapbook-2'">
          A Twine story format emphasizing ease of authoring, multimedia, and playability on many different types of devices. Visit the <a class="text-primary underline" href="https://klembot.github.io/chapbook/guide/" target="_blank" rel="noopener noreferrer">guide</a> for more information.
        </div>
        <div v-if="story.story[theStory].storyformats == 'harlowe-3'">
          The default story format for Twine 2. Consult its <a class="text-primary underline" href="https://twine2.neocities.org/" target="_blank" rel="noopener noreferrer">documentation</a>.<br>
          <br>
          License: Zlib
        </div>
        <div v-if="story.story[theStory].storyformats == 'harlowe-2'">
          The default story format for Twine 2. See its <a class="text-primary underline" href="https://twine2.neocities.org/" target="_blank" rel="noopener noreferrer">documentation</a>.<br>
          <br>
          License: Zlib
        </div>
        <div v-if="story.story[theStory].storyformats == 'harlowe-1'">
          The default story format for Twine 2. See its <a class="text-primary underline" href="https://twine2.neocities.org/" target="_blank" rel="noopener noreferrer">documentation</a>.<br>
          <br>
          License: Zlib
        </div>
        <div v-if="story.story[theStory].storyformats == 'snowman-2'">
          A minimal story format for authors more experienced with HTML, CSS, and JavaScript. See its <a class="text-primary underline" href="https://videlais.github.io/snowman/2/" target="_blank" rel="noopener noreferrer">documentation</a>.
        </div>
        <div v-if="story.story[theStory].storyformats == 'snowman-1'">
          A minimal story format for authors more experienced with HTML, CSS, and JavaScript. See its <a class="text-primary underline" href="https://videlais.github.io/snowman/1/" target="_blank" rel="noopener noreferrer">documentation</a>.
        </div>
        <div v-if="story.story[theStory].storyformats == 'sugarcube-2'">
          A full featured, highly customizable story format. See its <a class="text-primary underline" href="http://www.motoslave.net/sugarcube/2/#documentation" target="_blank" rel="noopener noreferrer">documentation</a>.<br>
          <br>
          License: BSD-2-Clause
        </div>
        <div v-if="story.story[theStory].storyformats == 'sugarcube-1'">
          A Twine 2 port of the Twine 1 story format by the same name. See its <a class="text-primary underline" href="http://www.motoslave.net/sugarcube/1/#documentation" target="_blank" rel="noopener noreferrer">documentation</a>.<br>
          <br>
          License: Simplified BSD License
        </div> -->
        <div v-if="story.story[theStory].storyformats == 'custom'">
          Write the url to the format.js.
          <input v-model="story.story[theStory].customFormatUrl" type="text" placeholder="Write the url" class="input input-bordered w-full" />
        </div>
        <div v-if="!story.story[theStory].storyformats">
          Choose Story Formats. To See It's Descriptions And Link To It's Documentations.
        </div>
      </div>
      <div class='divider m-0'></div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Story Will Start At : </span>
        </label>
        <select  v-model="story.story[theStory].startNode" class="select select-bordered w-full">
          <option v-for="data, index in story.story[theStory].passage" :value="data.pid" :key='index'>{{data.name}}</option>
        </select>
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">IFID</span>
        </label>
        <input v-model="story.story[theStory].ifid" disabled type="text" class="input input-disabled input-bordered w-full" />
      </div>
      <div class='divider'></div>
      <button @click="download(story.story[theStory].title, JSON.stringify(story.story[theStory]))" class="btn btn-primary btn-block my-3">Backup This Story.</button>
      <!-- <p class='text-sm py-2'>It Will Be Saved At "[Internal_Storage] -> Android -> data -> app.rzel.tweezel -> files -> Backup -> [Story Name] -> [Here]". It's Extension Is ".tweezeldata"</p>
      <p class='text-sm py-2'>Later. U Can Use "Choose Story Backup To Load." Button At The Main Screen Setting To Select The File And Restore Your Backup. Or Just To Share It To Your Friends And Let Them Load Your Story Into Their Devices :).</p> -->
      <button @click="downloadAsTwee(story.story[theStory].title, story.story[theStory])" class="btn btn-primary btn-block my-3">Export As Twee.</button>
      <p class='text-sm py-2'>When U Export As Twee.</p>
      <ul class='list-disc ml-4'>
        <li>Any Image U Use With TweezeL Image Picker Will Be Exported As Base64 Image.</li>
        <li>Any Image U Use With TweezeL Image Picker And Not Used, It Will Not Exported.</li>
        <li>THIS FEATURE IS NOT TESTED MUCH. IT IS TESTED FOR THIS APP AND TWINE AND FOR ME IT IS WORKING.</li>
      </ul>
    </div>

    <div class="w-full p-1 flex flex-col gap-2 grow h-0 overflow-auto" v-if="mode == 'css'">
      <codemirror
        v-model="story.story[theStory].userStyle"
        placeholder="Write The Code Here..."
        :style="{ 'flex-grow' : '1', 'background-color' : story.codeDarkTheme ? '' : 'white', 'color' : story.codeDarkTheme ? '' : 'black'}"
        :autofocus="true"
        :indent-with-tab="true"
        :tab-size="2"
        :extensions="extensionsCss"
      />
    </div>
    
    <div class="w-full p-1 flex flex-col gap-2 grow h-0 overflow-auto" v-if="mode == 'js'">
      <codemirror
        v-model="story.story[theStory].userScript"
        placeholder="Write The Code Here..."
        :style="{ 'flex-grow' : '1', 'background-color' : story.codeDarkTheme ? '' : 'white', 'color' : story.codeDarkTheme ? '' : 'black'}"
        :autofocus="true"
        :indent-with-tab="true"
        :tab-size="2"
        :extensions="extensionsJavascript"
      />
    </div>
  </div>
</template>
