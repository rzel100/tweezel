<script setup>
const storyUrl = new URL('./PlayStory.html', import.meta.url).href
</script>

<template>
<div class="flex h-screen overflow-auto">
<iframe class="grow" :src="storyUrl"></iframe>
</div>
</template>