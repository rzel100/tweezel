<script setup>
import { storyData } from '@/stores/story'
const story = storyData()
</script>

<template>
  <div class='divider text-xl'>Storage</div>
  <div class='flex justify-center items-center'>
    <span>Storage Used : </span>
    <div class="radial-progress" :style="['--value:'+`${story.currentStorage / story.maxStorage * 100}`+';']">{{ Math.round(story.currentStorage / story.maxStorage * 100) }}%</div>
  </div>
  <div class='divider text-xl'></div>
  <h3 class="font-bold text-lg mb-4">"What Is That ?." U Ask ?.</h3>
  <p class="p-1 mt-2">That Is A Storage U Used On The Browser. TweezeL Really Rely On Browser Storage <i>(LocalStorage)</i>. Usually The Space Is <b>5 MB</b> <u>(While PWA App Can Be Up To <b>20% Of Your Total Device Storage.).</b></u> <b>5 MB</b> Is Not Much But It Contain A Lot Of Text For U To Create A Very Big Story. So If It's Full U May Want To Backup / Delete Your Story. Or...</p>
  <p class="p-1 mt-2">I Heard If U Install TweezeL As PWA App On Chrome. It Will Increase It's Storage Limit ?.<br/>I Don't Know. Why Don't U Try Yourself Installing TweezeL ?. :)</p>
</template>