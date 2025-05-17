<script setup>
import { defineProps } from 'vue';
// import { storyData } from '@/stores/story'
// const story = storyData()
// defineProps({
//   idProps: String,
//   className: String,
//   modalAction: [
//     {
//       className: String,
//       closeOnClick: Boolean,
//       label: String,
//       onPress: Function
//     }
//   ]
// });
defineProps([
  'idProps',
  'className',
  'modalAction',
]);
</script>

<template>
  <input type="checkbox" :id="idProps" :class="['modal-toggle ', className]" />
  <div class="modal modal-bottom sm:modal-middle">
    <div class="modal-box relative">
      <label :for="idProps" class="btn btn-error btn-sm btn-circle btn-ghost absolute right-2 top-2 text-error">✕</label>
      <slot name="children"></slot>
      <div class="modal-action">
        <template v-if='modalAction.length > 0'>
          <label v-for="(item, index) in modalAction" :key='index' :class='item.className' @click='item.onPress' :for='item.closeOnClick ? idProps : "none"'>{{ item.label }}</label>
        </template>
        <template v-else>
          <label :for="idProps" class="btn btn-success">Close.</label>
        </template>
      </div>
    </div>
  </div>
</template>