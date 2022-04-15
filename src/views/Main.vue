<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { storyData } from '@/stores/story'
const story = storyData()
//['&quot;', '&apos;', '&amp;', '&lt;', '&gt;'] " ' & < >
const macan = ref(0)

function resetStory() {
  story.story = [
      {
        title : 'My Awesome Story',
        ifid : 'E9AFFAED-9D44-4D87-979D-3089F0C5FF4C',
        id : '0',
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
[[about]] <- This Display "about", When Clicked Go To "about".
[[This Is About|about]] <- This Display "This Is About", When Clicked Go To "about".`
          },
          {
            name : 'about',
            pid : '2',
            data : `This Is Your About Passage
To Link From Here To "start" Just Use Like In The start Passage.
To Add A New Passage. Create The Passage Then Just Link It Use "[[PassageName_to_link]]".`
          }
        ]
      }
    ]
}

</script>

<template>
  <div class="py-10 text-center">
    <p class="text-2xl bg-black/25">Welcome To TweezeL</p>
    <p class="p-2">A Free Twine Sugarcube 2 Story Formats Compiler Focused For Android</p>
    <p class="text-black/75 text-sm p-2">This App Still In Very Early Dev. You Can Play And Edit The Story. But Still Can't Export It.</p>

    <router-link :to="`/story/${story.story[0].id}`">
      <button class="bg-sky-600 rounded motion-safe:hover:bg-sky-400 motion-safe:transition outline-0 text-white p-2 mt-6 text-center">
        Edit Story
      </button>
    </router-link>
    <div>
      <button @click="resetStory()" class="bg-sky-600 rounded motion-safe:hover:bg-sky-400 motion-safe:transition outline-0 text-white p-2 mt-6 text-center">
        Reset Story
      </button>
    </div>
  </div>
</template>
