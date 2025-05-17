<script setup>
import { useRoute, RouterLink } from 'vue-router'
import { storyData } from '@/stores/story'
import { ref, computed } from 'vue';
import draggable from 'vuedraggable'
import { createToaster } from "@meforma/vue-toaster";
import Compressor from 'compressorjs';

const story = storyData()
const route = useRoute()
const isNew = ref(false)
const addImageButton = ref(null)
const passageName = ref('')
const isDeleteImage = ref(false)
const brokenPathList = ref([])
const theIfid = route.params.id
const findIfid = (element) => element.ifid == theIfid;
const theStory = story.story.findIndex(findIfid)
const imageList = ref(story.story[theStory].imageList)
const passageList = ref(story.story[theStory].passage)
const toaster = createToaster({
  position : 'top',
  duration : 2000,
  dismissible : true
});
let search = ref('')
story.storyId = theStory

function sameName(data) {
  var nameSame = false
  for (let i = 0;i < story.story[theStory].passage.length;i++) {
    if (story.story[theStory].passage[i].name == data) {
      nameSame = true
    }
  }
  return nameSame
}

function addPassage() {
  if (passageName.value.length < 1) {
    toaster.show(`Passage Name Is Required...`, {type : 'error'})
  } else if (sameName(passageName.value)){
    passageName.value = ''
    toaster.show(`Passage Name Already Exist...`, {type : 'error'})
  } else {
    let nowPid = 1
    let arrPid = []
    for (let i = 0;i < story.story[theStory].passage.length;i++) {
      arrPid.push(story.story[theStory].passage[i].pid)
    }
    arrPid.sort(function(a, b) {
      return a - b;
    });
    for (let i = 0;i < arrPid.length;i++) {
      if (arrPid[i] == nowPid) {
        nowPid++
      }
    }
    story.story[theStory].passage.push({
      name : passageName.value,
      pid : nowPid.toString(),
      data : `Edit Your New Passage...`
    })
    isNew.value = false
    passageName.value = ''
  }
}

function deletePassage(index) {
  story.story[theStory].passage = passageList.value.filter((onePassage) =>
    onePassage.pid !== index
  )
  passageList.value = story.story[theStory].passage
}

let filteredPassage = computed(() =>
  search.value === ''
    ? passageList.value
    : passageList.value.filter((onePassage) =>
      {return (onePassage.name
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(search.value.toLowerCase().replace(/\s+/g, '')) ||
        onePassage.tags && onePassage.tags
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(search.value.toLowerCase().replace(/\s+/g, '')) )}
      )
)

const readSquare = (data) => {
  let newData = ''
  if (data.includes('][')) {
    newData = data.split('][')[0].trim()
  } else {
    newData = data
  }
  return newData
}

const detectLostPath = () => {
  if (story.detectErrPassage) {
    story.story[theStory].passage.forEach((e) => {
      const macan = e.data.match(/\[\[(.*?)\]\]/g)
      let thePath = []
      if (macan && macan.length > 0) {
        macan.forEach((found) => {
          let ketemu = false
          let theFound = found.replaceAll('[[', '').replaceAll(']]', '').split("|")
          let theFoundPath = ''
          if (theFound.length < 2) {
            if (theFound[0].includes('<-')) {
              theFoundPath = readSquare(theFound[0].split('<-')[0].trim())
            } else if (theFound[0].includes('->')) {
              theFoundPath = readSquare(theFound[0].split('->')[theFound[0].split('->').length = 1].trim())
            } else {
              theFoundPath = theFound[theFound.length - 1].trim()
            }
          } else {
            theFoundPath = theFound[theFound.length - 1].trim()
          }
          story.story[theStory].passage.forEach((passage) => {
            if (!ketemu) {
              if (passage.name == theFoundPath) {
                ketemu = true
              }
            }
          })
          if (!ketemu) {
            if (!thePath.includes(theFoundPath)) {
              thePath.push(theFoundPath)
            }
          }
        })
      }
      e.error = thePath
      if (e.error && e.error.length > 0) {
        brokenPathList.value.push(e.name)
      }
    })
  }
}

