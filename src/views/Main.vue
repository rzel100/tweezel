<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { storyData } from '@/stores/story'
import draggable from 'vuedraggable'
const story = storyData()
const storyName = ref('')
const placeStoryName = ref('Story Name...')
const isNew = ref(false)
const isDelete = ref('999999999')
const mode = ref('story')
const storyList = ref(story.story)

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}
function generateIFID() {
  return uuidv4().toString().toUpperCase()
}

function createStory() {
  if (storyName.value.length < 1) {
    placeStoryName.value = "Story Name Is Required..."
  } else {
    let ifid = generateIFID()
    let newStory = {
      title : storyName.value,
      ifid : ifid,
      startNode : '1',
      userStyle : '/* Design Your Styling In Here */',
      userScript : '// Type Your Own Javascript In Here',
      storyformats : 'sugarcube-2',
      passage : [
        {
          name : 'start',
          pid : '1',
          data : `This Is Your Start Passage.
Quick Tips.
To Add Link / Ways To Other Passage Use
[[about]] <- This Display "about", When Clicked Go To "about" Passage.
[[This Is About|about]] <- This Display "This Is About", When Clicked Go To "about" Passage.`
        },
        {
          name : 'about',
          pid : '2',
          data : `This Is Your About Passage
Try To Link From Here To "start" Just Use Like In The [[start]] Passage.
Beware Of Passage Link That Leads To Nowhere !. Like This -> [[pit]] Or [[Go To Pit|pit]].
To Fix That, Try To Add A New Passage And Name It "pit".`
        }
      ]
    }
    story.story.push(newStory)
    isNew.value = false
  }
}

function deleteStory(index) {
  let spliced = story.story.splice(index, 1)
  isDelete.value = '999999999'
}

function checkLegit(data) {
  let legit = false
  if (data.title && data.ifid && data.startNode && data.passage) {
    legit = true
  }
  return legit
}

function readData() {
  let file_to_read = document.getElementById("jsonfileinput").files[0]
  if (file_to_read != undefined) {
    let fileread = new FileReader()
    fileread.onload = function(e) {
      let content = e.target.result
      let storyData = JSON.parse(content)
      if (checkLegit(storyData)) {
        story.story.push(storyData)
      }
      mode.value = 'story'
    }
    fileread.readAsText(file_to_read)
  }
}

function readWholeData() {
  let file_to_read = document.getElementById("jsonwholestoryfileinput").files[0]
  if (file_to_read != undefined) {
    let fileread = new FileReader()
    fileread.onload = function(e) {
      let content = e.target.result
      let storyData = JSON.parse(content)
      if (storyData.length > 0) {
        for (let i = 0;i < storyData.length;i++) {
          if (checkLegit(storyData[i])) {
            story.story.push(storyData[i])
          }
        }
      }
      mode.value = 'story'
    }
    fileread.readAsText(file_to_read)
  }
}

