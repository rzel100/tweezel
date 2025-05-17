<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import draggable from 'vuedraggable'
import { createToaster } from "@meforma/vue-toaster";
import { storyData } from '@/stores/story'
const story = storyData()
const storyName = ref('')
const isNew = ref(false)
const mode = ref('story')
const storyList = ref(story.story)
const themeList = ref(story.themeList)
// const storageStatus = ref(false)
const loadStoryTwee = ref(null)
const loadStory = ref(null)
const loadWholeStory = ref(null)
const installPromptMain = ref(null)
const toaster = createToaster({
  position : 'top',
  duration : 2000,
  dismissible : true
});
let search = ref('')

story.groupState = ""

window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  installPromptMain.value = e;
});

window.addEventListener("appinstalled", () => {
  installPromptMain.value = null;
});

function refreshStory() {
  story.themeList = [
    "garden",
    "business",
    "wireframe",
    "black",
    "valentine",
    "retro",
    "fantasy",
    "pastel",
    "autumn",
    "winter",
  ]
  toaster.show(`Refresh The App To See The Changes...`, {type : 'success'})
}

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
    toaster.show(`Story Name Is Required...`, {type : 'error'})
  } else {
    let ifid = generateIFID()
    let newStory = {
      title : storyName.value,
      ifid : ifid,
      startNode : '1',
      userStyle : '/* Design Your Styling In Here */',
      userScript : '// Type Your Own Javascript In Here',
      storyformats : 'sugarcube-2',
      imageList: [],
      customFormatUrl: '',
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
    storyName.value = ''
  }
}

function deleteStory(index) {
  story.story = storyList.value.filter((onePassage) =>
    onePassage.ifid !== index
  )
  storyList.value = story.story
}

function checkLegit(data) {
  let legit = false
  if (data.title && data.ifid && data.startNode && data.passage) {
    legit = true
  }
  return legit
}

function readDataTwee() {
  let file_to_read = document.getElementById("tweefileinput").files[0]
  if (file_to_read != undefined) {
    let fileread = new FileReader()
    fileread.onload = function(e) {
      let content = e.target.result
      const thePassage = content.split("::")
      let newStory = {
        title : '',
        ifid : '',
        startNode : '1',
        userStyle : '',
        userScript : '',
        storyformats : 'sugarcube-2',
        imageList: [],
        customFormatUrl: '',
        passage : [],
      }
      thePassage.map((e, index) => {
        let passage = {
          name : '',
          pid : String(index),
          data : ``,
          tags : '',
        }
        const theString = String(e).trim()
        const metaData = theString.split('\n')[0]
        let findTag = metaData.match(/\[[\s\S]*?\]/gi)
        let theTitle = metaData.split('{')[0].split('[')[0].trim()
        let theTags = ''
        let theData = theString.split(metaData+'\n').join('')
        if (findTag) {
          findTag.map((e) => {
            let oldSrc = e.split("[").join("").slice(0, -1).trim()
            theTags = oldSrc
          })
        }
        passage.data = String(theData)
        passage.tags = theTags
        passage.name = theTitle
        if (passage.name == 'StoryTitle') {
          newStory.title = passage.data
        } else if (passage.name == 'StoryData') {
          const parsedData = JSON.parse(passage.data)
          newStory.ifid = parsedData.ifid
          newStory.startNode = parsedData.start
        } else if (passage.name == 'StoryScript') {
          newStory.userScript = passage.data
        } else if (passage.name == 'StoryStylesheet') {
          newStory.userStyle = passage.data
        } else {
          if (passage.name.length > 0) {
            newStory.passage.push(passage)
          }
        }
      })
      let done = false
      newStory.passage.map((e) => {
        if (e.name === newStory.startNode && !done) {
          done = true
          newStory.startNode = e.pid
        }
      })
      story.story.push(newStory)
    }
    fileread.readAsText(file_to_read)
  }
}

function readData() {
  let file_to_read = document.getElementById("jsonfileinput").files[0]
  if (file_to_read != undefined) {
    let fileread = new FileReader()
    fileread.onload = function(e) {
      let content = e.target.result
      let storyData = JSON.parse(content)
      if (checkLegit(storyData)) {
        const found = story.story.find(story => story.ifid == storyData.ifid);
        if (found) {
          deleteStory(storyData.ifid)
        }
        story.story.push(storyData)
      } else {
        toaster.error(`Wrong File To Read...`)
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
            const found = story.story.find(story => story.ifid == storyData[i].ifid);
            if (found) {
              deleteStory(storyData[i].ifid)
            }
            story.story.push(storyData[i])
          } else {
            toaster.error(`Wrong File To Read...`)
          }
        }
      }
      mode.value = 'story'
    }
    fileread.readAsText(file_to_read)
  }
}

function changeTheme(data) {
  story.theme = data.target.value
}

const cleaningString = (text) => {
  const str = text
  const replaced = str.replace(/[^a-z0-9]/gi, '_');
  return replaced
}

