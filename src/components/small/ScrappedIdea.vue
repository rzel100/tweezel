<script setup>
// function sameGroupName(data) {
//   var nameSame = false
//   if (story.group) {
//     for (let i = 0;i < story.group.length;i++) {
//       if (story.group[i] == data) {
//         nameSame = true
//       }
//     }
//   } else {
//     story.group = []
//     for (let i = 0;i < story.group.length;i++) {
//       if (story.group[i] == data) {
//         nameSame = true
//       }
//     }
//   }
//   return nameSame
// }

// function addGroup() {
//   if (groupName.value.length < 1) {
//     toaster.show(`Group Name Is Required...`, {type : 'error'})
//   } else if (sameGroupName(groupName.value)){
//     groupName.value = ''
//     toaster.show(`Group Name Already Exist...`, {type : 'error'})
//   } else {
//     story.group.push(groupName.value)
//     isNew.value = false
//     groupName.value = ''
//   }
// }

// function deleteGroup(index) {
//   let groupList = story.group.filter((groupName) =>
//     groupName !== index
//   )
//   story.group = groupList
// }
</script>

<template>
  <div class="form-control p-2">
    <!-- <label class="input-group input-group-xs w-full">
    <select v-model="story.groupState" class="select select-xs select-bordered grow">
      <option>{{ "" }}</option>
      <option v-for="(group, index) in story.group" :key='index' >{{ group }}</option>
    </select>
    <span>
      <label v-if="story.groupState.length == 0" for="add-group-modal" class='cursor-pointer'>
      <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      </label>
      <button v-else @click="deleteGroup(story.groupState)" class=''>
        Delete
      </button>
    </span>
    </label> -->
    <!-- <input type="checkbox" id="add-group-modal" class="modal-toggle" />
    <div class="modal modal-bottom sm:modal-middle">
      <div class="modal-box relative">
        <label for="add-group-modal" class="btn btn-error btn-sm btn-circle btn-ghost absolute right-2 top-2 text-error">✕</label>
        <h3 class="font-bold text-lg mb-4">Group Name...</h3>
        <input v-model="groupName" type="text" placeholder="Passage Name" class="input input-bordered w-full" />
        <div class="modal-action">
          <label @click="addGroup()" for="add-group-modal" class="btn btn-success">Add Group.</label>
        </div>
      </div>
    </div> -->
  </div>
</template>