function addImageData(e) {

  const file = e.target.files[0];

  if (!file) {
    return;
  }

  new Compressor(file, {
    quality: 0.6,
    convertSize: 0,
    success(result) {
      const resultnya = result

      let fileReader = new FileReader();

      fileReader.onload = function(fileLoadedEvent) {
        let srcData = fileLoadedEvent.target.result; // <--- data: base64
        if (story.story[theStory].imageList) {
          let nowPid = 1
          let arrPid = []
          for (let i = 0;i < story.story[theStory].imageList.length;i++) {
            arrPid.push(story.story[theStory].imageList[i].id)
          }
          arrPid.sort(function(a, b) {
            return a - b;
          });
          for (let i = 0;i < arrPid.length;i++) {
            if (arrPid[i] == nowPid) {
              nowPid++
            }
          }
          story.story[theStory].imageList.push({
            name : 'image-name-' + nowPid.toString(),
            src : srcData,
            id : nowPid.toString(),
          })
        } else {
          story.story[theStory].imageList = []
          story.story[theStory].imageList.push({
            name : 'image-name-' + '1',
            src : srcData,
            id : '1'
          })
        }
        addImageButton.value.value = null
      }
      fileReader.readAsDataURL(resultnya);
    },
    error(err) {
      console.log(err.message);
    },
  });
}

function deleteImage(index) {
  story.story[theStory].imageList = story.story[theStory].imageList.filter((image) =>
    image.id !== index
  )
  imageList.value = story.story[theStory].imageList
}

// Opening Modal...
const openCreateModal = () => {
  document.getElementById("create-modal").showModal()
}
const openImageModal = () => {
  document.getElementById("image-modal").showModal()
}

detectLostPath()
</script>