// const writeFile = async (blob, filename) => {
//   write_blob({
//     path: "Global_Backup/"+filename,
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

function download(filename, text) {
  const new_filename = cleaningString(filename)
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const d = new Date();
  // const blob = new Blob([text], { type : 'plain/text' });
  const fileName = new_filename+'_'+d.getDate()+'_'+months[d.getMonth()]+'_'+d.getFullYear()+'.tweezeldata'
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', fileName);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  toaster.success(`Done...`)
}

let filteredStory = computed(() =>
  search.value === ''
    ? storyList.value
    : storyList.value.filter((oneStory) =>
      oneStory.title
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(search.value.toLowerCase().replace(/\s+/g, ''))
      )
)

const changeDetectPassage = (data) => {
  story.detectErrPassage = data
}
const changeCodeDarkTheme = (data) => {
  story.codeDarkTheme = data
}
// Opening Modal...
const openCreateModal = () => {
  document.getElementById("create-modal").showModal()
}
const openSettingModal = () => {
  document.getElementById("setting-modal").showModal()
}
const openAboutModal = () => {
  document.getElementById("about-modal").showModal()
}
</script>

<template>
  <div class="flex flex-col h-screen" :style='{height: story.innerHeight + "px"}'>
    <div class="navbar bg-primary shadow-lg text-primary-content">
      <div class='flex-1'>
        <button class="btn btn-ghost normal-case text-xl">TweezeL</button>
      </div>
      <div class="dropdown dropdown-bottom dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-square m-1">
          <svg fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
        </div>
        <ul class="dropdown-content z-[1] menu p-2 rounded-box shadow-xl bg-primary mt-4">
          <li class="p-1"><button @click='openSettingModal()'>Setting</button></li>
          <li class="p-1"><button @click='openAboutModal()'>About</button></li>
          <li class="p-1" v-if="installPromptMain"><label @click="installPromptMain.prompt()">Install</label></li>
        </ul>
      </div>
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
    
    <div class="w-full grow p-2 overflow-auto flex flex-col">
      <div class="grow overflow-auto pb-[69px]">
        <template v-if='filteredStory.length > 0'>
          <draggable
            :list="filteredStory"
            handle=".handle"
            item-key="title"
          >
            <template #item="{element}">
              <div class='relative flex items-center transition-all hover:bg-black/20'>
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
                        <button @click="deleteStory(element.ifid)" class='bg-error text-error-content'>
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <router-link :to="`/story/${element.ifid}`" class="py-4 static w-full px-12 truncate">
                  {{element.title}}
                </router-link>
              </div>
            </template>
          </draggable>
        </template>
      </div>
    </div>
  </div>

  <div @click='openCreateModal()' class="btn btn-primary btn-circle absolute bottom-5 right-5 cursor-pointer">
    <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  </div>

  <!-- <input type="checkbox" id="create-modal" class="modal-toggle" /> -->
  <dialog id="create-modal" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box relative">
      <form method="dialog">
        <button class="btn btn-error btn-sm btn-circle btn-ghost absolute right-2 top-2 text-error">✕</button>
      </form>
      <h3 class="font-bold text-lg mb-4">Write An Amazing Title For Your Story...</h3>
      <input v-model="storyName" type="text" placeholder="Story Title" class="input input-bordered w-full" />
      <div class="modal-action">
        <form method="dialog">
          <button @click="createStory()" class="btn btn-success">Start Creating !.</button>
        </form>
      </div>
    </div>
  </dialog>

  <!-- <input type="checkbox" id="setting-modal" class="modal-toggle" /> -->
  <dialog id="setting-modal" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box relative">
      <form method="dialog">
        <button class="btn btn-error btn-sm btn-circle btn-ghost absolute right-2 top-2 text-error">✕</button>
      </form>

      <div class='divider text-xl'>Setting</div>

      <p class='text-base py-2'>Choose Theme.</p>
      <div class='flex flex-col gap-1'>
        <div v-for="(theme, index) in themeList" :key='index' class='form-control'>
          <label class='label cursor-pointer bg-base-100 rounded-md p-2' :data-theme='theme'>
            <div class='flex flex-row gap-1'>
              <span class='aspect-square w-5 text-center bg-primary text-primary-content'>A</span>
              <span class='aspect-square w-5 text-center bg-secondary text-secondary-content'>A</span>
              <span class='aspect-square w-5 text-center bg-accent text-accent-content'>A</span>
              <span class='aspect-square w-5 text-center bg-neutral text-neutral-content'>A</span>
              <span class='label-text capitalize'>{{ theme }}</span>
            </div>
            <input type='radio' name='theme-radio' class='radio' :value='theme' @change='changeTheme($event)' :checked='story.theme === theme' />
          </label>
        </div>
      </div>

      <button @click='refreshStory()' class='btn btn-primary btn-block btn-sm mt-2'>Refresh Theme List ?.</button>

      <div class='divider'></div>

      <label class='label cursor-pointer bg-base-100 rounded-md py2'>
        Code In Dark Theme
        <input type="checkbox" class="toggle" :checked='story.codeDarkTheme' @change='changeCodeDarkTheme($event.target.checked)' />
      </label>

      <div class='divider'></div>

      <label class='label cursor-pointer bg-base-100 rounded-md py2'>
        Detect Error Passage ?. (Experimental)
        <input type="checkbox" class="toggle" :checked='story.detectErrPassage' @change='changeDetectPassage($event.target.checked)' />
      </label>

      <div class='divider'></div>

      <p class='text-base py-2'>Load Story From Twee File.</p>
      <p class='text-sm py-2'>IT IS NOT TESTED MUCH BUT EXPECTED TO WORK USING TWEE FILES EXPORTED FROM HERE AND TWINE !.</p>
      <p class='text-sm py-2'>Story Loaded From Twee File Will Have Sugarcube 2 Format By Default.</p>
      <button @click='loadStoryTwee.click()' class='btn btn-primary btn-block btn-sm'>Choose File To Load.</button>
      <input @change='readDataTwee' class="h-0 w-0" type="file" id="tweefileinput" ref='loadStoryTwee' accept='.twee' />

      <div class='divider'></div>

      <p class='text-base py-2'>Load Story From Backup.</p>
      <!-- <p class='text-sm py-2'>IF THE STORY IS ALREADY EXIST. THIS WILL REPLACE IT !.</p> -->
      <button @click='loadStory.click()' class='btn btn-primary btn-block btn-sm'>Choose Story Backup To Load.</button>
      <input @change='readData' class="h-0 w-0" type="file" id="jsonfileinput" ref='loadStory' accept='.tweezeldata' />

      <div class='divider'></div>

      <p class='text-base py-2'>Create Backup Of An Entire Story.</p>
      <!-- <p class='text-sm py-2'>It Will Be Saved At "[Internal_Storage] -> Android -> data -> app.rzel.tweezel -> files -> Global_Backup -> [Here]". It's Extension Is ".tweezeldata"</p> -->
      <p class='text-sm py-2'>Later. U Can Use "Choose Whole Story Backup To Load." Button To Select The File And Restore Your Backup. Or Just To Share It To Your Friends And Let Them Load Your Story Into Their Devices :).</p>
      <button @click="download('TweezeL Backup', JSON.stringify(story.story))" class='btn btn-primary btn-block btn-sm'>Backup The Entire Story.</button>

      <div class='divider'></div>

      <p class='text-base py-2'>Load Entire Story From Backup.</p>
      <p class='text-sm py-2'>IF THE STORY IS ALREADY EXIST. THIS WILL REPLACE IT !.</p>
      <button @click='loadWholeStory.click()' class='btn btn-primary btn-block btn-sm'>Choose Whole Story Backup To Load.</button>
      <input @change='readWholeData' class="h-0 w-0" type="file" id="jsonwholestoryfileinput" ref='loadWholeStory' accept='.tweezeldata' />
    </div>
  </dialog>

  <!-- <input type="checkbox" id="about-modal" class="modal-toggle" /> -->
  <dialog id="about-modal" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box relative">
      <form method="dialog">
        <button class="btn btn-error btn-sm btn-circle btn-ghost absolute right-2 top-2 text-error">✕</button>
      </form>
      <p class="p-1 mt-2">TweezeL Is A Free Tools For Creating Twine Games Focused For Android. But It Quite Works Well On Any Device With Browser On It. :3.</p>
      <p class="p-1 mt-2">The Feature Is Not Good Like Twine Or Tweego. But At Least It's Device Friendly Than Twine. And User Friendly Than Tweego. :)</p>
      <p class="p-1 mt-2">Now This Tools Already Support All Official Listed Story Formats On Twine 2 Tools. Such As Chapbook, Harlowe, Snowman, And Sugarcube.</p>
      <p class="p-1 mt-2">If You Don't Know What To Choose For Your Game Story Formats. Just Create A New Story. Set The StoryFormats On The Story Global Setting.<br>
        And Play The Story. Try All The StoryFormats One By One. Till U Find It Perfect For Your Game.<br>
        Also. Every StoryFormats Has It's Own Documentations. If U Plan For Longer Gameplay For Your Game. Think About This StoryFormats Seriously. :3.<br>
        My Personal Recomendations Is... <b>Sugarcube 2</b>...</p>
      <p class="p-1 mt-2">This Tools Is More Or Less Like Tweego But With GUI. For Those Who Never Code Twine Games With Tweego And Wanna Try This Tools.<br>
        Just Create A New Story To Read Some Very Basic Tutorial :).<br>
        Or <a class="text-primary-content underline" href="https://www.youtube.com/playlist?list=PLb4OE-UTEU-86vltmWTJTBkbYEWbGSebe" target="_blank" rel="noopener noreferrer">Go To Here.</a> It's My Youtube Playlist. Some Video About This Project. Like Basic Tutorial And Such Things.</p>
      <form method="dialog">
        <button class="btn btn-success btn-block btn-sm mt-2">Happy Creating !.</button>
      </form>
    </div>
  </dialog>

</template>
