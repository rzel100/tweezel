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
