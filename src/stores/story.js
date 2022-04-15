import { defineStore } from 'pinia'

export const storyData = defineStore({
  id: 'story',
  state: () => ({
    counter: 0,
    storyId : 0,
    story : [
      {
        title : 'My Awesome Story',
        ifid : 'E9AFFAED-9D44-4D87-979D-3089F0C5FF4C',
        id : '0',
        startNode : '1',
        userStyle : '/* Design Your Styling In Here */',
        userScript : '// Type Your Own Javascript In Here',
        passage : [
          {
            name : 'start',
            pid : '1',
            data : `This Is Your Start Passage.
Quick Tips.
To Add Link / Ways To Other Passage Use
[[about]] <- This Display "about", When Clicked Go To "about".
[[This Is About|about]] <- This Display "This Is About", When Clicked Go To "about".`
          },
          {
            name : 'about',
            pid : '2',
            data : `This Is Your About Passage
To Link From Here To "start" Just Use Like In The start Passage.
To Add A New Passage. Create The Passage Then Just Link It Use "[[PassageName_to_link]]".`
          }
        ]
      }
    ],
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
