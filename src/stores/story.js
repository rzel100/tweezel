import { defineStore } from 'pinia'

export const storyData = defineStore({
  id: 'story',
  state: () => ({
    counter: 0,
    storyId : 0,
    story : [

    ],
    isWrap : false,
    playedStory : []
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    increment() {
      this.counter++
    }
  },
  persist : true
})
