<script setup>
import { useRoute } from "vue-router";
import { storyData } from "@/stores/story";
import { ref, watch } from "vue";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({
  position: "top",
  duration: 2000,
  dismissible: true,
});
const story = storyData();
const route = useRoute();
const theIfid = route.params.id;
const findIfid = (element) => element.ifid == theIfid;
const theStory = story.story.findIndex(findIfid);

const tweezelVersion = "1.5.1";

// const chapbook_1 = new URL('./chapbook-1-temp.txt', import.meta.url).href
// const harlowe_1 = new URL('./harlowe-1-temp.txt', import.meta.url).href
// const harlowe_2 = new URL('./harlowe-2-temp.txt', import.meta.url).href
// const harlowe_3 = new URL('./harlowe-3-temp.txt', import.meta.url).href
// const snowman_1 = new URL('./snowman-1-temp.txt', import.meta.url).href
// const snowman_2 = new URL('./snowman-2-temp.txt', import.meta.url).href
// const sugarcube_1 = new URL('./sugarcube-1-temp.txt', import.meta.url).href
// const sugarcube_2 = new URL('./sugarcube-2-temp.txt', import.meta.url).href
// const chapbook_1 = "https://raw.githubusercontent.com/klembot/twinejs/dc8aaeae7c3c279e12f04f74093e315027b8e15d/public/story-formats/chapbook-1.2.3/format.js"
// const chapbook_2 = "https://raw.githubusercontent.com/klembot/twinejs/911d18bc4994f1648137da4cacb66fced9086f6f/public/story-formats/chapbook-2.2.0/format.js"
// const harlowe_1 = "https://raw.githubusercontent.com/klembot/twinejs/28074261074cf22e46779c0efc2442afe015b74c/public/story-formats/harlowe-2.1.0/format.js"
// const harlowe_2 = "https://raw.githubusercontent.com/klembot/twinejs/28074261074cf22e46779c0efc2442afe015b74c/public/story-formats/harlowe-2.1.0/format.js"
// const harlowe_3 = "https://raw.githubusercontent.com/klembot/twinejs/60c3cadc308ec9ceafb0406c5c1ef58eaa828d2e/public/story-formats/harlowe-3.3.9/format.js"
// const snowman_1 = "https://raw.githubusercontent.com/klembot/twinejs/dd79dc7073115b1acfc82f25dace9838c241e056/public/story-formats/snowman-1.4.0/format.js"
// const snowman_2 = "https://raw.githubusercontent.com/klembot/twinejs/dd79dc7073115b1acfc82f25dace9838c241e056/public/story-formats/snowman-2.0.2/format.js"
// const sugarcube_1 = "https://raw.githubusercontent.com/klembot/twinejs/c5a2c90b86bb1d3d50169b0fe3988d3434c23127/public/story-formats/sugarcube-1.0.35/format.js"
// const sugarcube_2 = "https://raw.githubusercontent.com/klembot/twinejs/b2f8717bde8f0ef16ca78d9b99b6139c3bd05321/public/story-formats/sugarcube-2.37.3/format.js"

const gameCode = ref("");
const play = ref(false);
const isLoading = ref(true);
sessionStorage.clear();
const errornya = ref([]);
// const theImagesId = ref([])
// const theImages = ref([])