function download(filename, text) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const d = new Date();
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename+' '+d.getDate()+' '+months[d.getMonth()]+' '+d.getFullYear()+'.tweezeldata');
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
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
  <div class="flex flex-col h-screen">
    <div class="flex">
      <button class="grow-0 self-center p-2 border-b-2 bg-black/20">TweezeL</button>
      <button @click="mode = 'story'" :class="[mode == 'story' ? 'text-green-300' : 'border-b-2 bg-black/20', 'grow']">Story List</button>
      <button @click="mode = 'setting'" :class="[mode == 'setting' ? 'text-green-300' : 'border-b-2 bg-black/20', 'grow-0']">
        <svg class="h-5 w-5 self-center m-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
        </svg>
      </button>
      <button @click="mode = 'about'" :class="[mode == 'about' ? 'text-green-300' : 'border-b-2 bg-black/20', 'grow-0']">
        <svg class="h-5 w-5 self-center m-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    <div class="w-full grow text-xs overflow-auto flex flex-col" v-if="mode == 'story'">
      <div class="flex justify-center m-2 text-xs" v-if="!isNew">
        <div class="w-full p-1">Story List...</div>
        <button @click="isNew = true; storyName = ''; placeStoryName = 'Story Name...'" class="ml-2 whitespace-nowrap bg-green-300 text-black px-2 rounded">Create New Story</button>
      </div>
      <div class="flex justify-center m-2 text-xs" v-else>
        <input type="text" v-model="storyName" :placeholder="placeStoryName" class="text-white p-1 bg-transparent w-full outline-none outline-green-300 rounded placeholder:italic placeholder:text-slate-300"/>
        <button @click="createStory()" class="ml-2 whitespace-nowrap bg-green-300 text-black px-2 rounded">Start Creating !</button>
        <button @click="isNew = false" class="ml-2 whitespace-nowrap bg-red-300 text-black px-2 rounded">Cancel</button>
      </div>
      <hr>
      <div class="grow overflow-auto">
        <draggable
        :list="storyList"
        handle=".handle"
        item-key="title"
      >
        <template #item="{element, index}">
          <div class="flex hover:bg-black/20 transition">
            <div class="handle self-center pl-1">
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <router-link :to="`/story/${index}`" class="grow mx-2 py-2 truncate">
              <div>{{element.title}}</div>
            </router-link>
            <div class="flex mx-2">
              <div class="relative inline-block self-center">
                <button @click="setIndex(index)" :class="[isDelete == index ? 'rotate-[90deg]' : '', 'p-0.5 transition']">
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
                <div :class="[isDelete == index ? 'block' : 'hidden', 'absolute right-0 z-10']">
                  <button @click="deleteStory(index)" class="bg-red-400 self-center text-xs p-1 text-black shadow-2xl">
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
    <div class="w-full grow text-xs overflow-auto" v-if="mode == 'setting'">
      <p class="p-1 mt-2">Load Story From Backup<br>(The Story Will Be Appended, Not Replaced.)<br>Will Redirect To Story List. If Success The Story Will Be There In The List.</p>
      <div class="text-xs flex">
        <input class="grow p-1" type="file" id="jsonfileinput" />
        <button @click="readData" class="m-1 whitespace-nowrap bg-green-300 text-black px-2 rounded">Load Backup</button>
      </div>
      <hr>
      <p class="p-1">Create Backup Of An Entire Story</p>
      <button @click="download('TweezeL Backup', JSON.stringify(story.story))" class="rounded bg-green-300 text-black p-1 m-1">Backup Entire Story.</button>
      <p class="p-1 mt-5">Load Backup Of An Entire Story<br>(The Story Will Be Appended, Not Replaced.)</p>
      <div class="text-xs flex">
        <input class="grow p-1" type="file" id="jsonwholestoryfileinput" />
        <button @click="readWholeData" class="m-1 whitespace-nowrap bg-green-300 text-black px-2 rounded">Load Backup</button>
      </div>
    </div>
    <div class="w-full text-xs grow overflow-auto" v-if="mode == 'about'">
      <p class="p-1 mt-2">TweezeL Is A Free Tools For Creating Twine Games Focused For Android. But It Quite Works Well On Any Device With Browser On It. :3.</p>
      <p class="p-1 mt-2">The Feature Is Not Good Like Twine Or Tweego. But At Least It's Device Friendly Than Twine. And User Friendly Than Tweego. :)</p>
      <p class="p-1 mt-2">Now This Tools Already Support All Official Listed Story Formats On Twine 2 Tools. Such As Chapbook, Harlowe, Snowman, And Sugarcube.</p>
      <p class="p-1 mt-2">If You Don't Know What To Choose For Your Game Story Formats. Just Create A New Story. Set The StoryFormats On The Story Global Setting.<br>
        And Play The Story. Try All The StoryFormats One By One. Till U Find It Perfect For Your Game.<br>
        Also. Every StoryFormats Has It's Own Documentations. If U Plan For Longer Gameplay For Your Game. Think About This StoryFormats Seriously. :3.<br>
        My Personal Recomendations Is... <b>Sugarcube 2</b>...</p>
      <p class="p-1 mt-2">This Tools Is More Or Less Like Tweego But With GUI. For Those Who Never Code Twine Games With Tweego And Wanna Try This Tools.<br>
        Just Create A New Story To Read Some Very Basic Tutorial :).<br>
        Or <a class="text-green-300 underline" href="https://www.youtube.com/playlist?list=PLb4OE-UTEU-86vltmWTJTBkbYEWbGSebe" target="_blank" rel="noopener noreferrer">Go To Here.</a> It's My Youtube Playlist. Some Video About This Project. Like Basic Tutorial And Such Things.</p>
    </div>
  </div>
</template>