<template>
  <div class="flex flex-col h-screen" :style='{height: story.innerHeight + "px"}'>
    
    <div class="navbar bg-primary shadow-lg text-primary-content">
      <button tabindex="0" class="btn btn-ghost btn-square" @click='$router.back()'>
        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 self-center m-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
        </svg>
      </button>
      <div class='grow truncate'>
        <div class="normal-case text-xl truncate font-semibold">{{story.story[theStory].title}}</div>
      </div>
      <router-link :to="`/story/${theIfid}/global`">
        <button tabindex="0" class="btn btn-ghost btn-square m-1">
          <svg class="h-5 w-5 self-center m-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
          </svg>
        </button>
      </router-link>
    </div>

    <div class="form-control p-2">
      <label class="join w-full">
        <input v-model="search" type="text" placeholder="Search" class="input input-bordered input-xs grow join-item" />
        <span @click="search = ''" class='cursor-pointer join-item btn btn-xs'>
          <svg v-if="search.length > 0" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          <svg v-else class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </span>
      </label>
    </div>

    <div v-if='brokenPathList.length > 0' class='p-2'>
      <div class="alert alert-error items-start flex flex-col gap-1">
        <div class='flex flex-row gap-2'>
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Error! Below Are The Passage That Have An Invalid Passage Link !.</span>
        </div>
        <!-- story.story[theStory].passage -->
        <!-- <div v-for="data, index in brokenPathList" :key='index'>
          {{index + 1}}. In "{{data}}" Path Found {{ story.story[theStory].passage[data].error }}
        </div> -->
        <div v-for="data, index in story.story[theStory].passage" :key='index'>
          <template v-if='data.error && data.error.length > 0'>
            In "{{data.name}}" Path Found "{{ data.error.join(', ') }}"
          </template>
        </div>
      </div>
    </div>
    
    <div class="w-full grow p-2 overflow-auto flex flex-col">
      <div class="grow overflow-auto pb-[69px]">
        <template v-if='filteredPassage.length > 0'>
          <draggable
            :list="filteredPassage"
            handle=".handle"
            item-key="pid"
          >
            <template #item="{element}">
              <div :class='[element.error && element.error.length > 0 && story.detectErrPassage ? "bg-error text-error-content hover:bg-error/80" : "hover:bg-black/20", "relative flex items-center transition-all"]'>
                <div v-if="search.length == 0" class="handle absolute left-3 cursor-move">
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="flex absolute right-3">
                  <div class="dropdown dropdown-bottom dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
                      <svg fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                    </div>
                    <ul class="dropdown-content z-[1] menu menu-compact p-2 bg-base-100 rounded-box shadow-xl">
                      <li>
                        <button @click="deletePassage(element.pid)" class='bg-error text-error-content'>
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <router-link :to="`/story/${story.story[theStory].ifid}/edit/${element.pid}`" :class="['py-4 static w-full px-12 truncate']">
                  {{element.name}} <i>{{element.tags && element.tags.length > 0 ? `[${element.tags}]` : ''}}</i>
                </router-link>
              </div>
            </template>
          </draggable>
        </template>
      </div>
    </div>
  </div>

  <div class="absolute bottom-5 right-5 flex flex-row gap-5">
    <router-link :to="`/story/${theIfid}/play`">
      <button class="btn btn-primary btn-circle cursor-pointer" @click='story.playState = "export"'>
        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
        </svg>
      </button>
    </router-link>

    <router-link :to="`/story/${theIfid}/play`">
      <button class="btn btn-primary btn-circle cursor-pointer" @click='story.playState = "play"'>
        <svg class="h-6 w-6 self-center m-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
        </svg>
      </button>
    </router-link>

    <button @click='openImageModal()' class="btn btn-primary btn-circle cursor-pointer">
      <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    </button>
  
    <button @click='openCreateModal()' class="btn btn-primary btn-circle cursor-pointer">
      <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </button>
  </div>

  <!-- <input type="checkbox" id="create-modal" class="modal-toggle" /> -->
  <dialog id="create-modal" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box relative">
      <form method="dialog">
        <button class="btn btn-error btn-sm btn-circle btn-ghost absolute right-2 top-2 text-error">✕</button>
      </form>
      <h3 class="font-bold text-lg mb-4">Passage Name...</h3>
      <input v-model="passageName" type="text" placeholder="Passage Name" class="input input-bordered w-full" />
      <div class="modal-action">
        <form method="dialog">
          <button @click="addPassage()" class="btn btn-success">Add Passage.</button>
        </form>
      </div>
    </div>
  </dialog>

  <!-- <input type="checkbox" id="image-modal" class="modal-toggle" /> -->
  <dialog id="image-modal" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box p-0 relative">
      <form method="dialog">
        <button class="btn btn-error btn-sm btn-circle btn-ghost absolute right-2 top-2 text-error">✕</button>
      </form>
      <div class="p-2">
        <h3 class="font-bold text-lg mb-4">Image List...</h3>
        <div class='flex flex-col gap-2'>
          <template v-if="imageList && imageList.length > 0">
            <div v-for="(image, index) in imageList" :key='index' class='bg-primary py-1 px-3 rounded-md text-primary-content flex flex-row gap-2 items-center'>
              <div class="w-14 h-14">
                <img :src="image.src" class="w-full h-full object-contain"/>
              </div>
              <input v-model="story.story[theStory].imageList[index].name" type="text" placeholder="Image Name" class="input input-bordered input-xs grow bg-secondary input-secondary text-secondary-content" />
              <!-- <div class="grow">
                {{ image.name }}
              </div> -->
              <button v-if="isDeleteImage" @click="deleteImage(image.id)" class='bg-error text-error-content p-2'>
                Delete
              </button>
            </div>
          </template>
          <template v-else>
            <div class="bg-primary p-1 rounded-md text-primary-content flex flex-row gap-2 items-center">
              No Image ?. No Problem. Try Add 1.
            </div>
          </template>
        </div>
        <template v-if="imageList && imageList.length > 0">
          <p class="text-sm pt-2">
            Put Image Name Inside src And Wrap It Using "%img% your_image_name %".<br />Example : {{`<img src="%img% `}}<u>{{`${story.story[theStory].imageList[0].name}`}}</u> {{`%" />`}}.
          </p>
        </template>
      </div>
      <!-- <input v-model="passageName" type="text" placeholder="Passage Name" class="input input-bordered w-full" /> -->
      <div class="modal-action sticky bg-base-100 bottom-0 p-2">
        <!-- <button @click='loadWholeStory.click()' class='btn btn-primary btn-block btn-sm'>Choose Whole Story Backup To Load.</button> -->
        <label @click="isDeleteImage = !isDeleteImage" class="btn btn-error btn-sm">{{ isDeleteImage ? "Cancel Delete Image" : "Delete Image" }}.</label>
        <input @change='addImageData' class="h-0 w-0" type="file" id="imageFileInput" ref='addImageButton' accept='image/*' />
        <label @click="addImageButton.click()" class="btn btn-success btn-sm">Add Image.</label>
      </div>
    </div>
  </dialog>

</template>