function createTheStory(data) {
  let passageDataNya = "";
  let passageDataNyaTmp = "";
  for (let i = 0; i < story.story[theStory].passage.length; i++) {
    let dataTmp = story.story[theStory].passage[i].data;
    let findImagePath = dataTmp.match(/%img%[\s\S]*?%/gi);
    if (findImagePath && findImagePath.length > 0) {
      findImagePath.map((e) => {
        let oldSrc = e.split("%img%").join("").slice(0, -1).trim();
        const found = story.story[theStory].imageList.find(
          (image) => image.name.trim() == oldSrc
        );
        if (found) {
          dataTmp = dataTmp.replace(e, found.src);
        }
      });
    }
    let dataTmpHtmlSafe = dataTmp
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    passageDataNyaTmp =
      '<tw-passagedata pid="' +
      story.story[theStory].passage[i].pid +
      '" name="' +
      story.story[theStory].passage[i].name +
      '" tags="' +
      story.story[theStory].passage[i].tags +
      '" position="100,100" size="100,100">' +
      dataTmpHtmlSafe +
      "</tw-passagedata>";
    passageDataNya = passageDataNya + passageDataNyaTmp;
    // eslint-disable-next-line no-useless-escape
    passageDataNya =
      '<tw-storydata name="' +
      story.story[theStory].title +
      '" startnode="' +
      story.story[theStory].startNode +
      '" creator="TweezeL" creator-version="' +
      tweezelVersion +
      '" ifid="' +
      story.story[theStory].ifid +
      '" zoom="1" format="' +
      data.name +
      '" format-version="' +
      data.version +
      '" options="" hidden><style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css">' +
      story.story[theStory].userStyle +
      '</style><script role="script" id="twine-user-script" type="text/twine-javascript">' +
      story.story[theStory].userScript +
      // eslint-disable-next-line no-useless-escape
      "<\/script>" +
      passageDataNya +
      "</tw-storydata>";
  }
  // let realData = data.replace(/tweezelStoryTitle/g, story.story[theStory].title).replace(/tweezelStoryIfid/g, story.story[theStory].ifid).replace(/tweezelStoryStartNode/g, story.story[theStory].startNode).replace(/tweezelStoryUserStyle/g, story.story[theStory].userStyle).replace(/tweezelStoryUserScript/g, story.story[theStory].userScript).replace(/tweezelStoryPassage/g, passageDataNya).replace(/tweezelVersion/g, '1.3.0')
  let realData = data.source
    .replace(/{{STORY_NAME}}/g, story.story[theStory].title)
    .replace(/{{STORY_DATA}}/g, passageDataNya);

  gameCode.value = realData;
}
if (story.story[theStory].passage.length == 0) {
  errornya.value.push("No Passage To Play With. Add Some Passage First.");
}
if (!story.story[theStory].storyformats) {
  errornya.value.push(
    "Story Formats Is Not Set. Set First In Global Story Setting."
  );
}

if (story.story[theStory].storyformats == "custom") {
  fetch(story.story[theStory].customFormatUrl)
    .then((response) => response.text())
    .then((data) => {
      let result = "";
      if (data.split(`"setup": function(){`).length > 1) {
        result = data.split(`"setup": function(){`)[0].slice(0, -1) + "}";
        result = result.slice(19);
        result = JSON.parse(result);
      } else {
        result =
          data.substring(data.length - 1) == ";"
            ? data.slice(0, -2)
            : data.slice(0, -1);
        result = result.slice(19);
        result = JSON.parse(result);
      }
      createTheStory(result);
    })
    .catch((error) => {
      toaster.error(`Something wrong... Check your internet connection...`);
      console.log("error", error);
    });
} else {
  story.storyFormatList.forEach((storyFormat) => {
    if (
      storyFormat.val == story.story[theStory].storyformats &&
      storyFormat.data
    ) {
      createTheStory(storyFormat.data);
    }
  });
}

function gameReady() {
  isLoading.value = false;
  if (story.playState == "play") {
    play.value = true;
  }
}

watch(
  () => gameCode.value,
  (gameCode) => {
    if (gameCode.length === 0) {
      return;
    }
    if (story.playState === "export") {
      exportHTML();
    }
    // else {
    //   toaster.success(`Run...`)
    //   let findImagePath = dataTmp.match(/%path%[\s\S]*?%/gi)
    //   if (findImagePath && findImagePath.length > 0) {
    //     findImagePath.map((e) => {
    //       let nweRegex = e.split("%path%").join("").slice(0, -1)
    //       let newRegex = nweRegex.split("|")
    //       let newUri = ''
    //       Filesystem.getUri({
    //         path: "Export/"+cleaningString(story.story[theStory].title)+"/"+newRegex[1],
    //         directory: Directory.External
    //       }).then(function ({uri}) {
    //         toaster.success(`Done... ${uri}`)
    //         theImages.value.push(uri)
    //         theImagesId.value.push(newRegex[0])
    //       });
    //       dataTmp = dataTmp.replace(e, newRegex[0])
    //     })
    //   }
    // }
  }
);

