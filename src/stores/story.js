import { defineStore } from "pinia";

export const storyData = defineStore({
  id: "story",
  state: () => ({
    counter: 0,
    storyId: 0,
    story: [],
    group: [],
    groupState: "",
    playState: "play",
    isWrap: false,
    askInstall: true,
    detectErrPassage: true,
    innerHeight: 0,
    playedStory: [],
    codeDarkTheme: true,
    theme: "business",
    themeList: [
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
    ],
    storyFormatList: [
      {
        name: "Chapbook 2",
        val: "chapbook-2",
        finishGet: false,
      },
      {
        name: "Chapbook 1",
        val: "chapbook-1",
        finishGet: false,
      },
      {
        name: "Harlowe 3",
        val: "harlowe-3",
        finishGet: false,
      },
      {
        name: "Harlowe 2",
        val: "harlowe-2",
        finishGet: false,
      },
      {
        name: "Harlowe ",
        val: "harlowe-1",
        finishGet: false,
      },
      {
        name: "Snowman 2",
        val: "snowman-2",
        finishGet: false,
      },
      {
        name: "Snowman 1",
        val: "snowman-1",
        finishGet: false,
      },
      {
        name: "SugarCube 2",
        val: "sugarcube-2",
        finishGet: false,
      },
      // {
      //   name : 'SugarCube 1.0.35',
      //   val : 'sugarcube-1'
      //   finishGet: false,
      // },
      {
        name: "Custom",
        val: "custom",
      },
    ],
    maxStorage: 0,
    currentStorage: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
  persist: true,
});
