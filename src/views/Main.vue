<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { storyData } from '@/stores/story'
const story = storyData()
const findStory = ref('')
const storyName = ref('')
const placeStoryName = ref('Story Name...')
const isNew = ref(false)

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
    console.log(ifid)
    let newStory = {
      title : storyName.value,
      ifid : ifid.value,
      startNode : '1',
      userStyle : '/* Design Your Styling In Here */',
      userScript : '// Type Your Own Javascript In Here',
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
    console.log(story.story)
  }
}

function resetStory() {
  story.story = [
    {
      title : 'My Awesome Story',
      ifid : 'E9AFFAED-9D44-4D87-979D-3089F0C5FF4C',
      startNode : '1',
      userStyle : '/* Design Your Styling In Here */',
      userScript : '// Type Your Own Javascript In Here',
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
  ]
}
/* Backup...
<p class="p-2">Tools For Creating Twine Games Focused On Android</p>
<p class="text-white/75 text-sm p-2">This App Still In Very Early Dev. You Can Play And Edit The Story. But Still Can't Export It.</p>
var obj = { Name: "Joe" };

obj.Age = 12;
console.log(obj.Age)

var macan = 'halo'
obj[macan] = 'Ini...'
console.log(obj.halo)

obj['Country'] =  "USA"
console.log(obj.Country)

console.log(obj)
*/
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="flex bg-black/25">
      <p class="text-2xl grow self-center pl-2">TweezeL</p>
      <svg class="h-5 w-5 self-center m-2" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
      </svg>
    </div>
    <div class="flex justify-center m-2 text-xs" v-if="!isNew">
      <input type="text" v-model="findStory" placeholder="Find Story..." class="text-white p-1 outline-none bg-transparent w-full placeholder:italic placeholder:text-slate-300"/>
      <button @click="isNew = true; storyName = ''" class="ml-2 whitespace-nowrap bg-green-300 text-black px-2 rounded">Create New Story</button>
    </div>
    <div class="flex justify-center m-2 text-xs" v-else>
      <input type="text" v-model="storyName" :placeholder="placeStoryName" class="text-white p-1 outline-none bg-transparent w-full placeholder:italic placeholder:text-slate-300"/>
      <button @click="createStory()" class="ml-2 whitespace-nowrap bg-green-300 text-black px-2 rounded">Start Creating !</button>
      <button @click="isNew = false" class="ml-2 whitespace-nowrap bg-red-300 text-black px-2 rounded">Cancel</button>
    </div>
    <div class="grow overflow-auto">
      <div class="flex motion-safe:hover:bg-black/20 motion-safe:transition" v-for="(data, index) in story.story">
        <router-link :to="`/story/${index}`" class="grow mx-2 py-2">
          <div class="w-full">{{data.title}}</div>
        </router-link>
        <div class="bg-red-500 p-0.5 mx-2 self-center rounded">
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
    <div>
      <button @click="resetStory()" class="bg-sky-600 rounded motion-safe:hover:bg-sky-400 motion-safe:transition outline-0 text-white p-2 mt-6 text-center">
        Reset Story
      </button>
    </div>
  </div>
</template>