const cleaningString = (text) => {
  const str = text;
  const replaced = str.replace(/[^a-z0-9]/gi, "_");
  return replaced;
};

// const writeFile = async (blob, filename, original_filename) => {
//   write_blob({
//     path: "Export/"+original_filename+"/"+filename,
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
  const new_filename = cleaningString(filename);
  // const blob = new Blob([text], { type : 'plain/text' });
  const fileName = new_filename + ".html";
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", fileName);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  toaster.success(`Done...`);
  // writeFile(blob, fileName, new_filename)
}

function exportHTML() {
  download(story.story[theStory].title, gameCode.value);
}

// Opening Modal...
const openCloseModal = () => {
  document.getElementById("close-modal").showModal();
};
</script>

<template>
  <div
    class="flex h-screen overflow-auto flex-col"
    :style="{ height: story.innerHeight + 'px' }"
  >
    <div v-if="errornya.length > 0" class="p-2">
      There Is Some Error In Your Story. Here Is The Error(s) :
      <div v-for="(data, index) in errornya" :key="index">
        {{ index + 1 }}. {{ data }}
      </div>
      <span class="text-primary-content underline" @click="$router.back()"
        >Click Here To Go Back.</span
      >
    </div>

    <div v-else class="grow flex flex-col">
      <div v-show="play" class="grow flex flex-col bg-white relative">
        <div class="absolute bottom-0 left-0">
          <button
            @click="openCloseModal()"
            tabindex="0"
            class="btn btn-ghost btn-square btn-xs bg-black/20"
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-3 h-3 text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <iframe
          id="storyWindow"
          class="grow"
          :srcdoc="gameCode"
          @load="gameReady()"
        ></iframe>
      </div>

      <div v-show="!play" class="grow flex flex-col">
        <div class="navbar bg-primary shadow-lg text-primary-content">
          <button
            tabindex="0"
            class="btn btn-ghost btn-square"
            @click="$router.back()"
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5 self-center m-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
              />
            </svg>
          </button>
          <div class="grow truncate">
            <div class="normal-case text-xl truncate px-0 font-semibold">
              Play Story
            </div>
          </div>
        </div>
        <div class="p-4" v-if="isLoading">
          Loading The Game... Please Wait A Bit...
        </div>
        <div class="p-4" v-else>
          <div role="alert" class="alert alert-success shadow-lg flex flex-row">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span class="w-full"
              >Export Completed... Click The Download Button To Download Your
              Exported Story...</span
            >
            <div>
              <button @click="exportHTML()" class="btn btn-info">
                Download.
              </button>
            </div>
          </div>
          <!-- <p class='text-sm py-2'>It Will Be Saved At "[Internal_Storage] -> Android -> data -> app.rzel.tweezel -> files -> Export -> [Story Name] -> [Here]". It's Extension Is ".html"</p>
          <p class='text-sm py-2'>Nice. You Already Exported Your Game !. Go On, Upload Your Game To A Website Like Itch.io Or Your Own Website !. Or Simply Share It To Your Friends And Have Them Play Your Game !.</p> -->
        </div>
      </div>
    </div>

    <!-- <input type="checkbox" id="close-modal" class="modal-toggle" /> -->
    <dialog id="close-modal" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box relative">
        <form method="dialog">
          <button
            class="btn btn-error btn-sm btn-circle btn-ghost absolute right-2 top-2 text-error"
          >
            ✕
          </button>
        </form>
        <h3 class="font-bold text-lg mb-4">Quit Preview...???</h3>
        <div class="modal-action">
          <!-- <form method="dialog">
            <button @click="exportHTML()" class="btn btn-info">Download.</button>
          </form> -->
          <form method="dialog">
            <button class="btn btn-ghost">No.</button>
          </form>
          <button
            @click="$router.back()"
            for="create-modal"
            class="btn btn-success"
          >
            Yes.
          </button>
        </div>
      </div>
    </dialog>
  </div>
</template>
